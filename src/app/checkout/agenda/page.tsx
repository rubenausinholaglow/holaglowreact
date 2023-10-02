'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
import ProductService from '@services/ProductService';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgHour, SvgLocation } from 'icons/Icons';
import { SvgCheck, SvgPhone, SvgSadIcon } from 'icons/IconsDs';
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
  const [clickedHour, setClickedHour] = useState<string | null>(null);

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
    fetchProduct();
    setSelectedTreatmentsIds('674');
    setSelectedDay(dayjs(new Date()));
    selectDate(new Date());
  }, []);

  const fetchProduct = async () => {
    const product = await ProductService.getProduct(
      '336c88de-c8b9-4379-9d6c-08db48dc8444'
    );

    console.log(product);
    const productsArray: Product[] = [product];
    console.log(productsArray);
    setSelectedTreatments(productsArray);
  };

  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatments([]);
      setSelectedTreatmentsIds(
        selectedTreatments!.map(x => x.flowwwId).join(', ')
      );
    } else setSelectedTreatmentsIds('674');
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
    //router.push('/checkout/contactform');
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

  console.log(selectedTreatments);

  return (
    <MainLayout isCheckout>
      <Container className="px-0">
        <Flex layout="col-left" className="mt-9 md:mt-16 md:flex-row items-end">
          <div className="md:w-1/2">
            <Container className="pb-4">
              <Title size="xl" className="font-semibold mb-6">
                Selecciona día y hora
              </Title>
              <Flex
                layout="row-between"
                className="block gap-16 items-start md:flex"
              >
                <div className="">
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
                      <span>
                        <SvgLocation />
                      </span>
                      <Text size="xs" className="w-full text-left pl-2">
                        {selectedClinic.address}, {selectedClinic.city}
                      </Text>
                      <Link href="/checkout/clinics" className="text-xs">
                        Cambiar
                      </Link>
                    </Flex>
                  )}
                  <Flex>
                    <SvgHour />
                    {selectedTreatments &&
                      Array.isArray(selectedTreatments) &&
                      selectedTreatments.map(product => (
                        <Flex key={product.id}>
                          <Flex
                            layout="row-between"
                            className="items-start w-full"
                          >
                            <div>
                              <Text size="xs" className="-full text-left pl-2">
                                30 minutos + 30 minutos (Crema anestéstica)
                              </Text>
                            </div>
                          </Flex>
                        </Flex>
                      ))}
                  </Flex>
                </div>
              </Flex>
            </Container>
            <Container className="px-0 md:px-4">
              <div className="">
                <Flex className="w-full mb-6 md:mb-0" id="datepickerWrapper">
                  <DatePicker
                    inline
                    onChange={selectDate}
                    filterDate={filterDate}
                    onMonthChange={onMonthChange}
                    useWeekdaysShort
                    calendarStartDay={1}
                    locale="es"
                    className="w-full"
                  ></DatePicker>
                </Flex>
              </div>
            </Container>
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">
            <Container>
              <Flex
                layout="col-left"
                className="items-start w-full mb-6 md:mb-0"
              >
                {afternoonHours.length > 0 || morningHours.length > 0 ? (
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
                              className={`gap-2 border border-hg-black text-xs rounded-xl mr-3 w-20 h-8 mb-3 ${
                                clickedHour === x.startTime
                                  ? 'bg-hg-secondary text-white'
                                  : ''
                              }`}
                            >
                              <div
                                className="w-full align-center text-center cursor-pointer"
                                onClick={() => {
                                  selectHour(x);
                                  setClickedHour(x.startTime);
                                }}
                              >
                                {clickedHour === x.startTime && (
                                  <SvgCheck className="absolute text-hg-primary ml-1" />
                                )}
                                {x.startTime} h
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
                              className={`gap-2 border border-hg-black text-xs rounded-xl mr-3 w-20 h-8 mb-3 ${
                                clickedHour === x.startTime
                                  ? 'bg-hg-secondary text-white'
                                  : ''
                              }`}
                            >
                              <div
                                className="w-full align-center text-center cursor-pointer"
                                onClick={() => {
                                  selectHour(x);
                                  setClickedHour(x.startTime);
                                }}
                              >
                                {clickedHour === x.startTime && (
                                  <SvgCheck className="absolute text-hg-primary ml-1" />
                                )}
                                {x.startTime} h
                              </div>
                            </Flex>
                          );
                        })}
                      </Flex>
                    )}
                  </>
                ) : (
                  <Flex className="w-full flex-col mb-16 md:mb-7">
                    <SvgSadIcon className="mb-5 text-hg-secondary" />
                    <Title size="xl" className="font-semibold">
                      ¡Lo sentimos!
                    </Title>
                    <Text size="sm" className="font-semibold mb-4">
                      No hay citas para el dia seleccionado
                    </Text>
                    <Text size="xs">
                      Selecciona otro día para ver la disponibilidad
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Container>
            <Flex
              layout="col-left"
              className="bg-hg-primary300 p-3 gap-3 md:relative w-full rounded-xl md:rounded-none"
            >
              <Text size="sm" className="font-semibold">
                ¿La cita que necesitas no está disponible?
              </Text>
              <Flex layout="row-left" className="gap-4 items-center w-full">
                <Button size="xl" type="tertiary">
                  <SvgPhone className="mr-2" />
                  {selectedClinic && (
                    <div>
                      <Text size="xs" className="whitespace-nowrap">
                        Llamanos al
                      </Text>
                      <Text className="whitespace-nowrap">
                        {selectedClinic.phone}
                      </Text>
                    </div>
                  )}
                </Button>
                <Text size="xs">Te ayudaremos a agendar tu tratamiento</Text>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Container>
    </MainLayout>
  );
}
