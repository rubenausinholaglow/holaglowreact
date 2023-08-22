import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Appointment, PatientStatus } from '@interface/appointment';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import { Button } from 'designSystem/Buttons/Buttons';
import { SvgSpinner } from 'icons/Icons';
import { useRouter } from 'next/navigation';

const AppointmentsListComponent: React.FC<{ clinicId: string }> = ({
  clinicId,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<{
    [id: string]: boolean;
  }>({});

  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await ScheduleService.getAppointmentsPerClinic(clinicId);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error('Received non-array data:', data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [clinicId]);

  const handleCheckUser = async (email: string, appointmentId: string) => {
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointmentId]: true,
    }));

    await UserService.checkUser(email)
      .then(async data => {
        if (data && data !== '') {
          await redirectPage(data.firstName, data.id, data.flowwwToken);
        } else {
          //handleSearchError();
        }
      })
      .catch(error => {
        //handleSearchError();
      });
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointmentId]: false,
    }));
  };

  async function redirectPage(name: string, id: string, flowwwToken: string) {
    try {
      await ScheduleService.getClinicSchedule(flowwwToken).then(data => {
        if (data != null) {
          localStorage.setItem('ClinicId', data.clinic.id);
          localStorage.setItem('ClinicFlowwwId', data.clinic.flowwwId);
          localStorage.setItem(
            'ClinicProfessionalId',
            data.clinicProfessional.id
          );
          saveUserDetails(name, id, flowwwToken);
          router.push('/dashboard/menu');
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

  return (
    <div>
      <h1>Lista de citas</h1>
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Estado</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.startTime}</td>
              <td>{PatientStatus[appointment.patientStatus]}</td>
              <td>{appointment.lead.user.firstName}</td>
              <td>
                <Button
                  isSubmit
                  onClick={() =>
                    handleCheckUser(appointment.lead.user.email, appointment.id)
                  }
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
