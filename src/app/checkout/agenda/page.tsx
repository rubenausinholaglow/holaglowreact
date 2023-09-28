'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Slot } from '@interface/slot';
import es from 'date-fns/locale/es';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgHour, SvgLocation } from 'icons/Icons';
import { SvgCheck, SvgPhone } from 'icons/IconsDs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DayAvailability } from './../../dashboard/interface/dayAvailability';

dayjs.locale(spanishConf);
registerLocale('es', es);
export default function Agenda() {
  const router = useRouter();
  const [dateToCheck, setDateToCheck] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
  const [dateFromatted, setDateFormatted] = useState('');
  const { selectedDay, setSelectedDay } = useGlobalPersistedStore(
    state => state
  );
  const { setSelectedSlot } = useGlobalPersistedStore(state => state);
  const { selectedTreatments, setSelectedTreatments } = useGlobalPersistedStore(
    state => state
  );
  const { selectedClinic } = useGlobalPersistedStore(state => state);
  const [selectedTreatmentsIds, setSelectedTreatmentsIds] = useState('');
  const format = 'YYYY-MM-DD';
  const maxDays = 10;
  const localSelectedDay = dayjs(selectedDay);
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked); // Step 2: Toggle the state on click
  };

  function loadMonth() {
    if (selectedTreatmentsIds && availableDates.length < maxDays) {
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
                process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!
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
        }
      });
    }
  }

  useEffect(() => {
    setSelectedDay(dayjs());
  }, []);

  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatments([]);
      setSelectedTreatmentsIds(
        selectedTreatments!.map(x => x.flowwwId).join(', ')
      );
    } else setSelectedTreatmentsIds('674');

    console.log('here');
  }, [dateToCheck]);

  useEffect(() => {
    loadMonth();
  }, [selectedTreatmentsIds, dateToCheck]);

  const onMonthChange = (x: any) => {
    const date = dayjs(x);
    setDateToCheck(date);
  };
  const selectHour = (x: Slot) => {
    toggleClicked();
    setSelectedSlot(x);
    router.push('/checkout/contactform');
  };
  const selectDate = (x: Date) => {
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
    ).then(data => {
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
    });
  };

  const filterDate = (date: Date) => {
    const day = dayjs(date);
    return (
      availableDates.find(x => x.date == day.format(format))?.availability ??
      false
    );
  };

  const changeClinic = () => {
    router.back();
  };

  const divStyle = {
    border: '1px solid #344054',
    borderRadius: '8px',
    paddingRight: '10px',
    paddingLeft: '10px',
    marginRight: '10px',
    backgroundColor: clicked ? '#YourSelectedColor' : 'transparent', // Step 3: Conditional background color
    cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
  };

  return (
    <MainLayout isCheckout>
      <div className="relative mt-9 md:mt-16">
        <Container>
          <Title size="xl" className="font-semibold mb-6">
            Selecciona día y hora
          </Title>
          <Flex layout="row-between" className="gap-16 items-start">
            <div className="w-1/2">
              <Text size="sm" className="w-full text-left to-hg-black500 mb-4">
                Agenda cita para{' '}
                <span className="font-semibold">
                  Arrugas expresión: Frente, entrecejo y patas de gallo
                </span>
                , en tu clínica preferida
              </Text>

              {selectedClinic && (
                <Flex className="mb-4">
                  <span>
                    <SvgLocation />
                  </span>
                  <Text
                    size="xs"
                    className="font-semibold w-full text-left pl-2"
                  >
                    {selectedClinic.address}, {selectedClinic.city}
                  </Text>
                  <Link href="/checkout/clinics" className="text-xs">
                    Cambiar
                  </Link>
                </Flex>
              )}
              <Flex className="mb-4">
                <SvgHour />
                {selectedTreatments &&
                  Array.isArray(selectedTreatments) &&
                  selectedTreatments.map(product => (
                    <Flex
                      layout="col-left"
                      className="bg-hg-tertiary100 p-3 gap-3 rounded-xl md:w-1/2 mb-12"
                      key={product.id}
                    >
                      <Flex layout="row-between" className="items-start w-full">
                        <div>
                          <Text className="font-semibold text-left mb-2">
                            {product.applicationTimeMinutes}
                          </Text>
                        </div>
                      </Flex>
                    </Flex>
                  ))}
              </Flex>
              <Flex className="w-full" id="datepickerWrapper">
                <DatePicker
                  inline
                  onChange={selectDate}
                  filterDate={filterDate}
                  onMonthChange={onMonthChange}
                  calendarStartDay={1}
                  locale="es"
                  className="w-full bg-gray-600"
                ></DatePicker>
              </Flex>
            </div>
            <div className="w-1/2">
              <Text size="sm" className="w-full text-left to-hg-black500 mb-12">
                Selecciona hora para el {dateFromatted.toString()}
              </Text>
              <Text size="sm" className="font-semibold mb-4">
                Horario de mañana
              </Text>
              <Flex className="mb-12">
                {morningHours.length > 0 && (
                  <Flex>
                    {morningHours.map(x => {
                      return (
                        <Flex key={x.startTime}>
                          <div onClick={() => selectHour(x)} style={divStyle}>
                            {x.startTime} h
                          </div>
                        </Flex>
                      );
                    })}
                  </Flex>
                )}
              </Flex>
              <Text size="sm" className="font-semibold mb-4">
                Horario de tarde
              </Text>
              {afternoonHours.length > 0 && (
                <Flex className="mb-8">
                  {afternoonHours.map(x => {
                    return (
                      <Flex key={x.startTime}>
                        <Flex onClick={() => selectHour(x)} style={divStyle}>
                          <SvgCheck className="mr-2" />
                          {x.startTime} h
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              )}
              <Flex
                layout="col-left"
                className="bg-hg-primary300 p-3 gap-3 fixed bottom-0 left-0 right-0 md:relative"
              >
                <Text>¿La cita que necesitas no está disponible?</Text>
                <Button size="xl" type="tertiary">
                  <SvgPhone className="mr-2" />
                  <div>
                    <Text size="xs">Llamanos</Text>
                    <Text>al 999-999-999</Text>
                  </div>
                </Button>
                <Text className="text-sm">
                  Te ayudaremos a agendar tu tratamiento
                </Text>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </MainLayout>
  );
}
