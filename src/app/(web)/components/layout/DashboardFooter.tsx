'use client';

import useRoutes from '@utils/useRoutes';
import { Cart } from 'app/(dashboard)/dashboard/(pages)/budgets/minicart/Cart';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import ButtonMessage from 'app/(dashboard)/dashboard/components/ui/ButtonMessage';
import { SvgArrow } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function DashboardFooter({
  showCart = false,
}: {
  showCart?: boolean;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();
  const { remoteControl, storedBoxId, storedClinicId, isCallCenter } =
    useGlobalPersistedStore(state => state);
  const cart = useCartStore(state => state);

  function handleBackButton() {
    if (window.location.pathname == '/dashboard/menu') {
      if (remoteControl) {
        router.push(
          `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=true`
        );
      } else
        router.push(
          isCallCenter
            ? `/dashboard?isCallCenter=true&ignoreMessages=true`
            : `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`
        );
    } else router.back();
  }

  return (
    <Flex className="gap-4 justify-start">
      <Flex className="mr-auto gap-2">
        <Button
          type="white"
          onClick={() => handleBackButton()}
          size="sm"
          className="py-4 pl-4"
        >
          <SvgArrow height={16} width={16} className="rotate-180" />
        </Button>
        {isCallCenter && (
          <>
            <Button
              type="white"
              onClick={e => {
                cart.resetCart();
                router.push(ROUTES.dashboard.schedule);
              }}
              size="sm"
              className="py-4 pl-4"
            >
              Crear cita
            </Button>
            <Button
              type="white"
              href={ROUTES.dashboard.budgets}
              size="sm"
              className="py-4 pl-4"
            >
              Crear presupuesto
            </Button>
          </>
        )}
        {remoteControl && <ButtonMessage />}
      </Flex>

      {showCart && <Cart />}
    </Flex>
  );
}
