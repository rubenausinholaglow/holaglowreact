'use client';

import { useEffect } from 'react';
import { clearLocalStorage } from '@utils/utils';
import { useRouter } from 'next/navigation';
import ScheduleService from '@services/ScheduleService';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const appointmentId = params.get('id');

  useEffect(() => {
    const confirmAppointment = async () => {
      var res = await ScheduleService.confirm(appointmentId!);
      if (res) {
        window.location.href = 'https://holaglow.com/appointment-confirmed';
      }
    };

    confirmAppointment();
  }, []);

  return <></>;
}
