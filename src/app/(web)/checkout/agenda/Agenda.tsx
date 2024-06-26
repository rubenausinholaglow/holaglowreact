'use client';

import './datePickerStyle.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Appointment } from '@interface/appointment';
import { CartItem, EmlaType, Product } from '@interface/product';
import ScheduleService from '@services/ScheduleService';
import CheckHydration from '@utils/CheckHydration';
import { fetchProduct } from '@utils/fetch';
import { getTreatmentId } from '@utils/userUtils';
import {
  formatDate,
  getClinicToSet,
  getUniqueIds,
  validTypesFilterCart,
} from '@utils/utils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import AppointmentElement from 'app/(web)/reagenda/components/AppointmentElement';
import { SvgCalendar, SvgHour, SvgLocation, SvgSpinner } from 'app/icons/Icons';
import {
  SvgCalling,
  SvgCross,
  SvgEllipsis,
  SvgSadIcon,
  SvgWarning,
} from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { DayAvailability } from 'app/types/dayAvailability';
import { Slot } from 'app/types/slot';
import useRoutes from 'app/utils/useRoutes';
import es from 'date-fns/locale/es';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import NeedHelp from './NeedHelp';
import SlotList from './SlotList';

registerLocale('es', es);

export default function Agenda({
  isDashboard = false,
  isCheckin = false,
  isDerma = false,
  isCheckout = false,
}: {
  isDashboard?: boolean;
  isCheckin?: boolean;
  isDerma?: boolean;
  isCheckout?: boolean;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();
  const { user, setCurrentUser, clinics } = useGlobalPersistedStore(
    state => state
  );

  const {
    setSelectedSlot,
    selectedSlot,
    previousAppointment,
    selectedTreatments,
    selectedPack,
    selectedPacksTreatments,
    selectedClinic,
    analyticsMetrics,
    selectedDay,
    setSelectedDay,
    treatmentPacks,
    setTreatmentPacks,
    setSelectedTreatments,
    setPayment,
    setSelectedClinic,
  } = useSessionStore(state => state);

  const [showReviewAlreadyCreated, setShowReviewAlreadyCreated] =
    useState(false);
  const [showTooLateToSchedule, setShowTooLateToSchedule] = useState(false);
  const [appointmentToShow, setAppointmentToShow] = useState<
    Appointment | undefined
  >(undefined);

  const [enableScheduler, setEnableScheduler] = useState(false);
  const [dateToCheck, setDateToCheck] = useState<Dayjs | undefined>(undefined);
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
  const [dateFormatted, setDateFormatted] = useState('');
  const [localDateSelected, setLocalDateSelected] = useState<Date | undefined>(
    undefined
  );
  const [selectedTreatmentsIds, setSelectedTreatmentsIds] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentMonth, setcurrentMonth] = useState(dayjs());
  const [totalTimeAppointment, setTotalTimeAppointment] = useState(0);
  const [loadingMonthFirstTime, setLoadingMonthFirstTime] = useState(true);
  const [showRescheduleError, setShowRescheduleError] = useState(false);

  const format = 'YYYY-MM-DD';
  let maxDays = 60;
  if (isDashboard) maxDays = 9999;
  const maxDaysByClinicAndType: any = {
    '1': {
      //Madrid
      '0': 10,
    },
    '4': {
      //Barcelona
      '0': 10,
    },
    '5': {
      //Valencia
      '0': 10,
    },
  };
  if (
    selectedClinic &&
    selectedTreatments &&
    selectedTreatments[0] &&
    maxDaysByClinicAndType &&
    maxDaysByClinicAndType[selectedClinic.flowwwId] &&
    maxDaysByClinicAndType[selectedClinic.flowwwId][selectedTreatments[0].type]
  ) {
    maxDays =
      maxDaysByClinicAndType[selectedClinic.flowwwId][
        selectedTreatments[0].type
      ];

    if (selectedTreatments[0].flowwwId == 903) maxDays = 60;
  }
  if (isDerma) maxDays = 90;
  const [clickedHour, setClickedHour] = useState<string | null>(null);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);
  const { cart, updateIsScheduled } = useCartStore(state => state);
  const [isOnline, setIsOnline] = useState(false);

  const productIds = getUniqueIds(selectedTreatments);

  const [maxDay, setMaxDay] = useState(dayjs().add(maxDays, 'day'));

  function loadMonth() {
    if (previousAppointment?.treatmentText == 'Revisión Tratamiento') {
      const day = dayjs(previousAppointment.startTime).add(7, 'day');
      setMaxDay(day);
    }
    setLoadingMonth(true);
    if (
      selectedTreatmentsIds &&
      availableDates.length < maxDays &&
      dateToCheck &&
      selectedClinic
    ) {
      if (selectedTreatmentsIds != '902' && !isOnline) {
        ScheduleService.getMonthAvailability(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic?.flowwwId || '',
          isDashboard,
          previousAppointment ? previousAppointment.professionalName : ''
        ).then(data => {
          setTotalTimeAppointment(data?.totalTime);
          callbackMonthAvailability(data?.dayAvailabilities, dateToCheck);
          setLoadingMonthFirstTime(false);
        });
      } else {
        ScheduleService.getMonthAvailabilityv2(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic!.flowwwId,
          previousAppointment ? previousAppointment.professionalName : ''
        ).then(data => {
          setLoadingMonthFirstTime(false);
          callbackMonthAvailability(data?.dayAvailabilities, dateToCheck);
        });
      }
    } else setLoadingMonth(false);
  }

  function callbackGetSlots(data: Slot[]) {
    setClickedHour(null);

    const hours = Array<Slot>();
    const morning = Array<Slot>();
    const afternoon = Array<Slot>();
    data.forEach(x => {
      const hour = x.startTime.split(':')[0];
      const minutes = x.startTime.split(':')[1];
      let block15and45minutes =
        (!isDashboard && minutes == '15') || (!isDashboard && minutes == '45');
      if (minutes == '15') {
        block15and45minutes =
          hours.find(
            x =>
              x.startTime.split(':')[0] == hour &&
              x.startTime.split(':')[1] == '00'
          ) != undefined;
      }
      if (minutes == '45') {
        block15and45minutes =
          hours.find(
            x =>
              x.startTime.split(':')[0] == hour &&
              x.startTime.split(':')[1] == '30'
          ) != undefined;
      }
      if (
        !block15and45minutes &&
        (!(hour == '10' && minutes == '00') || selectedTreatmentsIds != '902')
      ) {
        hours.push(x);
        if (parseInt(hour) < 15) {
          morning.push(x);
        } else afternoon.push(x);
      }
    });
    setMorningHours(morning);
    setAfternoonHours(afternoon);
    window.scrollTo({
      top: 425,
      left: 0,
      behavior: 'smooth',
    });
  }

  function callbackMonthAvailability(
    data: DayAvailability[],
    dateToCheck: Dayjs
  ) {
    const endOfMonth = dateToCheck.endOf('month');
    const availability = availableDates ?? [];
    const today = dayjs();
    const loadedCurrentMonth = endOfMonth.month() == currentMonth.month();
    data.forEach((x: any) => {
      const date = dayjs(x.date);
      if (
        availability.length < maxDays &&
        (date.isAfter(today) || (date.isSame(today, 'day') && !isDerma)) &&
        x.availability &&
        date.isBefore(maxDay)
      ) {
        availability.push(x);
      }
    });
    setAvailableDates(availability);
    setSelectedDay(selectedDay);
    if (loadedCurrentMonth) {
      setDateToCheck(dateToCheck.add(1, 'month'));
    } else setLoadingMonth(false);
  }

  function initialize() {
    setLoadingMonth(true);
    setSelectedDay(undefined);
    setEnableScheduler(true);
    setDateToCheck(dayjs());
    const isOnline =
      selectedTreatments.length > 0 &&
      selectedTreatments[0].title == 'Probador Virtual Online';
    setIsOnline(isOnline);
    setPayment(undefined);
  }
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    initialize();
  }, [selectedTreatments]);

  useEffect(() => {
    async function schedule() {
      try {
        if (user?.flowwwToken && previousAppointment && selectedDay) {
          setLoadingDays(true);
          setLoadingMonth(true);
          let ids = selectedTreatments!.map(x => x.flowwwId).join(', ');
          if (selectedPacksTreatments && selectedPacksTreatments.length) {
            ids = selectedPacksTreatments!
              .slice(0, 2)
              .map(x => x.flowwwId)
              .join(',');
          }
          const treatments = selectedTreatments!.map(x => x.title).join(', ');
          const comment = 'Tratamiento visto en web: ' + treatments;
          await ScheduleService.reschedule({
            next: {
              box: selectedSlot!.box,
              endTime:
                selectedDay!.format(format) +
                ' ' +
                selectedSlot!.endTime +
                ':00',
              id: '0',
              startTime:
                selectedDay!.format(format) +
                ' ' +
                selectedSlot!.startTime +
                ':00',
              treatment: ids,
              clientId: user?.flowwwToken,
              comment: comment,
              treatmentText: treatments,
              referralId: '',
              externalReference: '',
              isPast: false,
              clinicId: selectedClinic?.flowwwId,
              isCancelled: false,
              paymentId: previousAppointment.paymentId,
              paid: false,
            },
            previous: previousAppointment,
          }).then(x => {
            if (!x || x.length == 0) setShowRescheduleError(true);
            else {
              if (isDashboard && !isDerma) {
                router.push(
                  `${ROUTES.dashboard.checkIn.confirmation}?isCheckin=${isCheckin}`
                );
              } else if (!isDashboard && !isDerma) {
                router.push(`${ROUTES.checkout.confirmation}?isReagenda=true`);
              }
            }
          });
        } else if (user && selectedDay) {
          setLoadingDays(true);
          setLoadingMonth(true);
          if (isDashboard || isCheckin)
            analyticsMetrics.externalReference = '14';

          await ScheduleService.createAppointment(
            selectedTreatments,
            selectedSlot!,
            selectedDay,
            selectedClinic!,
            user,
            selectedPacksTreatments!,
            analyticsMetrics,
            '',
            selectedPack
          ).then(_x => {
            if (isDashboard) {
              let treatmentsToSchedule: Product[] = selectedTreatments.filter(
                x => !x.isPack
              );
              const scheduledDate = getScheduledDate();
              const treatmentsCartPendingToUpdate = filterCartPendingToUpdate();

              const treatmentsUpdateds: CartItem[] = [];
              let treatmentsToUpdate: CartItem[] = [];

              if (treatmentsCartPendingToUpdate.length > 0) {
                treatmentsToUpdate = treatmentsCartPendingToUpdate.filter(x =>
                  selectedTreatments.some(y => y.title == x.title)
                );

                treatmentsToUpdate.forEach(x => {
                  treatmentsUpdateds.push(x);
                  treatmentsToSchedule = removeTreatmentFromList(
                    x.id,
                    treatmentsToSchedule
                  );
                  updateIsScheduled(true, x.uniqueId, scheduledDate, x.title);
                });
              }

              if (treatmentsToSchedule.filter(x => x.sessions > 1).length > 0) {
                const x = updateTreatments(
                  scheduledDate,
                  treatmentsToSchedule.filter(x => x.sessions > 1),
                  true
                );
                treatmentsUpdateds.push(...(x as CartItem[]));
              }

              if (treatmentsUpdateds.length < selectedTreatments.length) {
                updateTreatments(scheduledDate, treatmentsToSchedule, false);
              }

              router.push(
                `${ROUTES.dashboard.checkIn.confirmation}?isCheckin=${isCheckin}`
              );
            } else if (!isDashboard && !isDerma) {
              router.push(ROUTES.checkout.confirmation);
            }
          });
        } else if (!isDerma) {
          router.push(ROUTES.checkout.contactForm);
        }
      } catch {
        setShowErrorMessage(true);
      }
    }
    if (selectedSlot && enableScheduler && !loadingDays && !loadingMonth) {
      schedule();
    }
  }, [selectedSlot]);

  function getScheduledDate(): string {
    return (
      formatDate(selectedDay!.toDate(), false) +
      ' ' +
      selectedSlot!.startTime.toString()
    );
  }

  function filterCartPendingToUpdate(): CartItem[] {
    return cart.filter(
      x =>
        x.isScheduled === false &&
        !x.isPack &&
        x.sessions <= 1 &&
        validTypesFilterCart.includes(x.type)
    );
  }

  function removeTreatmentFromList(
    idToRemove: string,
    treatments: Product[]
  ): Product[] {
    const indexToRemove = treatments.findIndex(
      treatment => treatment.id === idToRemove
    );
    if (indexToRemove !== -1) {
      treatments.splice(indexToRemove, 1);
    }
    return treatments;
  }

  function updateTreatments(
    scheduledDate: string,
    treatmentsToSchedule: Product[],
    isSession: boolean
  ): Product[] {
    const treatmentsList = treatmentsToSchedule;
    const treatmentIds: string[] = [];
    const packIds: string[] = [];
    const packsTopUpdate = treatmentPacks;

    treatmentsList.forEach(tr => {
      const packIndex = packsTopUpdate.findIndex(
        pack =>
          ((!isSession && pack.type === tr.unityType) ||
            (isSession && pack.productId === tr.id)) &&
          pack.isScheduled == false &&
          !packIds.includes(pack.id)
      );
      if (packIndex !== -1) {
        const updatedPack = { ...packsTopUpdate[packIndex] };
        updatedPack.isScheduled = true;
        updatedPack.scheduledDate = scheduledDate;
        updatedPack.treatmentName = tr.title;
        packsTopUpdate[packIndex] = updatedPack;

        treatmentIds.push(tr.id);
        packIds.push(updatedPack.id);
      } else {
        console.log('no se ha encontrado el pack');
      }
    });
    setTreatmentPacks(packsTopUpdate);
    if (!isSession) {
      treatmentIds.forEach(id => {
        treatmentsToSchedule = removeTreatmentFromList(
          id,
          treatmentsToSchedule
        );
      });
    }
    return treatmentsToSchedule;
  }

  useEffect(() => {
    const ids = getTreatmentId(selectedTreatments, selectedPacksTreatments!);
    setSelectedTreatmentsIds(ids);
  }, [dateToCheck, selectedTreatments]);

  useEffect(() => {
    if (selectedDay) {
      selectDate(dayjs(selectedDay).toDate());
      setLocalDateSelected(dayjs(selectedDay).toDate());
    } else {
      setLocalDateSelected(undefined);
    }
  }, [selectedTreatmentsIds]);

  useEffect(() => {
    loadMonth();
  }, [selectedTreatmentsIds, dateToCheck]);

  const onMonthChange = (x: any) => {
    setLoadingMonth(true);
    const date = dayjs(x);
    setcurrentMonth(date);
    setDateToCheck(date);
  };

  const selectDate = (x: Date) => {
    if (!selectedTreatmentsIds || !selectedClinic) return;
    setSelectedDay(dayjs(x));
    setSelectedSlot(undefined);
    setLocalDateSelected(x);
    setLoadingDays(true);
    setMorningHours([]);
    setAfternoonHours([]);
    const day = dayjs(x);
    const formattedDate = day.format('dddd, D [de] MMMM');
    setDateFormatted(formattedDate);
    if (selectedTreatmentsIds != '902' && !isOnline) {
      ScheduleService.getSlots(
        day.format(format),
        selectedTreatmentsIds,
        selectedClinic!.flowwwId,
        previousAppointment ? previousAppointment.professionalName : ''
      )
        .then(data => {
          callbackGetSlots(data);
        })
        .finally(() => {
          setLoadingDays(false);
        });
    } else {
      ScheduleService.getSlotsv2(
        day.format(format),
        selectedTreatmentsIds,
        selectedClinic!.flowwwId,
        previousAppointment ? previousAppointment.professionalName : ''
      )
        .then(data => {
          callbackGetSlots(data);
        })
        .finally(() => {
          setLoadingDays(false);
        });
    }
  };

  const filterDate = (date: Date) => {
    const day = dayjs(date);
    return (
      availableDates.find(x => x.date == day.format(format))?.availability ??
      false
    );
  };
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const token = params.get('token') ?? '';
    const treatment = params.get('treatment') ?? '';
    const clinicId = params.get('clinicId') ?? '';
    if (token) {
      setSelectedClinic(getClinicToSet(clinics, clinicId));
      setCurrentUser({
        flowwwToken: token,
        firstName: '',
        email: '',
        id: '',
        phone: '',
        clinicToken: token,
      });
      const getAppointments = async () => {
        if (token && treatment) {
          const res = await ScheduleService.next(token);
          let minDay = dayjs('2000-01-01');
          res.forEach(x => {
            if (x.treatmentText == 'Revisión Tratamiento' && !x.isPast) {
              setShowReviewAlreadyCreated(true);
              setAppointmentToShow(x);
            }
            if (x.isPast && !x.isCancelled && dayjs(x.startTime) < dayjs()) {
              minDay = dayjs(x.startTime);
            }
          });
          if (!showReviewAlreadyCreated) {
            setMaxDay(minDay.add(42, 'day'));
          }
          if (maxDay < dayjs()) {
            setShowTooLateToSchedule(true);
          }
          if (!showTooLateToSchedule && !showReviewAlreadyCreated) {
            const productDetails = await fetchProduct(treatment, false, false);
            setSelectedTreatments([productDetails]);
            initialize();
          }
        }
      };

      getAppointments();
    }
  }, []);

  if (showRescheduleError) {
    return (
      <Modal
        type="center"
        height="h-auto"
        width="w-full"
        className="max-w-sm mx-auto"
        isVisible={showRescheduleError}
        avoidClosing={true}
      >
        <Flex layout="col-center" className="p-4">
          <SvgCross className="self-end mb-12" />
          <Title className="mb-6">Lo sentimos</Title>

          <Flex layout="col-left" className="gap-4 w-full mb-8">
            <Flex
              layout="col-center"
              className="bg-derma-secondary300 w-full rounded-xl p-4 gap-4"
            >
              <SvgCalendar
                height={32}
                width={32}
                className={isDerma ? 'text-derma-primary' : 'text-hg-secondary'}
              />
              <p className="font-semibold">
                El horario seleccionado ya no está disponible. Haz click en otro
                horario para reagendar tu cita
              </p>
            </Flex>
          </Flex>
          <Flex layout="col-right" className="w-full">
            <Button
              className="cursor-pointer"
              type={isDerma ? 'derma' : 'primary'}
              onClick={() => {
                router.push('/reagenda?token=' + user?.clinicToken);
              }}
            >
              Seleccionar otra hora
            </Button>
          </Flex>
        </Flex>
      </Modal>
    );
  }

  if (showReviewAlreadyCreated && appointmentToShow) {
    return (
      <Flex className="flex-col mb-16 md:mb-7 px-4 md:px-0">
        <Title size="xl" className="font-semibold">
          Ya tienes una cita con nosotros.
        </Title>
        <Text size="sm" className="font-semibold mb-4 text-center">
          Puedes cambiar la hora si quieres.
        </Text>
        <AppointmentElement
          appointment={appointmentToShow}
          cancelling={false}
          isDashboard={false}
          setAppointmentToCancel={function x(
            _appointment: Appointment
          ): void {}}
          setShowCancelModal={function x(_value: boolean): void {}}
        ></AppointmentElement>
      </Flex>
    );
  }

  if (showTooLateToSchedule) {
    return (
      <Flex className="w-full flex-col mb-16 md:mb-7 px-4 md:px-0">
        <SvgSadIcon
          className={`mb-5 ${
            isDerma ? 'text-derma-primary' : 'text-hg-secondary'
          }`}
        />
        <Title size="xl" className="font-semibold">
          ¡Lo sentimos!
        </Title>
        <Text size="sm" className="font-semibold mb-4 text-center">
          No es posible agendar tu cita
        </Text>

        <Flex
          layout="col-left"
          className={`bg-derma-secondary300 p-3 gap-3 md:relative md:rounded-2xl`}
        >
          <Text className="font-semibold">
            Puedes ponerte en contacto con nosotros
          </Text>
          <Flex layout="row-left" className="gap-4 items-center w-full">
            <a href="tel:+34 682 417 208" id="tmevent_agenda_call">
              <Button size="xl" type="secondary">
                <SvgCalling className="mr-2" />
                {selectedClinic && (
                  <div>
                    <Text size="xs" className="whitespace-nowrap font-light">
                      Llámanos al
                    </Text>
                    <Text className="whitespace-nowrap">682 417 208</Text>
                  </div>
                )}
              </Button>
            </a>
            <Text size="xs">Te ayudaremos a agendar tu tratamiento</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      {showErrorMessage ? (
        <>
          <Flex className="gap-2 bg-white/50 rounded-xl p-4 text-hg-error">
            <SvgWarning className="" />
            Ups! Ha ocurrido un error
          </Flex>

          <Button
            className="mr-4"
            type="tertiary"
            customStyles="bg-hg-primary"
            href={isDashboard ? ROUTES.dashboard.menu : ROUTES.checkout.clinics}
          >
            Intentar de nuevo
          </Button>
        </>
      ) : (
        <>
          {!isDerma && (
            <Container className="mt-6 mb-4 md:mb-6 md:mt-16">
              <Title size="xldr" className="font-light">
                Selecciona día y hora
              </Title>
            </Container>
          )}
          <Container className="px-0">
            <Flex
              layout="col-left"
              className="md:gap-16 md:flex-row items-stretch"
            >
              <div className="md:w-1/2">
                <Container className="pb-4">
                  <Flex
                    layout="row-between"
                    className="block gap-16 items-start md:flex"
                  >
                    <div className="w-full">
                      <Text
                        size="sm"
                        className="w-full text-left to-hg-black500 mb-4"
                      >
                        Agenda cita para{' '}
                        {selectedPack && (
                          <span className="font-semibold">
                            {selectedPack.title}
                          </span>
                        )}
                        {!selectedPack &&
                          productIds.map((productId, index) => {
                            const product = selectedTreatments.find(
                              product => product.id === productId
                            );
                            return (
                              <span key={productId} className="font-semibold">
                                {product!.title}
                                {index < productIds.length - 1 && ', '}
                              </span>
                            );
                          })}
                        {!isDerma && !isOnline && <> en tu clínica preferida</>}
                        {isDerma && <> online</>}
                      </Text>

                      {selectedClinic && !isOnline && !isDerma && (
                        <Flex className="mb-4">
                          <SvgLocation
                            height={16}
                            width={16}
                            className="shrink-0 mr-2"
                          />
                          <Text size="xs" className="w-full text-left">
                            {selectedClinic.address}, {selectedClinic.city}
                          </Text>
                          <Text
                            onClick={() => router.back()}
                            className="text-xs ml-auto text-hg-secondary font-semibold cursor-pointer"
                          >
                            Cambiar
                          </Text>
                        </Flex>
                      )}

                      {!isDerma && (
                        <Flex>
                          <SvgHour height={16} width={16} className="mr-2" />
                          {loadingMonthFirstTime ? (
                            <SvgEllipsis
                              className={`${
                                isDerma
                                  ? 'text-derma-primary'
                                  : 'text-hg-secondary'
                              } mt-2`}
                              height={16}
                              width={16}
                            />
                          ) : (
                            <>
                              {selectedTreatments &&
                                totalTimeAppointment == 0 &&
                                Array.isArray(selectedTreatments) &&
                                selectedTreatments.map(product => (
                                  <Flex key={product.id}>
                                    <Flex
                                      layout="row-between"
                                      className="items-start w-full"
                                    >
                                      <div>
                                        <Text
                                          size="xs"
                                          className="w-full text-left"
                                        >
                                          {product.emlaType ===
                                          EmlaType.Required
                                            ? product.applicationTimeMinutes +
                                              30 +
                                              ' minutos '
                                            : product.applicationTimeMinutes.toString() +
                                              ' minutos '}
                                          <span>&nbsp;</span>
                                        </Text>
                                      </div>
                                    </Flex>
                                  </Flex>
                                ))}
                            </>
                          )}
                          {totalTimeAppointment > 0 && (
                            <Text size="xs" className="w-full text-left">
                              {totalTimeAppointment + ' minutos '}
                            </Text>
                          )}
                        </Flex>
                      )}
                    </div>
                  </Flex>
                </Container>
                <Container className="px-0 md:px-4 relative">
                  {(loadingMonth || loadingDays) && (
                    <SvgSpinner
                      height={48}
                      width={48}
                      className={`absolute ${
                        isDerma ? 'text-derma-primary' : 'text-hg-secondary'
                      } left-1/2 top-1/2 -ml-6 -mt-6`}
                    />
                  )}
                  <Flex
                    className={`transition-opacity w-full mb-6 md:mb-0 ${
                      loadingDays ? 'opacity-25' : 'opacity-100'
                    }
                    ${isDerma ? 'datepickerDerma' : ''}`}
                    id="datepickerWrapper"
                  >
                    <DatePicker
                      inline
                      onChange={selectDate}
                      filterDate={filterDate}
                      onMonthChange={onMonthChange}
                      maxDate={maxDay.toDate()}
                      minDate={new Date()}
                      useWeekdaysShort
                      calendarStartDay={1}
                      locale="es"
                      className="w-full"
                      fixedHeight
                      selected={localDateSelected}
                      disabledKeyboardNavigation
                      calendarClassName={`${loadingMonth ? 'loading' : ''}`}
                    ></DatePicker>
                  </Flex>
                </Container>
              </div>

              <div className="w-full md:w-1/2 flex flex-col md:pr-4">
                <Container className="md:px-0">
                  <Flex
                    layout="col-left"
                    className={`items-start w-full mb-4 ${
                      loadingDays ? 'opacity-25' : 'opacity-100'
                    }`}
                  >
                    {(afternoonHours.length > 0 || morningHours.length > 0) && (
                      <Flex layout="col-left" className="gap-8 w-full">
                        <Text
                          size="sm"
                          className="w-full text-left to-hg-black500"
                        >
                          Selecciona hora para el{' '}
                          <span className="font-semibold">
                            {dateFormatted.toString()}
                          </span>
                        </Text>

                        {morningHours.length > 0 && (
                          <div>
                            <Text size="sm" className="font-semibold mb-4">
                              Horario de mañana
                            </Text>
                            <SlotList
                              slots={morningHours}
                              isDerma={isDerma}
                              loadingDays={loadingDays}
                              clickedHour={clickedHour}
                              setClickedHour={setClickedHour}
                            />
                          </div>
                        )}

                        {afternoonHours.length > 0 && (
                          <div className="mb-4">
                            <Text size="sm" className="font-semibold mb-4">
                              Horario de tarde
                            </Text>
                            <SlotList
                              slots={afternoonHours}
                              isDerma={isDerma}
                              loadingDays={loadingDays}
                              clickedHour={clickedHour}
                              setClickedHour={setClickedHour}
                            />
                          </div>
                        )}
                      </Flex>
                    )}
                  </Flex>
                </Container>

                <div>
                  {isEmpty(afternoonHours) &&
                    isEmpty(morningHours) &&
                    !loadingMonth &&
                    !loadingDays &&
                    selectedDay && (
                      <Flex className="w-full flex-col mb-16 md:mb-7 px-4 md:px-0">
                        <SvgSadIcon
                          className={`mb-5 ${
                            isDerma ? 'text-derma-primary' : 'text-hg-secondary'
                          }`}
                        />
                        <Title size="xl" className="font-semibold">
                          ¡Lo sentimos!
                        </Title>
                        <Text
                          size="sm"
                          className="font-semibold mb-4 text-center"
                        >
                          No hay citas para el dia seleccionado
                        </Text>
                        <Text size="xs" className="text-center">
                          Selecciona otro día para ver la disponibilidad
                        </Text>
                      </Flex>
                    )}
                </div>
                {!loadingMonth && !loadingDays && !isDashboard && (
                  <CheckHydration>
                    <NeedHelp />
                  </CheckHydration>
                )}
              </div>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
}
