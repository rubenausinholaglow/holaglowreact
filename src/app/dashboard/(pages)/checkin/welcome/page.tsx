'use client';
import { useEffect } from 'react';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCheck } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function WelcomeSection() {
  const { userCheckin } = useGlobalPersistedStore(state => state);

  const router = useRouter();
  const routes = useRoutes();

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.push(routes.dashboard.checkIn.root);
    }, 10000);

    return () => clearTimeout(timerId);
  }, [router, routes.dashboard.checkIn.root]);

  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Flex className="flex-col">
        <SvgCheck
          width={96}
          height={96}
          className="text-hg-primary bg-hg-secondary rounded-full"
        />
        <Title className="align-center font-bold" size="xl">
          Hola {userCheckin?.name}
        </Title>
        <Title className="align-center font-bold">Cita confirmada</Title>
        <Text size="lg" className="align-center mt-8">
          Tu cita para el Probador Virtual es a las {userCheckin?.hour}.
        </Text>
        <Text size="lg" className="align-center justify-center">
          Por favor, toma asiento y en breves te atenderá{' '}
          {userCheckin?.professional}.
        </Text>
      </Flex>
    </MainLayout>
  );
}
