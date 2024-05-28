import FinanceService from '@services/FinanceService';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

import SubscriptionCard from './SubscriptionCard';

async function getSubscriptionData(userId: string) {
  const data = await FinanceService.getSubscription(userId);

  return data;
}

export default async function Subscription({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const subscriptionData = await getSubscriptionData(
    searchParams.userId as string
  );

  if (!subscriptionData) {
    return <></>;
  }

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <Container className="py-4 md:py-10 relative">
          <Button
            type="whiteDerma"
            size="sm"
            className="absolute right-4 -top-14 z-50"
            customStyles="bg-transparent"
            href={`${ROUTES.derma.diagnostico.home}?phone=${
              (subscriptionData as any).user.phone
            }`}
          >
            <SvgArrow className="mr-4 rotate-180 h-4 w-4" />
            Atrás
          </Button>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <Title className="text-derma-primary font-thin mb-4 w-full md:w-1/2">
              Gestiona tu suscripción
            </Title>
            <div className="w-full md:w-1/2 relative">
              <SubscriptionCard
                subscriptionData={subscriptionData}
                pain={Number(searchParams.routine)}
              />
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
