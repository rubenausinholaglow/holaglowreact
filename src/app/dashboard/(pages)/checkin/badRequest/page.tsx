'use client';

import RegistrationForm from 'app/components/common/RegistrationForm';
import MainLayout from 'app/components/layout/MainLayout';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { SvgSadIcon } from 'icons/IconsDs';

export default function BadRequestSection() {
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
        <RegistrationForm isDashboard={true} redirect={false} />
      </Flex>
    </MainLayout>
  );
}
