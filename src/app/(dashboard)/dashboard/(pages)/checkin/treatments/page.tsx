'use client';

import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSadIcon } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function treatmentsSection() {
  return (
    <App>
      <MainLayout
        isDashboard
        hideBackButton
        hideContactButtons
        hideProfessionalSelector
        hideBottomBar
      >
        <Container>
          <Flex layout="col-center" className="w-full">
            <SvgSadIcon
              width={96}
              height={96}
              className="text-hg-primary bg-hg-secondary rounded-full"
            />
            <Title className="align-center font-bold mt-8" size="xl">
              ¡Ups!
            </Title>
            <Title className="align-center font-bold mb-8">
              No tienes ninguna cita prevista
            </Title>
            <TreatmentAccordionSelector isDashboard />
          </Flex>
        </Container>
      </MainLayout>
    </App>
  );
}
