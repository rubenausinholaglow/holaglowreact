import ClinicsCheckout from 'app/(web)/checkout/treatments/page';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSadIcon } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function treatmentsSection() {
  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Flex layout="col-center" className="w-full">
        <SvgSadIcon
          width={96}
          height={96}
          className="text-hg-primary bg-hg-secondary rounded-full"
        />
        <Title className="align-center font-bold mt-8" size="xl">
          ¡Ups!
        </Title>
        <Title className="align-center font-bold">
          No tienes ninguna cita prevista
        </Title>
        <ClinicsCheckout isDashboard={true} />
      </Flex>
    </MainLayout>
  );
}
