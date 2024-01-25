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
    getAppointment(searchParams.id as string);
  }, []);
  if (!appointment) return <></>;
  return (
    <MainLayout>
      <Confirmation appointment={appointment} />
    </MainLayout>
  );
}
