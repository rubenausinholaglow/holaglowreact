'use client';
import Agenda from 'app/(web)/checkout/agenda/Agenda';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function AgendaCheckIn() {
  const router = useRouter();
  const routes = useRoutes();

  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Container>
        <Agenda isDashboard />
        <Button
          type="tertiary"
          isSubmit
          className="ml-auto"
          customStyles="bg-hg-primary mt-8 align-center"
          onClick={() => router.push(routes.dashboard.checkIn.root)}
        >
          Volver
        </Button>
      </Container>
    </MainLayout>
  );
}
