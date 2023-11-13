'use client';

import ButtonMessage from '@components/ui/ButtonMessage';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgHolaglow } from 'icons/IconsDs';

export default function DashboardHeader() {
  return (
    <header>
      <Flex className="p-4 gap-4 justify-center relative">
        <div className="absolute left-0 top-0 bottom-0 p-4">
          <ButtonMessage />
        </div>
        <SvgHolaglow className="text-hg-secondary" width={130} height={32} />
      </Flex>
    </header>
  );
}
