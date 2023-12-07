'use client';

import MainLayout from 'app/components/layout/MainLayout';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useSearchParams } from 'next/navigation';

export default function CanceledAppointment() {
  const searchParams = useSearchParams();

  const day = searchParams.get('day');
  const hour = searchParams.get('hour');
  const month = searchParams.get('month');

  return (
    <MainLayout>
      <Container className="py-16 md:py-32">
        <Title className="mb-8">¡Ops! Tu cita ha sido cancelada</Title>
        <Text className="text-lg mb-12">
          Hemos cancelado tu cita para el día {day} de {month} a las {hour}. Te
          hemos enviado un email de cancelación. Si lo prefieres, puedes volver
          a visitar nuestra web y reservar en otra fecha disponible.
        </Text>

        <Button
          size="lg"
          type="tertiary"
          customStyles="border-hg-black bg-hg-primary"
          href={ROUTES.treatments}
        >
          Ver tratamientos
        </Button>
      </Container>
    </MainLayout>
  );
}
