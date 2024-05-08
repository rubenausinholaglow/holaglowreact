import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import useRoutes from '@utils/useRoutes';
import { getHoursFromDate } from '@utils/utils';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow, SvgCheck, SvgCross, SvgUserSquare } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  Appointment,
  AppointmentEventType,
  Status,
  User,
} from 'app/types/appointment';
import {
  CrisalixActions,
  CrisalixUser,
  CrisalixUserList,
} from 'app/types/crisalix';
import {
  CrisalixUserData,
  StartAppointmentData,
} from 'app/types/FrontEndMessages';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import { useCrisalix } from './(pages)/crisalix/useCrisalix';

interface LoadingState {
  [key: string]: boolean;
}

const AppointmentsListComponent: React.FC<{
  clinicId: string;
  boxId: string;
}> = ({ clinicId, boxId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<{
    [id: string]: boolean;
  }>({});
  const router = useRouter();
  const ROUTES = useRoutes();
  const userCrisalix = useCrisalix(state => state);
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const {
    user,
    setCurrentUser,
    storedClinicId,
    ignoreMessages,
    setAppointmentId,
    setClinicFlowwwId,
    setClinicProfessionalId,
    extraInfo,
  } = useGlobalPersistedStore(state => state);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [loadingState, setLoadingState] = useState<LoadingState>({});

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
  useEffect(() => {
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

    await UserService.createCrisalixUser(id, clinicId).then(async x => {
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
        userId: id,
      };
      if (!ignoreMessages) await messageService.crisalixUser(crisalixUserData);
    });
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

            if (!ignoreMessages) {
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
            } else {
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
      color: 'white',
      bg: 'hg-secondary700',
    },
    1: {
      text: 'Cancelada',
      color: 'hg-orange',
      bg: 'hg-orange/50',
    },
    2: {
      text: 'No show',
      color: 'white',
      bg: 'hg-error',
    },
    3: {
      text: 'Movida',
      color: 'hg-tertiary',
      bg: 'hg-tertiary500',
    },
    4: {
      text: 'Confirmada',
      color: 'white',
      bg: 'hg-secondary700',
    },
    5: {
      text: 'Finalizada',
      color: 'white',
      bg: 'black',
    },
    6: {
      text: 'En visita',
      color: 'white',
      bg: 'hg-green',
    },
    7: {
      text: 'Esperando',
      color: 'white',
      bg: 'orange-600',
    },
  };

  const handleUpdateStatusAppointment = async (
    appointmentId: string,
    status: Status
  ) => {
    toggleLoading(appointmentId, status, true);
    await ScheduleService.updatePatientStatusAppointment(
      appointmentId,
      user?.id || '',
      status
    )
      .then(response => {
        fetchAppointments();
      })
      .catch(error => {
        setMessageNotification('Error al actualizar el estado de la cita');
      });
    toggleLoading(appointmentId, status, false);
  };

  const toggleLoading = (id: string, status: Status, isLoading: boolean) => {
    const loadingKey = `${id}_${status}`;
    setLoadingState(prevLoadingState => ({
      ...prevLoadingState,
      [loadingKey]: isLoading,
    }));
  };

  const getEventTypeDate = (
    appointment: Appointment,
    appointmentEventType: AppointmentEventType
  ): JSX.Element | null => {
    const filteredEvents = appointment.appointmentEvents?.filter(
      event => event.appointmentEventType === appointmentEventType
    );

    if (filteredEvents && filteredEvents.length > 0) {
      const maxDate = filteredEvents.reduce(
        (maxDate: Date | null, event: any) => {
          const eventDate = new Date(event.date);
          return !maxDate || eventDate > maxDate ? eventDate : maxDate;
        },
        null
      );

      if (maxDate) {
        return <p className="text-sm">{getHoursFromDate(maxDate)}</p>;
      }
    }

    return null;
  };

  return (
    <div className="w-full ">
      {isLoadingPage ? (
        <SvgSpinner className="w-full justify-center" />
      ) : (
        <div className="w-full bg-white/60 p-6 rounded-2xl">
          <Title size="xl" className="font-bold text-left mb-4">
            Tus citas del día
          </Title>
          <Flex layout="col-left" className="w-full gap-2">
            <Flex className="w-full font-normal text-hg-secondary text-xs py-2 px-3 gap-4">
              <Text className="w-[20%] shrink-0 ">Nombre del paciente</Text>
              <Text className="w-[10%] shrink-0 ">Hora cita</Text>
              <Text className="w-[10%] shrink-0 ">Estado</Text>
              {extraInfo && (
                <>
                  <Text className="w-[10%] shrink-0 p-2">Checkin</Text>

                  <Text className="w-[10%] shrink-0 p-2">Hora llegada</Text>
                  <Text className="w-[10%] shrink-0">Hora Visita</Text>
                  <Text className="w-[10%] shrink-0">Agendar Cita</Text>
                  <Text className="w-[10%] shrink-0">Hora Salida</Text>
                </>
              )}
            </Flex>
            {appointments.map(appointment => (
              <Flex
                key={appointment.id}
                layout="col-left"
                className="text-left bg-white/75 rounded-xl w-full py-2 px-3"
              >
                <Flex className="text-left bg-white/75 rounded-xl w-full py-2 px-3">
                  <Flex className="w-[20%] shrink-0">
                    <SvgUserSquare className="mr-2" />
                    <div>
                      <Text className="font-semibold">
                        {appointment.lead?.user?.firstName}{' '}
                        {appointment.lead?.user?.lastName}
                      </Text>
                      <Text className="text-hg-black500 text-xs">
                        {appointment.lead?.user?.flowwwToken.slice(0, -32)} -{' '}
                        {appointment.lead?.user?.phone} - {appointment.status}
                      </Text>
                    </div>
                  </Flex>
                  <Text className="w-[10%] shrink-0 p-2">
                    {appointment.startTime}
                  </Text>
                  <Flex className="w-[10%] shrink-0 p-2">
                    <Flex
                      className={`py-1 px-2 rounded-lg w-full  bg-${
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
                  {extraInfo && (
                    <>
                      <Flex className="w-[10%] gap-2 shrink-0 p-2">
                        {(appointment.status === Status.Confirmed ||
                          appointment.status === Status.Open) && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                handleUpdateStatusAppointment(
                                  appointment.id,
                                  Status.CheckIn
                                );
                              }}
                            >
                              {loadingState[
                                `${appointment.id}_${Status.CheckIn}`
                              ] ? (
                                <SvgSpinner height={16} width={16} />
                              ) : (
                                <SvgCheck
                                  width={16}
                                  height={16}
                                  className="text-hg-primary bg-hg-secondary rounded-md "
                                />
                              )}
                            </Button>

                            <Button
                              size="sm"
                              onClick={() => {
                                handleUpdateStatusAppointment(
                                  appointment.id,
                                  Status.NoShow
                                );
                              }}
                            >
                              {loadingState[
                                `${appointment.id}_${Status.NoShow}`
                              ] ? (
                                <SvgSpinner height={16} width={16} />
                              ) : (
                                <SvgCross
                                  width={16}
                                  height={16}
                                  className="text-hg-primary bg-hg-secondary rounded-md"
                                />
                              )}
                            </Button>
                          </>
                        )}
                      </Flex>
                      <Flex className="w-[10%] shrink-0 p-2">
                        {getEventTypeDate(
                          appointment,
                          AppointmentEventType.Checkin
                        )}
                      </Flex>
                      <Flex className="w-[10%] shrink-0 p-2">
                        <p>
                          {getEventTypeDate(
                            appointment,
                            AppointmentEventType.Start
                          )}
                        </p>
                      </Flex>
                      <Text className="w-[10%] shrink-0 text-sm">
                        <Button
                          size="md"
                          type="white"
                          href=""
                          onClick={e => {
                            router.push(
                              ROUTES.dashboard.schedule +
                                appointment.lead?.user?.flowwwToken
                            );
                          }}
                        >
                          <span className="font-semibold">Agendar Cita</span>
                        </Button>
                      </Text>

                      <Flex className="w-[9%] shrink-0 pl-8">
                        <p>
                          {getEventTypeDate(
                            appointment,
                            AppointmentEventType.Finished
                          )}
                        </p>
                      </Flex>
                    </>
                  )}
                  <Flex className="w-[10%] justify-end">
                    {extraInfo ? (
                      <>
                        {appointment.status == Status.CheckIn && (
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
                        )}
                      </>
                    ) : (
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
                    )}
                  </Flex>
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
      {messageNotification ? (
        <p className="text-red-500 py-4">{messageNotification}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppointmentsListComponent;
