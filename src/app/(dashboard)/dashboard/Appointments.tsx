import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { ERROR_GETTING_DATA } from '@dashboardUtils/textConstants';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import {
  Appointment,
  Status,
  User,
} from 'app/(dashboard)/dashboard/interface/appointment';
import {
  CrisalixActions,
  CrisalixUser,
  CrisalixUserList,
} from 'app/(dashboard)/dashboard/interface/crisalix';
import {
  CrisalixUserData,
  StartAppointmentData,
} from 'app/(dashboard)/dashboard/interface/FrontEndMessages';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
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
  const router = useRouter();
  const userCrisalix = useCrisalix(state => state);

  const {
    user,
    setCurrentUser,
    storedClinicId,
    storedBoxId,
    ignoreMessages,
    setAppointmentId,
    setClinicFlowwwId,
    setClinicProfessionalId,
  } = useGlobalPersistedStore(state => state);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

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

          await redirectPage(data.firstName, data.id, appointment.id);
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

  async function startAppointment(
    appointmentId: string,
    user: User | undefined,
    id: string,
    data: any,
    clinicId: string,
    userCrisalix: CrisalixUserList & CrisalixActions,
    boxId: string,
    ignoreMessages: boolean,
    router: any
  ) {
    await ScheduleService.updatePatientStatusAppointment(
      appointmentId,
      user?.id || '',
      Status.InProgress
    );

    await UserService.createCrisalixUser(id, data.id, clinicId).then(
      async x => {
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
        if (!ignoreMessages)
          await messageService.crisalixUser(crisalixUserData);
      }
    );
    router.push('/dashboard/remoteControl');
  }
  async function redirectPage(name: string, id: string, appointmentId: string) {
    try {
      await ScheduleService.getClinicSchedule(appointmentId).then(
        async data => {
          if (data != null) {
            setClinicFlowwwId(data.clinic.flowwwId);
            setClinicProfessionalId(data.clinicProfessional.id);

            const startAppointmentData: StartAppointmentData = {
              clinicId: storedClinicId,
              boxId: data.boxId,
              appointmentId: appointmentId,
            };
            if (!ignoreMessages)
              await messageService
                .startAppointment(startAppointmentData)
                .then(async info => {
                  if (info != null) {
                    await startAppointment(
                      appointmentId,
                      user,
                      id,
                      data,
                      clinicId,
                      userCrisalix,
                      boxId,
                      ignoreMessages,
                      router
                    );
                  }
                });
            else
              await startAppointment(
                appointmentId,
                user,
                id,
                data,
                clinicId,
                userCrisalix,
                boxId,
                ignoreMessages,
                router
              );
          } else {
            //TODO - Poner un mensaje de Error en UI
          }
        }
      );
    } catch (err) {
      Bugsnag.notify(ERROR_GETTING_DATA + err);
    }
  }

  const APPOINTMENT_STATUS = {
    0: {
      text: 'Pendiente',
      color: 'hg-black500',
      bg: 'hg-black100',
    },
    1: {
      text: 'Cancelada',
      color: 'hg-orange',
      bg: 'hg-orange/50',
    },
    2: {
      text: 'No show',
      color: 'hg-red',
      bg: 'hg-red300',
    },
    3: {
      text: 'Movida',
      color: 'hg-tertiary',
      bg: 'hg-tertiary500',
    },
    4: {
      text: 'Confirmada',
      color: 'hg-secondary',
      bg: 'hg-secondary300',
    },
    5: {
      text: 'Finalizada',
      color: 'hg-green',
      bg: 'hg-green300',
    },
    6: {
      text: 'Esperando',
      color: 'hg-secondary',
      bg: 'hg-secondary300',
    },
    7: {
      text: 'En Visita',
      color: 'hg-primary',
      bg: 'hg-primary100',
    },
  };

  return (
    <div className="w-full">
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
                      {appointment.lead?.user?.flowwwToken.slice(0, -32)} -{' '}
                      {appointment.lead?.user?.phone}
                    </Text>
                  </div>
                </Flex>
                <Text className="w-[15%]">{appointment.startTime}</Text>
                <Flex className="w-[20%]">
                  <Flex
                    className={`py-1 px-2 rounded-lg bg-${
                      APPOINTMENT_STATUS[appointment.status ?? Status.Open].bg
                    }`}
                  >
                    <div
                      className={`h-1 w-1 bg-${
                        APPOINTMENT_STATUS[appointment.status ?? Status.Open]
                          .color
                      } rounded-full mr-2`}
                    ></div>

                    <Text
                      size="xs"
                      className={`text-${
                        APPOINTMENT_STATUS[appointment.status ?? Status.Open]
                          .color
                      }`}
                    >
                      {
                        APPOINTMENT_STATUS[appointment.status ?? Status.Open]
                          .text
                      }
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

            <Text className="text-right w-full p-2 text-xs">
              <span className="text-hg-black500">
                {dayjs().format('dddd, D [de] MMMM')}
              </span>
              {' · '}
              <span>
                <b>{appointments.length}</b> visitas agendadas para hoy
              </span>
            </Text>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default AppointmentsListComponent;
