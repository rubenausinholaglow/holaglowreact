import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { ProductType } from '@interface/product';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import {
  APPOINTMENT_STATUS,
  AppointmentStatus,
  CLINIC_BOXS,
} from '@utils/appointmentUtils';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import useRoutes from '@utils/useRoutes';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow, SvgCheck, SvgCross, SvgUserSquare } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
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
import { Text } from 'designSystem/Texts/Texts';
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

  const [selectedType, setSelectedType] = useState<{
    [id: string]: boolean;
  }>({});

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>({});

  const fetchAppointments = async (productType: ProductType) => {
    setIsLoadingAppointments(true);
    try {
      const data = await ScheduleService.getAppointmentsPerClinic(
        clinicId,
        boxId,
        productType
      );

      if (Array.isArray(data)) {
        setAppointments(data);
        setIsLoadingPage(false);
      } else {
        Bugsnag.notify('Received non-array data:', data);
      }
    } catch (error: any) {
      setIsLoadingAppointments(false);
      Bugsnag.notify('Error fetching appointments:', error);
    }
    setIsLoadingAppointments(false);
  };

  useEffect(() => {
    fetchAppointments(ProductType.Others);
    setSelectedType({ [ProductType.Others]: true });

    const intervalId = setInterval(() => {
      for (const typeId in selectedType) {
        if (selectedType[typeId]) {
          const productType = parseInt(typeId, 10) as ProductType;
          fetchAppointments(productType);
          break;
        }
      }
    });
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

  const handleUpdateStatusAppointment = async (
    appointmentId: string,
    status: Status,
    productType: ProductType
  ) => {
    toggleLoading(appointmentId, status, true);
    await ScheduleService.updatePatientStatusAppointment(
      appointmentId,
      user?.id || '',
      status
    )
      .then(response => {
        fetchAppointments(productType);
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
  ): JSX.Element => {
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
        return <p className="text-sm">{dayjs(maxDate).format('HH:mm:ss')}</p>;
      }
    }

    return <></>;
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

  function getStyles(appointment: AppointmentsPerClinicResponse): string {
    if (appointment.appointmentStatus !== Status.CheckIn) return '';
    const checkinTime = getCheckInTime(appointment);

    if (checkinTime) {
      const now = new Date();
      const diffMinutes = Math.floor(
        (now.getTime() - checkinTime.getTime()) / (1000 * 60)
      );

      if (diffMinutes >= 10 && diffMinutes < 15) {
        return ' bg-blue-200 ';
      } else if (diffMinutes >= 15 && diffMinutes < 25) {
        return ' bg-orange-200 ';
      } else if (diffMinutes >= 25) {
        return ' bg-red-200 ';
      }
    }

    return '';
  }

  const getPatientInfo = (appointment: AppointmentsPerClinicResponse) => {
    return (
      <div className="flex">
        <SvgUserSquare className="mr-2" />
        <div>
          <Text className={`font-semibold`}>
            {appointment.firstName} {appointment.lastName}
          </Text>
          <Text className="text-hg-black500 text-xs">
            {appointment.flowwwToken.slice(0, -32)} - {appointment.phone}
          </Text>
        </div>
      </div>
    );
  };

  const handleFinalizeAppointment = async (appointmentId: string) => {
    /*await ScheduleService.finish(
      storedAppointmentId ?? '',
      comment ?? '',
      user?.id || ''
    );*/
    await ScheduleService.updatePatientStatusAppointment(
      appointmentId ?? '',
      user?.id || '',
      Status.Finished
    );
  };

  const getBoxName = (clinicId: string, boxId: string): string => {
    const clinicBoxes = CLINIC_BOXS[clinicId];
    if (clinicBoxes && clinicBoxes[boxId]) {
      return clinicBoxes[boxId].name;
    }
    return '';
  };

  const AppointmentRow = (
    appointment: AppointmentsPerClinicResponse,
    isHeader: boolean
  ) => {
    const customStyles = getStyles(appointment);
    return (
      <div
        className={` ${
          isHeader
            ? `w-full font-semibold text-hg-secondary text-base px-2`
            : `w-full text-left  ${
                customStyles.length > 0 ? customStyles : ' bg-white/75 '
              } rounded-xl  py-1 px-2 text-black text-sm`
        } `}
        key={appointment.id.length > 0 ? appointment.id : 0}
      >
        <Flex>
          <div></div>
          <Text className={`${extraInfo ? 'w-[20%]' : 'w-[60%]'} shrink-0 p-2`}>
            {isHeader ? 'Nombre del paciente' : getPatientInfo(appointment)}
          </Text>
          <Text className="w-[8%] shrink-0 p-2">
            {isHeader ? 'Hora cita' : appointment.startTime}
          </Text>
          <Text className="w-[8%] shrink-0 p-2">
            {isHeader
              ? 'Estado'
              : getAppointmentStatus(appointment.appointmentStatus)}
          </Text>
          {extraInfo && (
            <>
              {appointment.productType == ProductType.Medical && (
                <Text className="w-[5%] shrink-0 p-2">
                  {isHeader
                    ? 'Box'
                    : getBoxName(appointment.clinicFlowwwId, appointment.boxId)}
                </Text>
              )}

              <Text
                className={`w-[9%] shrink-0 p-2 ${!isHeader ? 'text-sm' : ''}`}
              >
                {isHeader ? 'Tipo de Cita' : appointment.product}
              </Text>

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
                              Status.CheckIn,
                              appointment.productType
                            );
                          }}
                          className="m-1"
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
                          className="m-1"
                          onClick={() => {
                            handleUpdateStatusAppointment(
                              appointment.id,
                              Status.NoShow,
                              appointment.productType
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
                  </>
                )}
              </Text>
              <Text className="w-[8%] shrink-0 p-2">
                {isHeader
                  ? 'Hora llegada'
                  : getEventTypeDate(appointment, AppointmentEventType.Checkin)}
              </Text>
              <Text className="w-[8%] shrink-0 p-2">
                {isHeader
                  ? 'Hora Visita'
                  : getEventTypeDate(appointment, AppointmentEventType.Start)}
              </Text>
              <Text className={`w-[8%] shrink-0 p-2 `}>
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
              {appointment.productType != ProductType.Others && (
                <Text className={`w-[8%] shrink-0 p-2`}>
                  {isHeader ? (
                    'Finalizar Cita'
                  ) : (
                    <Button
                      size="sm"
                      type="white"
                      onClick={e => {
                        handleFinalizeAppointment(appointment.id);
                      }}
                    >
                      <span className="font-semibold">Finalizar Cita</span>
                    </Button>
                  )}
                </Text>
              )}
              <Text className="w-[10%] shrink-0 p-2">
                {isHeader
                  ? 'Hora Salida'
                  : getEventTypeDate(
                      appointment,
                      AppointmentEventType.Finished
                    )}
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
        {!isHeader && (
          <Flex layout="col-left" className="w-full p-2">
            <p className="text-hg-secondary text-sm">
              fdsaklnglksa go sksj jgso iufwao n oih giush guisrhguishgriu gie
              geighuishgi iu ghseu giushguisrsrguh
            </p>
          </Flex>
        )}
      </div>
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

  function handleSelectType(id: ProductType) {
    setSelectedType(prevState => {
      const updatedSelectedType = { ...prevState };
      for (const typeId in updatedSelectedType) {
        if (typeId.toString() !== id.toString()) {
          updatedSelectedType[typeId] = false;
        }
      }
      updatedSelectedType[id] = !prevState[id];
      return updatedSelectedType;
    });
    switch (id) {
      case ProductType.Others:
        fetchAppointments(ProductType.Others);
        break;
      case ProductType.Medical:
        fetchAppointments(ProductType.Medical);
        break;
      case ProductType.Esthetic:
        fetchAppointments(ProductType.Esthetic);
        break;
    }
  }

  return (
    <div className="w-full ">
      {isLoadingPage ? (
        <SvgSpinner className="w-full justify-center" />
      ) : (
        <div className="w-full bg-white/60 p-6 rounded-2xl">
          <div className="sticky top-0 z-10 bg-white w-full rounded-2xl  p-4">
            <div className="flex gap-1 py-2">
              <Text
                className={`${
                  selectedType[ProductType.Others]
                    ? 'bg-hg-secondary text-white font-semibold'
                    : 'bg-white'
                } rounded-xl p-2 w-[20%] text-center border-hg-secondary border-4 hover:cursor-pointer`}
                onClick={e => {
                  handleSelectType(ProductType.Others);
                }}
              >
                Probador Virtual
              </Text>
              <Text
                className={`${
                  selectedType[ProductType.Medical]
                    ? 'bg-hg-secondary text-white font-semibold'
                    : 'bg-white'
                } rounded-xl p-2 w-[20%] text-center border-hg-secondary border-4 hover:cursor-pointer`}
                onClick={e => {
                  handleSelectType(ProductType.Medical);
                }}
              >
                Médico
              </Text>
              <Text
                className={`${
                  selectedType[ProductType.Esthetic]
                    ? 'bg-hg-secondary text-white font-semibold'
                    : 'bg-white'
                } rounded-xl p-2 w-[20%] text-center border-hg-secondary border-4 hover:cursor-pointer`}
                onClick={e => {
                  handleSelectType(ProductType.Esthetic);
                }}
              >
                Estético
              </Text>
            </div>
          </div>
          <Flex layout="col-left" className="w-full gap-2">
            {isLoadingAppointments ? (
              <div className="w-full p-4">
                <SvgSpinner className="w-full justify-center" />
              </div>
            ) : (
              <>
                {appointments.length > 0 ? (
                  <>
                    {AppointmentRow(appointments[0], true)}
                    {appointments.map(appointment => (
                      <>{AppointmentRow(appointment, false)}</>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

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
