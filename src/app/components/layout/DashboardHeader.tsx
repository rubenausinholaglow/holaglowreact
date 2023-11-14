'use client';

import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrow, SvgHolaglow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function DashboardHeader({
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
    <header>
      <Flex className="gap-4 justify-center relative mb-6">
        <Flex className="absolute left-0 top-0 gap-2">
          {!hideBackButton && (
            <Button
              type="tertiary"
              onClick={() => handleBackButton()}
              customStyles="bg-hg-black text-hg-primary px-2 py-4"
              size="sm"
              className="pl-4"
            >
              <SvgArrow height={16} width={16} className="rotate-180" />
            </Button>
          )}
          {!hideContactButtons && <ButtonMessage />}
        </Flex>
        <SvgHolaglow
          className="text-hg-secondary mt-5"
          width={100}
          height={25}
        />
        {!hideProfessionalSelector && (
          <div className="absolute right-0 top-0">
            <ClinicProfessional />
          </div>
        )}
      </Flex>
    </header>
  );
}
