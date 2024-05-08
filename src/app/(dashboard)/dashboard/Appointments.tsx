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
  AppointmentsPerClinicResponse,
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
import { get, isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import { useCrisalix } from './(pages)/crisalix/useCrisalix';

interface LoadingState {
  [key: string]: boolean;
}

const AppointmentsListComponent: React.FC<{
  clinicId: string;
  boxId: string;
}> = ({ clinicId, boxId }) => {
  const [appointments, setAppointments] = useState<
    AppointmentsPerClinicResponse[]
  >([]);
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

  const handleCheckUser = async (
    appointment: AppointmentsPerClinicResponse
  ) => {
    setLoadingAppointments(prevLoadingAppointments => ({
      ...prevLoadingAppointments,
      [appointment.id]: true,
    }));
    await UserService.checkUser(appointment.email)
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
    ScheduleService.updatePatientStatusAppointment(
      appointmentId,
      user?.id || '',
      Status.InProgress
    );

    UserService.createCrisalixUser(id, clinicId).then(async x => {
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

  interface AppointmentStatus {
    text: string;
    color: string;
    bg: string;
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
    appointment: AppointmentsPerClinicResponse,
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

  function getCheckInTime(
    appointment: AppointmentsPerClinicResponse
  ): Date | null {
    const checkinTime = appointment.appointmentEvents?.find(
      event => event.appointmentEventType === AppointmentEventType.Checkin
    );
    if (checkinTime) {
      return new Date(checkinTime.date);
    }
    return null;
  }

  function getStyles(
    appointment: AppointmentsPerClinicResponse
  ): string | undefined {
    if (appointment.appointmentStatus !== Status.CheckIn) return '';
    const checkinTime = getCheckInTime(appointment);

    if (checkinTime) {
      const now = new Date();
      const diffMinutes = Math.floor(
        (now.getTime() - checkinTime.getTime()) / (1000 * 60)
      );

      if (diffMinutes >= 10 && diffMinutes < 15) {
        return 'text-blue-500';
      } else if (diffMinutes >= 15 && diffMinutes < 25) {
        return 'text-orange-500';
      } else if (diffMinutes >= 25) {
        return 'text-red-500';
      }
    }

    return undefined;
  }

  const getPatientInfo = (appointment: AppointmentsPerClinicResponse) => {
    const customStyles = getStyles(appointment);
    return (
      <div className="flex">
        <SvgUserSquare className="mr-2" />
        <div>
          <Text className={`font-semibold ${customStyles}`}>
            {appointment.firstName} {appointment.lastName}
          </Text>
          <Text className="text-hg-black500 text-xs">
            {appointment.flowwwToken.slice(0, -32)} - {appointment.phone}
          </Text>
        </div>
      </div>
    );
  };

  const AppointmentRow = (
    appointment: AppointmentsPerClinicResponse,
    isHeader: boolean
  ) => {
    return (
      <Flex
        className={` ${
          isHeader
            ? 'w-full font-semibold text-hg-secondary text-base px-2'
            : 'w-full text-left bg-white/75 rounded-xl  py-1 px-2 text-black text-sm'
        } `}
        key={appointment.id.length > 0 ? appointment.id : 0}
      >
        <Text className={`${extraInfo ? 'w-[20%]' : 'w-[60%]'} shrink-0 p-2`}>
          {isHeader ? 'Nombre del paciente' : getPatientInfo(appointment)}
        </Text>
        <Text className="w-[10%] shrink-0 p-2">
          {isHeader ? 'Hora cita' : appointment.startTime}
        </Text>
        <Text className="w-[10%] shrink-0 p-2">
          {isHeader
            ? 'Estado'
            : getAppointmentStatus(appointment.appointmentStatus)}
        </Text>
        {extraInfo && (
          <>
            <Text className={`w-[10%] shrink-0 p-2`}>
              {isHeader ? (
                'Checkin'
              ) : (
                <>
                  {(appointment.appointmentStatus === Status.Confirmed ||
                    appointment.appointmentStatus === Status.Open) && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleUpdateStatusAppointment(
                            appointment.id,
                            Status.CheckIn
                          );
                        }}
                        className="m-1"
                      >
                        {loadingState[`${appointment.id}_${Status.CheckIn}`] ? (
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
                        className="m-1"
                        onClick={() => {
                          handleUpdateStatusAppointment(
                            appointment.id,
                            Status.NoShow
                          );
                        }}
                      >
                        {loadingState[`${appointment.id}_${Status.NoShow}`] ? (
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
                </>
              )}
            </Text>
            <Text className="w-[10%] shrink-0 p-2">
              {isHeader
                ? 'Hora llegada'
                : getEventTypeDate(appointment, AppointmentEventType.Checkin)}
            </Text>
            <Text className="w-[10%] shrink-0 p-2">
              {isHeader
                ? 'Hora Visita'
                : getEventTypeDate(appointment, AppointmentEventType.Start)}
            </Text>
            <Text className={`w-[10%] shrink-0 ${isHeader ? ' p-4 ' : ''}`}>
              {isHeader ? (
                'Agendar Cita'
              ) : (
                <Button
                  size="sm"
                  type="white"
                  onClick={e => {
                    router.push(
                      ROUTES.dashboard.schedule + appointment.flowwwToken
                    );
                  }}
                >
                  <span className="font-semibold">Agendar Cita</span>
                </Button>
              )}
            </Text>
            <Text className="w-[10%] shrink-0 p-2">
              {isHeader
                ? 'Hora Salida'
                : getEventTypeDate(appointment, AppointmentEventType.Finished)}
            </Text>
          </>
        )}
        {!isHeader && (
          <Flex className="w-full justify-end p-2">
            {extraInfo ? (
              <>
                {appointment.appointmentStatus == Status.CheckIn && (
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
        )}
      </Flex>
    );
  };

  const getAppointmentStatus = (status: Status) => {
    const appoitnmentStatus: AppointmentStatus = APPOINTMENT_STATUS[status];

    return (
      <>
        <Flex
          className={`py-1 px-2 rounded-lg w-full  bg-${appoitnmentStatus.bg}`}
        >
          <div
            className={`h-1 w-1 bg-${appoitnmentStatus.color} rounded-full mr-2`}
          ></div>
          <Text size="xs" className={`text-${appoitnmentStatus.color}`}>
            {appoitnmentStatus.text}
          </Text>
        </Flex>
      </>
    );
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
            {AppointmentRow(appointments[0], true)}
            {appointments.map(appointment => (
              <>{AppointmentRow(appointment, false)}</>
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
