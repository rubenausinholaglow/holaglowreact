'use client';
import { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import Confirmation from 'app/(web)/checkout/confirmation/components/Confirmation';
import MainLayout from 'app/(web)/components/layout/MainLayout';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [appointment, setAppointment] = useState(undefined);
  useEffect(() => {
    async function getAppointment(id: string) {
      const res = await ScheduleService.confirm(id);

      setAppointment(res);
    }
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    if (id) getAppointment(id);
  }, []);
  if (!appointment) return <></>;
  return (
    <MainLayout>
      <Confirmation appointment={appointment} />
    </MainLayout>
  );
}
