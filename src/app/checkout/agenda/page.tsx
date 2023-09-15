'use client';
import ScheduleService from '@services/ScheduleService';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useEffect, useState } from 'react';
import { DayAvailability } from './../../dashboard/interface/dayAvailability';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Slot } from '@interface/slot';
import { Appointment } from '@interface/appointment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Agenda() {
  const [dateToCheck, setDateToCheck] = useState(dayjs());
  const [availableDates, setAvailableDates] = useState(Array<DayAvailability>);
  const [availableHours, setAvailableHours] = useState(Array<Slot>);
  const [morningHours, setMorningHours] = useState(Array<Slot>);
  const [afternoonHours, setAfternoonHours] = useState(Array<Slot>);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelcectedSlot] = useState({} as Slot);
  const format = 'YYYY-MM-DD';
  var service = '902'; //TODO: Get from global state
  var clinicId = '1'; //TODO: Get from global state
  useEffect(() => {
    ScheduleService.getMonthAvailability(
      dateToCheck.format(format),
      service,
      clinicId
    ).then(data => {
      var availability = availableDates ?? [];
      const maxDays = 15;
      var today = dayjs();
      data.forEach((x: any) => {
        var date = dayjs(x.date);
        if (
          (x.availability && availability.length < maxDays && date >= today) ||
          (service != '902' && service != '903') //TODO: Change this with some validation for "Probador Virtual"
        ) {
          availability.push(x);
        }
      });
      setAvailableDates(availability);
    });
  }, [dateToCheck]);

  const onMonthChange = (x: any) => {
    var date = dayjs(x);
    setDateToCheck(date);
    console.log(date);
  };
  const selectHour = (x: Slot) => {
    setSelcectedSlot(x);
  };
  const selectDate = (x: Date) => {
    setMorningHours([]);
    setAfternoonHours([]);
    var day = dayjs(x).format(format);
    setSelectedDay(day);
    ScheduleService.getSlots(day, service, clinicId).then(data => {
      var hours = Array<Slot>();
      var morning = Array<Slot>();
      var afternoon = Array<Slot>();
      data.forEach(x => {
        var hour = x.startTime.split(':')[0];
        var minutes = x.startTime.split(':')[1];
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
      setAvailableHours(hours);
      setMorningHours(morning);
      setAfternoonHours(afternoon);
    });
  };

  const confirm = () => {
    var appointments = [];
    appointments.push({
      box: selectedSlot.box,
      endTime: selectedSlot.endTime,
      id: '0',
      startTime: selectedSlot.startTime,
      treatment: service,
      clientId: '', //TODO: Pending
      comment: '', //TODO: Pending
      treatmentText: '', //TODO: Pending
      referralId: '',
      externalReference: '', //TODO: Pending
      isPast: false,
      clinicId: clinicId,
      isCancelled: false,
    } as Appointment);
    ScheduleService.scheduleBulk(appointments).then(x => {
      console.log('AGENDADO!'); //Redirect
    });
  };
  const filterDate = (date: string) => {
    var day = dayjs(date);
    return (
      availableDates.find(x => x.date == day.format(format))?.availability ??
      false
    );
  };
  return (
    <Flex>
      <Flex>
        <DatePicker
          inline
          onChange={selectDate}
          filterDate={filterDate}
          onMonthChange={onMonthChange}
        ></DatePicker>
      </Flex>
      <Flex>
        {morningHours && (
          <Flex>
            "Morning hours"
            {morningHours.map(x => {
              return (
                <Flex>
                  <div onClick={() => selectHour(x)}>{x.startTime}</div>
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
      {afternoonHours && (
        <Flex>
          "Afternoon hours"
          {afternoonHours.map(x => {
            return (
              <Flex>
                <div onClick={() => selectHour(x)}>{x.startTime}</div>
              </Flex>
            );
          })}
        </Flex>
      )}
      <Button onClick={confirm}>Confirm</Button>
    </Flex>
  );
}
