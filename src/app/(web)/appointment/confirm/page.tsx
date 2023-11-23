import ScheduleService from '@services/ScheduleService';
import Confirmation from 'app/checkout/confirmation/components/Confirmation';
import MainLayout from 'app/components/layout/MainLayout';

async function getAppointment(id: string) {
  const res = await ScheduleService.confirm(id);

  return res;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const appointment = await getAppointment(searchParams.id as string);

  return (
    <MainLayout>
      <Confirmation appointment={appointment} />
    </MainLayout>
  );
}
