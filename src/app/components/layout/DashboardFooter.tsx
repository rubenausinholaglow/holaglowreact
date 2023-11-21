'use client';

import ButtonMessage from '@components/ui/ButtonMessage';
import { Cart } from 'app/dashboard/(pages)/budgets/minicart/Cart';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function DashboardFooter({
  showCart = false,
}: {
  showCart?: boolean;
}) {
  const router = useRouter();
  const { remoteControl, storedBoxId, storedClinicId } =
    useGlobalPersistedStore(state => state);

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
    <Flex className="gap-4 justify-start">
      <Flex className="mr-auto gap-2">
        <Button
          type="tertiary"
          onClick={() => handleBackButton()}
          customStyles="bg-hg-black text-hg-primary"
          size="sm"
          className="py-4 pl-4"
        >
          <SvgArrow height={16} width={16} className="rotate-180" />
        </Button>
        {remoteControl && <ButtonMessage />}
      </Flex>

      {showCart && !remoteControl && <Cart />}
    </Flex>
  );
}
