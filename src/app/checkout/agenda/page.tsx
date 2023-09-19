'use client';

import ScheduleService from '@services/ScheduleService';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useEffect, useState } from 'react';
import { DayAvailability } from './../../dashboard/interface/dayAvailability';
import dayjs, { Dayjs } from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Slot } from '@interface/slot';
import { Appointment } from '@interface/appointment';
import DatePicker from 'react-datepicker';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

dayjs.locale(spanishConf);

export default function Agenda() {
  const router = useRouter();
  const [dateToCheck, setDateToCheck] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
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
    console.log(selectedDay);
  }, []);
  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatments([]);
      setSelectedTreatmentsIds(
        selectedTreatments!.map(x => x.flowwwId).join(', ')
      );
    } else setSelectedTreatmentsIds('902');
  }, [dateToCheck]);
  useEffect(() => {
    loadMonth();
  }, [selectedTreatmentsIds, dateToCheck]);

  const onMonthChange = (x: any) => {
    const date = dayjs(x);
    setDateToCheck(date);
  };
  const selectHour = (x: Slot) => {
    setSelectedSlot(x);
    router.push('/checkout/contactform');
  };
  const selectDate = (x: Date) => {
    setMorningHours([]);
    setAfternoonHours([]);
    const day = dayjs(x);
    debugger;
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
  return (
    <Flex layout="col-center">
      <Flex>Selecciona día y hora</Flex>
      {selectedClinic && (
        <Flex>
          {selectedClinic.address}
          <Button onClick={changeClinic}>Cambiar</Button>
        </Flex>
      )}
      <Flex>
        <DatePicker
          inline
          onChange={selectDate}
          filterDate={filterDate}
          onMonthChange={onMonthChange}
          calendarStartDay={1}
        ></DatePicker>
      </Flex>
      {localSelectedDay && (
        <Flex>
          {' '}
          Selecciona hora para el {localSelectedDay.format('dddd')},{' '}
          {localSelectedDay.format('D')} de {localSelectedDay.format('MMMM')}
        </Flex>
      )}
      <Flex>
        {morningHours.length > 0 && (
          <Flex>
            <Flex>Morning hours</Flex>
            {morningHours.map(x => {
              return (
                <Flex key={x.startTime}>
                  <div onClick={() => selectHour(x)}>{x.startTime}</div>
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
      {afternoonHours.length > 0 && (
        <Flex>
          <Flex>Afternoon hours</Flex>
          {afternoonHours.map(x => {
            return (
              <Flex key={x.startTime}>
                <div onClick={() => selectHour(x)}>{x.startTime}</div>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}
