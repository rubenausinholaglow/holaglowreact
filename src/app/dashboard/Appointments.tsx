import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Appointment, Status } from '@interface/appointment';
import { CrisalixUser } from '@interface/crisalix';
import {
  CrisalixUserData,
  StartAppointmentData,
} from '@interface/FrontEndMessages';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { SvgArrow, SvgUserSquare } from 'icons/IconsDs';
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
  const { user, setCurrentUser } = useGlobalPersistedStore(state => state);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { storedClinicId, storedBoxId, storedAppointmentId, setAppointmentId } =
    useGlobalPersistedStore(state => state);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await ScheduleService.getAppointmentsPerClinic(
          clinicId,
          boxId
        );

        if (Array.isArray(data)) {
          setAppointments(data);
          setIsLoadingPage(false);
        } else {
          Bugsnag.notify('Received non-array data:', data);
        }
      } catch (error: any) {
        Bugsnag.notify('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
    const intervalId = setInterval(fetchAppointments, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [clinicId, boxId]);

  const handleCheckUser = async (appointment: Appointment) => {
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointment.id]: true,
    }));

    await UserService.checkUser(appointment.lead?.user?.email)
      .then(async data => {
        if (data && !isEmpty(data)) {
          setCurrentUser(data);
          setAppointmentId(appointment.id);

          await redirectPage(data.firstName, data.id);
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

  async function redirectPage(name: string, id: string) {
    try {
      await ScheduleService.getClinicSchedule(storedAppointmentId).then(
        async data => {
          if (data != null) {
            localStorage.setItem('ClinicFlowwwId', data.clinic.flowwwId);
            localStorage.setItem(
              'ClinicProfessionalId',
              data.clinicProfessional.id
            );
            data.boxId = storedBoxId;
            saveUserDetails(name, id, '');

            const startAppointmentData: StartAppointmentData = {
              clinicId: storedClinicId,
              boxId: storedBoxId,
              appointmentId: storedAppointmentId,
            };

            await messageService
              .startAppointment(startAppointmentData)
              .then(async info => {
                if (info != null) {
                  await ScheduleService.updatePatientStatusAppointment(
                    storedAppointmentId,
                    user?.id || '',
                    Status.InProgress
                  );

                  await UserService.createCrisalixUser(
                    id,
                    data.id,
                    clinicId
                  ).then(async x => {
                    const crisalixUser: CrisalixUser = {
                      id: x.id,
                      playerId: x.player_id,
                      playerToken: x.playerToken,
                      name: x.name,
                    };
                    userCrisalix.addCrisalixUser(crisalixUser);
                    const crisalixUserData: CrisalixUserData = {
                      id: crisalixUser.id,
                      playerId: crisalixUser.playerId,
                      playerToken: crisalixUser.playerToken,
                      boxId: boxId,
                      clinicId: clinicId,
                    };
                    await messageService.crisalixUser(crisalixUserData);
                  });
                  router.push('/dashboard/remoteControl');
                }
              });
          } else {
            //TODO - Poner un mensaje de Error en UI
          }
        }
      );
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
    <div className="w-ful">
      {isLoadingPage ? (
        <SvgSpinner className="w-full justify-center" />
      ) : (
        <div className="w-full bg-white/60 p-6 rounded-2xl">
          <Title size="xl" className="font-bold text-left mb-4">
            Tus citas del día
          </Title>
          <Flex layout="col-left" className="w-full gap-2">
            <Flex className="w-full font-normal text-hg-secondary text-xs p-2">
              <Text className="w-[60%]">Nombre del paciente</Text>
              <Text className="w-[15%]">Hora cita</Text>
              <Text className="w-[20%]">Estado</Text>
              <Text className="w-[10%]"> </Text>
            </Flex>
            {appointments.map(appointment => (
              <Flex
                key={appointment.id}
                className="text-left bg-white/75 rounded-xl w-full py-2 px-3"
              >
                <Flex className="w-[60%]">
                  <SvgUserSquare className="mr-2" />
                  <div>
                    <Text className="font-semibold">
                      {appointment.lead?.user?.firstName}{' '}
                      {appointment.lead?.user?.lastName}
                    </Text>
                    <Text className="text-hg-black500 text-xs">
                      {appointment.lead?.user?.flowwwToken.slice(0, -32)}
                    </Text>
                  </div>
                </Flex>
                <Text className="w-[15%]">{appointment.startTime}</Text>
                <Flex className="w-[20%]">
                  <Flex className="bg-hg-secondary300 py-1 px-2 rounded-lg">
                    <div className="h-1 w-1 bg-hg-secondary rounded-full mr-2"></div>
                    <Text size="xs" className="text-hg-secondary">
                      {translateStatus(appointment.status ?? Status.Open)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex className="w-[10%] justify-end">
                  <Button
                    size="sm"
                    isSubmit
                    onClick={() => handleCheckUser(appointment)}
                    type="tertiary"
                    customStyles="bg-hg-primary px-3"
                  >
                    {loadingAppointments[appointment.id] ? (
                      <SvgSpinner height={24} width={24} />
                    ) : (
                      <SvgArrow height={16} width={16} />
                    )}
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default AppointmentsListComponent;
