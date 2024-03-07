'use client';

import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useSearchParams } from 'next/navigation';

export default function CanceledAppointment() {
  const searchParams = useSearchParams();

  const day = searchParams.get('day');
  const hour = searchParams.get('hour');
  const month = searchParams.get('month');

  const ROUTE = useRoutes();

  return (
    <App>
      <MainLayout>
        <Container className="py-16 md:py-32">
          <Title className="mb-8">¡Ops! Tu cita ha sido cancelada</Title>
          <Text className="text-lg mb-12">
            Hemos cancelado tu cita para el día {day} de {month} a las {hour}.
            Puedes reservar una nueva cita{' '}
            <a href={ROUTE.checkout.clinics}>aquí.</a>
          </Text>

          <Button size="lg" type="primary" href={ROUTE.treatments}>
            Ver tratamientos
            <SvgArrow className="ml-2 h-5 w-5" />
          </Button>
        </Container>
      </MainLayout>
    </App>
  );
}
