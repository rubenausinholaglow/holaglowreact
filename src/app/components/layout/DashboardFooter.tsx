'use client';

import ButtonMessage from '@components/ui/ButtonMessage';
import { Cart } from 'app/dashboard/(pages)/budgets/minicart/Cart';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow, SvgCart } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function DashboardFooter({
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
}: {
  hideBackButton?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
}) {
  const router = useRouter();
  const { remoteControl, storedBoxId, storedClinicId } =
    useGlobalPersistedStore(state => state);

  const { totalItems, totalPrice } = useCartStore(state => state);

  function handleBackButton() {
    if (window.location.pathname == '/dashboard/menu/') {
      if (remoteControl) {
        router.push(
          `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=true`
        );
      } else
        router.push(
          `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`
        );
    } else router.back();
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-hg-secondary/40 backdrop-blur-sm">
      <Flex className="gap-4 justify-start">
        <div className="mr-auto  p-4">
          {!hideBackButton && (
            <Button
              type="tertiary"
              onClick={() => handleBackButton()}
              customStyles="bg-hg-black text-hg-primary"
              size="sm"
            >
              <SvgArrow height={16} width={16} className="rotate-180" />
            </Button>
          )}
          {!hideContactButtons && <ButtonMessage />}
        </div>

        <Cart />

        {/* <Flex className="w-1/2 justify-end items-center gap-2">
          <Text className="text-xl font-semibold">{totalPrice} €</Text>(
          {totalItems} ud.)



          {(hasProductsDiscount || hasCartDiscount) && (
          <Text size="xl" className="text-hg-black font-semibold mr-2">
            {hasCartDiscount ? (
              <>{cartTotalWithDiscount.toFixed(2)}€</>
            ) : (
              <>{Number(productsPriceTotalWithDiscounts).toFixed(2)}€</>
            )}
          </Text>
        )}
        <Text
          className={
            hasProductsDiscount || hasCartDiscount
              ? 'text-red-600 text-lg line-through opacity-50 font-semibold'
              : 'text-hg-black text-xl font-semibold'
          }
        >
          {productsPriceTotal.toFixed(2)}€
        </Text>

          <SvgCart
            height={32}
            width={32}
            className="p-2 bg-white text-hg-black rounded-full"
          />
        </Flex> */}
      </Flex>
    </footer>
  );
}
