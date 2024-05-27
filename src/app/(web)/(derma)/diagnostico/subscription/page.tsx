import FinanceService from '@services/FinanceService';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

import SubscriptionCard from './SubscriptionCard';

export default async function Subscription({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const subscriptionData: any = await FinanceService.getSubscription(
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
        <Container className="py-4 md:py-10">
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <Title className="text-derma-primary font-thin mb-4 w-full md:w-1/2">
              Gestiona tu suscripción
            </Title>
            <div className="w-full md:w-1/2">
              <SubscriptionCard
                subscriptionData={subscriptionData}
                pain={searchParams.routine}
              />
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
