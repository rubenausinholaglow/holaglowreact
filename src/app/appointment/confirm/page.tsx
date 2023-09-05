'use client';

import { useEffect } from 'react';
import ScheduleService from '@services/ScheduleService';
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
      <SvgSpinner height={24} width={24} />
    </>
  );
}
