'use client';

import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgHolaglow } from 'icons/IconsDs';

export default function DashboardHeader({
  hideBackButton = false,
  hideProfessionalSelector = false,
}: {
  hideBackButton: boolean;
  hideProfessionalSelector: boolean;
}) {
  return (
    <header>
      <Flex className="p-4 gap-4 justify-center relative">
        {!hideBackButton && (
          <div className="absolute left-0 top-0 bottom-0 p-4">
            <ButtonMessage />
          </div>
        )}
        <SvgHolaglow
          className="text-hg-secondary mt-2"
          width={100}
          height={25}
        />
        {!hideProfessionalSelector && (
          <div className="absolute right-0 top-0 bottom-0 p-4">
            <ClinicProfessional />
          </div>
        )}
      </Flex>
    </header>
  );
}
