'use client';

import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ScheduleService from '@services/ScheduleService';
import { getTreatmentId } from '@utils/userUtils';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgHour, SvgLocation, SvgSpinner } from 'app/icons/Icons';
import { SvgCheck, SvgPhone, SvgSadIcon, SvgWarning } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { DayAvailability } from 'app/types/dayAvailability';
import { Slot } from 'app/types/slot';
import useRoutes from 'app/utils/useRoutes';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Agenda({
  isDashboard = false,
  isCheckin = false,
  isDerma = false,
}: {
  isDashboard?: boolean;
  isCheckin?: boolean;
  isDerma?: boolean;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();
  const { user } = useGlobalPersistedStore(state => state);

  const {
    setSelectedSlot,
    selectedSlot,
    previousAppointment,
    selectedTreatments,
    selectedPacksTreatments,
    selectedClinic,
    analyticsMetrics,
    selectedDay,
    setSelectedDay,
  } = useSessionStore(state => state);

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
  const format = 'YYYY-MM-DD';
  let maxDays = 60;
  const maxDaysByClinicAndType: any = {
    '1': {
      //Madrid
      '0': 10,
    },
    '4': {
      //Barcelona
      '0': 15,
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
  }
  if (isDerma) maxDays = 365;
  const [clicked, setClicked] = useState(false);
  const [clickedHour, setClickedHour] = useState<string | null>(null);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);
  const maxDay = dayjs().add(maxDays, 'day');
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  function loadMonth() {
    setLoadingMonth(true);
    if (
      selectedTreatmentsIds &&
      availableDates.length < maxDays &&
      dateToCheck
    ) {
      if (selectedTreatmentsIds != '902') {
        ScheduleService.getMonthAvailability(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic?.flowwwId || ''
        ).then(data => {
          callbackMonthAvailability(data, dateToCheck);
        });
      } else {
        ScheduleService.getMonthAvailabilityv2(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic!.flowwwId
        ).then(data => {
          callbackMonthAvailability(data, dateToCheck);
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
      if (
        ((minutes == '00' || minutes == '30') &&
          !(hour == '10' && minutes == '00')) ||
        (selectedTreatmentsIds != '902' &&
          (minutes == '00' ||
            minutes == '12' ||
            minutes == '24' ||
            minutes == '36' ||
            minutes == '48'))
      ) {
        if (x.box != '7' || (x.box == '7' && !isDashboard && !user)) {
          hours.push(x);
          if (parseInt(hour) < 16) {
            morning.push(x);
          } else afternoon.push(x);
        }
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
        (date.isAfter(today) || date.isSame(today, 'day')) &&
        x.availability
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
            if (isDashboard && !isDerma) {
              router.push(
                `${ROUTES.dashboard.checkIn.confirmation}?isCheckin=${isCheckin}`
              );
            } else if (!isDashboard && !isDerma) {
              router.push(ROUTES.checkout.thankYou);
            }
          });
        } else if (user && selectedDay && !isDerma) {
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
            ''
          ).then(x => {
            if (isDashboard && !isDerma) {
              router.push(
                `${ROUTES.dashboard.checkIn.confirmation}?isCheckin=${isCheckin}`
              );
            } else if (!isDashboard && !isDerma) {
              router.push(ROUTES.checkout.thankYou);
            }
          });
        } else if (!isDerma) {
          router.push('/checkout/contactform');
        }
      } catch {
        setShowErrorMessage(true);
      }
    }

    if (selectedSlot && enableScheduler && !loadingDays && !loadingMonth) {
      schedule();
    }
  }, [selectedSlot]);

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
  const selectHour = async (x: Slot) => {
    toggleClicked();
    setSelectedSlot(x);

    if (isDerma) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
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
    if (selectedTreatmentsIds != '902') {
      ScheduleService.getSlots(
        day.format(format),
        selectedTreatmentsIds,
        selectedClinic!.flowwwId
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
        selectedClinic!.flowwwId
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

  return (
    <MainLayout isCheckout hideHeader={isDashboard}>
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
              <Title size="xl" className="font-semibold">
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
                        {Array.isArray(selectedTreatments) &&
                          selectedTreatments.map(product => (
                            <span key={product.id} className="font-semibold">
                              {product.title},{' '}
                            </span>
                          ))}
                        en tu clínica preferida
                      </Text>

                      {selectedClinic && !isDerma && (
                        <Flex className="mb-4">
                          <SvgLocation
                            height={16}
                            width={16}
                            className="shrink-0 mr-2"
                          />
                          <Text size="xs" className="w-full text-left">
                            {selectedClinic.address}, {selectedClinic.city}
                          </Text>
                          <Link
                            href={
                              isDashboard
                                ? ROUTES.dashboard.schedule
                                : ROUTES.checkout.clinics
                            }
                            className="text-xs ml-auto text-hg-secondary font-semibold"
                          >
                            Cambiar
                          </Link>
                        </Flex>
                      )}

                      {!isDerma && (
                        <Flex>
                          <SvgHour height={16} width={16} className="mr-2" />
                          {selectedTreatments &&
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
                                      {product.applicationTimeMinutes} minutos
                                    </Text>
                                  </div>
                                </Flex>
                              </Flex>
                            ))}
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

              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <Container>
                  <Flex
                    layout="col-left"
                    className={`items-start w-full mb-6 md:mb-0 ${
                      loadingDays ? 'opacity-25' : 'opacity-100'
                    }`}
                  >
                    {(afternoonHours.length > 0 || morningHours.length > 0) && (
                      <>
                        <Text
                          size="sm"
                          className="w-full text-left to-hg-black500 mb-6"
                        >
                          Selecciona hora para el{' '}
                          <span className="font-semibold">
                            {dateFormatted.toString()}
                          </span>
                        </Text>
                        {morningHours.length > 0 && (
                          <Text size="sm" className="font-semibold mb-4">
                            Horario de mañana
                          </Text>
                        )}
                        {morningHours.length > 0 && (
                          <Flex className="flex-wrap  mb-3 md:mb-0">
                            {morningHours.map(x => {
                              return (
                                <Flex
                                  key={x.startTime}
                                  layout="row-between"
                                  className={`transition-all gap-2 text-sm rounded-xl mr-3 w-20 h-8 mb-3 ${
                                    isDerma
                                      ? 'border-none bg-derma-secondary400'
                                      : 'border border-hg-black bg-white'
                                  } ${
                                    clickedHour === x.startTime
                                      ? `${
                                          isDerma
                                            ? 'bg-derma-primary'
                                            : 'bg-hg-secondary'
                                        } text-white`
                                      : ''
                                  }`}
                                >
                                  <div
                                    className="w-full cursor-pointer flex justify-center"
                                    onClick={async () => {
                                      if (!loadingDays) {
                                        setClickedHour(x.startTime);
                                        await selectHour(x);
                                      }
                                    }}
                                  >
                                    {clickedHour === x.startTime && (
                                      <SvgCheck className="text-hg-primary mr-1 h-4 w-4" />
                                    )}
                                    {x.startTime}
                                  </div>
                                </Flex>
                              );
                            })}
                          </Flex>
                        )}
                        {afternoonHours.length > 0 && (
                          <Text size="sm" className="font-semibold mb-4">
                            Horario de tarde
                          </Text>
                        )}
                        {afternoonHours.length > 0 && (
                          <Flex className="flex-wrap mb-6 md:mb-0">
                            {afternoonHours.map(x => {
                              return (
                                <Flex
                                  key={x.startTime}
                                  layout="row-between"
                                  className={`transition-all gap-2 text-sm rounded-xl mr-3 w-20 h-8 mb-3 ${
                                    isDerma
                                      ? 'border-none bg-derma-secondary400'
                                      : 'border border-hg-black bg-white'
                                  } ${
                                    clickedHour === x.startTime
                                      ? `${
                                          isDerma
                                            ? 'bg-derma-primary'
                                            : 'bg-hg-secondary'
                                        } text-white`
                                      : ''
                                  }`}
                                >
                                  <div
                                    className="w-full cursor-pointer flex justify-center"
                                    onClick={async () => {
                                      if (!loadingDays) {
                                        setClickedHour(x.startTime);
                                        await selectHour(x);
                                      }
                                    }}
                                  >
                                    {clickedHour === x.startTime && (
                                      <SvgCheck className="text-white mr-1" />
                                    )}
                                    {x.startTime}
                                  </div>
                                </Flex>
                              );
                            })}
                          </Flex>
                        )}
                      </>
                    )}
                  </Flex>
                </Container>

                <div className="mt-auto">
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
                  {!loadingMonth && !loadingDays && !isDashboard && (
                    <Flex
                      layout="col-left"
                      className="bg-hg-primary100 p-3 gap-3 md:relative w-full rounded-2xl md:rounded-none"
                    >
                      <Text className="font-semibold">
                        ¿La cita que necesitas no está disponible?
                      </Text>
                      <Flex
                        layout="row-left"
                        className="gap-4 items-center w-full"
                      >
                        <a href="tel:+34 682 417 208">
                          <Button size="xl" type="tertiary">
                            <SvgPhone className="mr-2" />
                            {selectedClinic && (
                              <div>
                                <Text size="xs" className="whitespace-nowrap">
                                  Llamanos al
                                </Text>
                                <Text size="lg" className="whitespace-nowrap">
                                  {selectedClinic.phone}
                                </Text>
                              </div>
                            )}
                          </Button>
                        </a>
                        <Text size="xs">
                          Te ayudaremos a agendar tu tratamiento
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </div>
              </div>
            </Flex>
          </Container>
        </>
      )}
    </MainLayout>
  );
}
