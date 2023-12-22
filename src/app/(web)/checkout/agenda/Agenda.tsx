'use client';

import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgHour, SvgLocation, SvgSpinner } from 'app/icons/Icons';
import { SvgCheck, SvgPhone, SvgSadIcon } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { DayAvailability } from 'app/types/dayAvailability';
import { Slot } from 'app/types/slot';
import useRoutes from 'app/utils/useRoutes';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Agenda({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) {
  const router = useRouter();
  const ROUTE = useRoutes();
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
  const [dateToCheck, setDateToCheck] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
  const [dateFormatted, setDateFormatted] = useState('');
  const [localDateSelected, setLocalDateSelected] = useState(new Date());
  const [selectedTreatmentsIds, setSelectedTreatmentsIds] = useState('');
  const format = 'YYYY-MM-DD';
  let maxDays = 30;
  const maxDaysByClinicAndType: any = {
    '1': {
      //Madrid
      '0': 10,
    },
    '4': {
      //Barcelona
      '1': 30,
      '2': 30,
    },
    '5': {
      //Valencia
      '0': 10,
      '1': 15,
      '2': 15,
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
  const [clicked, setClicked] = useState(false);
  const [clickedHour, setClickedHour] = useState<string | null>(null);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);
  const maxDay = dayjs().add(maxDays, 'day');
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  function loadMonth() {
    if (selectedTreatmentsIds && availableDates.length < maxDays) {
      if (selectedTreatmentsIds != '902') {
        ScheduleService.getMonthAvailability(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic?.flowwwId || ''
        ).then(data => {
          callbackMonthAvailability(data);
        });
      } else {
        ScheduleService.getMonthAvailabilityv2(
          dateToCheck.format(format),
          selectedTreatmentsIds,
          selectedClinic!.flowwwId
        ).then(data => {
          callbackMonthAvailability(data);
        });
      }
    } else setLoadingMonth(false);
  }

  function callbackGetSlots(data: Slot[]) {
    const hours = Array<Slot>();
    const morning = Array<Slot>();
    const afternoon = Array<Slot>();
    data.forEach(x => {
      const hour = x.startTime.split(':')[0];
      const minutes = x.startTime.split(':')[1];
      if (
        (minutes == '00' || minutes == '30') &&
        !(hour == '10' && minutes == '00')
      ) {
        hours.push(x);
        if (parseInt(hour) < 16) {
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

  function callbackMonthAvailability(data: DayAvailability[]) {
    const availability = availableDates ?? [];
    const today = dayjs();
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
    if (!selectedDay) {
      setSelectedDay(dayjs(availability[0].date));
    } else {
      setSelectedDay(selectedDay);
    }
    setLoadingMonth(false);
  }

  useEffect(() => {
    setLoadingMonth(true);
    setSelectedDay(dayjs());
    setSelectedSlot(undefined);
    setEnableScheduler(true);
  }, []);

  useEffect(() => {
    async function schedule() {
      if (user?.flowwwToken && previousAppointment) {
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
              selectedDay!.format(format) + ' ' + selectedSlot!.endTime + ':00',
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
          if (isDashboard) {
            router.push(ROUTE.dashboard.checkIn.confirmation);
          } else {
            router.push('/checkout/confirmation');
          }
        });
      } else if (user) {
        setLoadingDays(true);
        setLoadingMonth(true);
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
          if (isDashboard) {
            router.push(ROUTE.dashboard.checkIn.confirmation);
          } else {
            router.push('/checkout/confirmation');
          }
        });
      } else {
        router.push('/checkout/contactform');
      }
    }

    if (selectedSlot && enableScheduler && !loadingDays && !loadingMonth) {
      schedule();
    }
  }, [selectedSlot]);

  useEffect(() => {
    if (selectedPacksTreatments && selectedPacksTreatments.length > 0) {
      setSelectedTreatmentsIds(
        selectedPacksTreatments!
          .slice(0, 2)
          .map(x => x.flowwwId)
          .join(',')
      );
    } else if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatmentsIds(
        selectedTreatments!.map(x => x.flowwwId).join(',')
      );
    } else setSelectedTreatmentsIds('674');
  }, [dateToCheck]);

  useEffect(() => {
    selectDate(dayjs(selectedDay).toDate());
    setLocalDateSelected(dayjs(selectedDay).toDate());
  }, [selectedTreatmentsIds]);

  useEffect(() => {
    loadMonth();
  }, [selectedTreatmentsIds, dateToCheck]);

  const onMonthChange = (x: any) => {
    setLoadingMonth(true);
    const date = dayjs(x);
    setDateToCheck(date);
  };
  const selectHour = async (x: Slot) => {
    toggleClicked();
    setSelectedSlot(x);
  };

  const selectDate = (x: Date) => {
    if (!selectedTreatmentsIds) return;
    setSelectedDay(dayjs(x));
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
      <Container className="mt-6 mb-4 md:mb-6 md:mt-16">
        <Title size="xl" className="font-semibold">
          Selecciona día y hora
        </Title>
      </Container>
      <Container className="px-0">
        <Flex layout="col-left" className="md:gap-16 md:flex-row items-stretch">
          <div className="md:w-1/2">
            <Container className="pb-4">
              <Flex
                layout="row-between"
                className="block gap-16 items-start md:flex"
              >
                <div className="w-full">
                  {selectedTreatments &&
                    Array.isArray(selectedTreatments) &&
                    selectedTreatments.map(product => (
                      <div key={product.id}>
                        <Text
                          size="sm"
                          className="w-full text-left to-hg-black500 mb-4"
                        >
                          Agenda cita para{' '}
                          <span className="font-semibold w-full">
                            {product.title}
                          </span>
                          , en tu clínica preferida
                        </Text>
                      </div>
                    ))}

                  {selectedClinic && (
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
                        href="/checkout/clinicas"
                        className="text-xs ml-auto text-hg-secondary font-semibold"
                      >
                        Cambiar
                      </Link>
                    </Flex>
                  )}
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
                              <Text size="xs" className="w-full text-left">
                                {product.applicationTimeMinutes} minutos
                              </Text>
                            </div>
                          </Flex>
                        </Flex>
                      ))}
                  </Flex>
                </div>
              </Flex>
            </Container>
            <Container className="px-0 md:px-4 relative">
              {loadingDays && (
                <SvgSpinner
                  height={48}
                  width={48}
                  className="absolute text-hg-secondary left-1/2 top-1/2 -ml-6 -mt-6"
                />
              )}
              <Flex
                className={`transition-opacity w-full mb-6 md:mb-0 ${
                  loadingDays ? 'opacity-25' : 'opacity-100'
                }`}
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
                              className={`transition-all gap-2 border border-hg-black text-sm rounded-xl mr-3 w-20 h-8 mb-3 ${
                                clickedHour === x.startTime
                                  ? 'bg-hg-secondary text-white'
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
                              className={`transition-all gap-2 border border-hg-black text-sm rounded-xl mr-3 w-20 h-8 mb-3 ${
                                clickedHour === x.startTime
                                  ? 'bg-hg-secondary text-white'
                                  : 'bg-white'
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
                                  <SvgCheck className="text-hg-primary mr-1" />
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
                !loadingDays && (
                  <Flex className="w-full flex-col mb-16 md:mb-7 px-4 md:px-0">
                    <SvgSadIcon className="mb-5 text-hg-secondary" />
                    <Title size="xl" className="font-semibold">
                      ¡Lo sentimos!
                    </Title>
                    <Text size="sm" className="font-semibold mb-4 text-center">
                      No hay citas para el dia seleccionado
                    </Text>
                    <Text size="xs" className="text-center">
                      Selecciona otro día para ver la disponibilidad
                    </Text>
                  </Flex>
                )}
              {!loadingMonth && !loadingDays && (
                <Flex
                  layout="col-left"
                  className="bg-hg-primary100 p-3 gap-3 md:relative w-full rounded-2xl md:rounded-none"
                >
                  <Text className="font-semibold">
                    ¿La cita que necesitas no está disponible?
                  </Text>
                  <Flex layout="row-left" className="gap-4 items-center w-full">
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
    </MainLayout>
  );
}
