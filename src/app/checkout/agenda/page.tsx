'use client';

import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Slot } from '@interface/slot';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgHour, SvgLocation, SvgSpinner } from 'icons/Icons';
import { SvgCheck, SvgPhone, SvgSadIcon } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DayAvailability } from './../../dashboard/interface/dayAvailability';

export default function Agenda() {
  const router = useRouter();
  const [dateToCheck, setDateToCheck] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
  const [dateFromatted, setDateFormatted] = useState('');
  const { selectedDay, setSelectedDay, user } = useGlobalPersistedStore(
    state => state
  );
  const {
    setSelectedSlot,
    selectedSlot,
    previousAppointment,
    selectedTreatments,
    selectedPacksTreatments,
    selectedClinic,
    analyticsMetrics,
  } = useGlobalPersistedStore(state => state);
  const [selectedTreatmentsIds, setSelectedTreatmentsIds] = useState('');
  const format = 'YYYY-MM-DD';
  const maxDays = 10;
  const [clicked, setClicked] = useState(false);
  const [clickedHour, setClickedHour] = useState<string | null>(null);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  function loadMonth() {
    if (
      selectedTreatmentsIds &&
      (availableDates.length < maxDays ||
        selectedTreatmentsIds.indexOf(
          process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_FLOWWWID!
        ) == -1)
    ) {
      setLoadingMonth(true);
      ScheduleService.getMonthAvailability(
        dateToCheck.format(format),
        selectedTreatmentsIds,
        selectedClinic!.flowwwId
      ).then(data => {
        const availability = availableDates ?? [];
        const today = dayjs();
        data.forEach((x: any) => {
          const date = dayjs(x.date);
          if (
            (availability.length < maxDays ||
              selectedTreatmentsIds.indexOf(
                process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_FLOWWWID!
              ) == -1) &&
            (date.isAfter(today) || date.isSame(today, 'day')) &&
            x.availability
          ) {
            availability.push(x);
          }
        });
        setAvailableDates(availability);
        if (!selectedDay) {
          setSelectedDay(dayjs());
          selectDate(new Date());
        } else {
          setSelectedDay(selectedDay);
        }
        setLoadingMonth(false);
      });
    }
  }

  useEffect(() => {
    setSelectedDay(dayjs(new Date()));
    selectDate(new Date());
  }, []);

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
    loadMonth();
    selectDate(dateToCheck.toDate());
  }, [selectedTreatmentsIds, dateToCheck]);

  useEffect(() => {
    if (!selectedClinic) {
      router.push(ROUTES.home);
    }
  }, []);

  const onMonthChange = (x: any) => {
    const date = dayjs(x);
    setDateToCheck(date);
  };
  const selectHour = async (x: Slot) => {
    toggleClicked();
    setSelectedSlot(x);
    if (user?.flowwwToken && previousAppointment) {
      let ids = selectedTreatments!.map(x => x.flowwwId).join(', ');
      if (selectedPacksTreatments && selectedPacksTreatments.length) {
        ids = selectedPacksTreatments!
          .slice(0, 2)
          .map(x => x.flowwwId)
          .join(',');
      }
      const treatments = selectedTreatments!.map(x => x.title).join(', ');
      const comment = 'Tratamiento visto en web: ' + treatments;
      ScheduleService.reschedule({
        next: {
          box: selectedSlot!.box,
          endTime: selectedDay!.format(format) + ' ' + selectedSlot!.endTime,
          id: '0',
          startTime:
            selectedDay!.format(format) + ' ' + selectedSlot!.startTime,
          treatment: ids,
          clientId: user?.flowwwToken,
          comment: comment,
          treatmentText: treatments,
          referralId: '',
          externalReference: '',
          isPast: false,
          clinicId: selectedClinic?.flowwwId,
          isCancelled: false,
        },
        previous: previousAppointment,
      }).then(x => {
        router.push('/checkout/confirmation');
      });
    } else if (user) {
      await ScheduleService.createAppointment(
        selectedTreatments,
        selectedSlot!,
        selectedDay,
        selectedClinic!,
        user,
        selectedPacksTreatments!,
        analyticsMetrics
      ).then(x => {
        router.push('/checkout/confirmation');
      });
    } else {
      router.push('/checkout/contactform');
    }
  };

  const selectDate = (x: Date) => {
    if (!selectedTreatmentsIds) return;
    setLoadingDays(true);
    setMorningHours([]);
    setAfternoonHours([]);
    const day = dayjs(x);
    const formattedDate = day.format('dddd, D [de] MMMM');
    setDateFormatted(formattedDate);
    setSelectedDay(day);
    ScheduleService.getSlots(
      day.format(format),
      selectedTreatmentsIds,
      selectedClinic!.flowwwId
    )
      .then(data => {
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
      })
      .finally(() => {
        setLoadingDays(false);
      });
  };

  const filterDate = (date: Date) => {
    const day = dayjs(date);
    return (
      availableDates.find(x => x.date == day.format(format))?.availability ??
      false
    );
  };

  return (
    <MainLayout isCheckout>
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
                  useWeekdaysShort
                  calendarStartDay={1}
                  locale="es"
                  className="w-full"
                  fixedHeight
                  calendarClassName={`${loadingMonth ? 'loading' : ''}`}
                ></DatePicker>
              </Flex>
            </Container>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <Container>
              <Flex
                layout="col-left"
                className="items-start w-full mb-6 md:mb-0"
              >
                {(afternoonHours.length > 0 || morningHours.length > 0) && (
                  <>
                    <Text
                      size="sm"
                      className="w-full text-left to-hg-black500 mb-6"
                    >
                      Selecciona hora para el{' '}
                      <span className="font-semibold">
                        {dateFromatted.toString()}
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
                                onClick={() => {
                                  selectHour(x);
                                  setClickedHour(x.startTime);
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
                                onClick={() => {
                                  selectHour(x);
                                  setClickedHour(x.startTime);
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
