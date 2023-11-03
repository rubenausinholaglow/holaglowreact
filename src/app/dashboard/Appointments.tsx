import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Appointment, Status } from '@interface/appointment';
import { CrisalixUser } from '@interface/crisalix';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import { Button } from 'designSystem/Buttons/Buttons';
import { SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import { useCrisalix } from './(pages)/crisalix/useCrisalix';

const AppointmentsListComponent: React.FC<{
  clinicId: string;
  boxId: string;
}> = ({ clinicId, boxId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<{
    [id: string]: boolean;
  }>({});
  const userCrisalix = useCrisalix(state => state);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await ScheduleService.getAppointmentsPerClinic(
          clinicId,
          boxId
        );

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          Bugsnag.notify('Received non-array data:', data);
        }
      } catch (error: any) {
        Bugsnag.notify('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [clinicId, boxId]);

  const handleCheckUser = async (appointment: Appointment) => {
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointment.id]: true,
    }));

    await UserService.checkUser(appointment.lead?.user?.email)
      .then(async data => {
        if (data && !isEmpty(data)) {
          saveAppointmentInfo(appointment);
          await redirectPage(data.firstName, data.id, data.flowwwToken);
        } else {
          //TODO - MESSAGE ERROR UI
        }
      })
      .catch(error => {
        Bugsnag.notify('Error handleCheckUser:', error);
      });
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointment.id]: false,
    }));
  };

  function saveAppointmentInfo(appointment: Appointment) {
    localStorage.setItem('appointmentId', appointment.id);
    localStorage.setItem('appointmentFlowwwId', appointment.flowwwId ?? '');
  }

  async function redirectPage(name: string, id: string, flowwwToken: string) {
    try {
      await ScheduleService.getClinicSchedule(flowwwToken).then(async data => {
        if (data != null) {
          localStorage.setItem('ClinicId', data.clinic.id);
          localStorage.setItem('ClinicFlowwwId', data.clinic.flowwwId);
          localStorage.setItem(
            'ClinicProfessionalId',
            data.clinicProfessional.id
          );
          //localStorage.setItem('boxId', boxId || '');
          saveUserDetails(name, id, flowwwToken);
          await messageService.StartAppointment(data).then(async info => {
            if (info != null) {
              await UserService.createCrisalixUser(id, data.id, clinicId).then(
                async x => {
                  const crisalixUser: CrisalixUser = {
                    id: x.id,
                    playerId: x.playerToken,
                    playerToken: x.playerToken,
                    name: x.name,
                  };
                  userCrisalix.addCrisalixUser(crisalixUser);
                  const props = {
                    id: crisalixUser.id,
                    playerId: crisalixUser.playerToken,
                    playerToken: crisalixUser.playerToken,
                    boxId: boxId,
                    clinicId: clinicId,
                  };
                  await messageService.CrisalixUser(props);
                }
              );
              router.push('/dashboard/remoteControl');
            }
          });
        } else {
          //TODO - Poner un mensaje de Error en UI
        }
      });
    } catch (err) {
      Bugsnag.notify(ERROR_GETTING_DATA + err);
    }
  }

  function saveUserDetails(name: string, id: string, flowwwToken: string) {
    localStorage.setItem('username', name);
    localStorage.setItem('id', id);
    localStorage.setItem('flowwwToken', flowwwToken);
  }

  const statusTranslations = {
    [Status.Open]: 'Pendiente',
    [Status.Canceled]: 'Cancelada',
    [Status.NoShow]: 'No Show',
    [Status.Moved]: 'Movida',
    [Status.Confirmed]: 'Confirmada',
    [Status.Finished]: 'Finalizado',
    [Status.CheckIn]: 'Esperando',
    [Status.InProgress]: 'En Visita',
  };

  function translateStatus(status: Status): string {
    return statusTranslations[status] || 'Unknown Status';
  }

  return (
    <div>
      <h1>Lista de citas</h1>
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Estado</th>
            <th>Nombre</th>
            <th>Professional</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>
                {appointment.startTime} {appointment.id}
              </td>
              <td>{translateStatus(appointment.status ?? Status.Open)}</td>
              <td>{appointment.lead?.user?.firstName}</td>
              <td>{appointment.clinicProfessional?.name}</td>
              <td>
                <Button
                  isSubmit
                  onClick={() => handleCheckUser(appointment)}
                  type="secondary"
                >
                  {loadingAppointments[appointment.id] ? (
                    <SvgSpinner height={24} width={24} />
                  ) : (
                    'Empezar'
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsListComponent;
