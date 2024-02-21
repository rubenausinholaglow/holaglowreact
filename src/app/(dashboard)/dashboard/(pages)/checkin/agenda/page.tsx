'use client';
import Agenda from 'app/(web)/checkout/agenda/Agenda';
import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AgendaCheckIn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routes = useRoutes();

  const isCheckin = searchParams.get('isCheckin') === 'true';

  return (
    <AppWrapper>
      <MainLayout
        isDashboard
        hideBackButton
        hideContactButtons
        hideProfessionalSelector
        hideBottomBar
      >
        <Container>
          <Agenda isDashboard isCheckin={isCheckin} />
          <Button
            type="tertiary"
            isSubmit
            className="ml-auto"
            customStyles="bg-hg-primary mt-8 align-center"
            onClick={() => {
              if (isCheckin) {
                router.push(routes.dashboard.checkIn.root);
              } else router.back();
            }}
          >
            Volver
          </Button>
        </Container>
      </MainLayout>
    </AppWrapper>
  );
}
