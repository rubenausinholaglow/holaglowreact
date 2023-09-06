'use client';

import { useEffect } from 'react';
import ScheduleService from '@services/ScheduleService';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const appointmentId = params.get('id');

  useEffect(() => {
    const confirmAppointment = async () => {
      if (appointmentId) {
        const res = await ScheduleService.confirm(appointmentId);
        if (res) {
          const clinicUrl: any = {
            '1': 'madrid',
            '4': 'barcelona',
          };

          const BASE_URL = `https://www.holaglow.com/appointment-confirmed/${
            clinicUrl[res.clinicId]
          }`;
          const date = res.startTime.split(' ');
          const url =
            BASE_URL +
            '?date=' +
            date[0] +
            '&startTime=' +
            date[1] +
            '&endTime=' +
            res.endTime;
          window.location.href = url;
        }
      }
    };

    confirmAppointment();
  }, []);

  return (
    <>
      <Flex className="justify-center h-screen">
        <SvgSpinner fill={HOLAGLOW_COLORS['purple']} height={50} width={50} />
      </Flex>
    </>
  );
}
