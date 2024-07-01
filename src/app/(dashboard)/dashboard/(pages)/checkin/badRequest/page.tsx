'use client';

import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSadIcon } from 'app/icons/IconsDs';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

export default function BadRequestSection() {
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
      <Flex className="flex-col items-center">
        <SvgSadIcon
          width={96}
          height={96}
          className="text-hg-primary bg-hg-secondary rounded-full"
        />
        <Title className="align-center font-bold mt-8" size="xl">
          ¡Ups!
        </Title>
        <Title className="align-center font-bold mb-8">
          No te hemos encontrado
        </Title>
        <RegistrationForm isDashboard={true} redirect={false} isDerma={false} />
        <Button
          type="tertiary"
          isSubmit
          className="ml-auto"
          customStyles="bg-hg-primary mt-8 align-center"
          onClick={() => router.push(routes.dashboard.checkIn.root)}
        >
          Volver
        </Button>
      </Flex>
    </MainLayout>
  );
}
