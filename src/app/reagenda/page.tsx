'use client';

import { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { Appointment } from '@interface/appointment';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [appointments, setAppointments] = useState([] as Appointment[]);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const token = params.get('token');
    const showPast = params.get('showPast') == 'true';

    const getAppointments = async () => {
      if (token) {
        const res = await ScheduleService.next(token);
        setAppointments(res);
      }
    };

    getAppointments();
  }, []);

  return (
    <>
      <Flex className="justify-center h-screen">
        {appointments.map(x => {
          return <div></div>;
        })}
      </Flex>
    </>
  );
}
