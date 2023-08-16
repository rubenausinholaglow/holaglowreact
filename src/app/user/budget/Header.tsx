import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond, SvgHolaglow, SvgMapMarker, SvgPhone } from 'icons/Icons';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { Clinic } from '../types';

export default function Header({ clinicInfo }: { clinicInfo: Clinic }) {
  return (
    <header className='w-full p-8 pb-12 bg-[url("/images/budget/budgetHeaderRedesign.png")] bg-cover bg-no-repeat	bg-right-bottom'>
      <SvgHolaglow
        className="mx-auto"
        width={180}
        height={45}
        fill={HOLAGLOW_COLORS['malva']}
      />

      <Image
        src="/images/budget/myGlowMyRules.svg"
        height="180"
        width="330"
        alt="My glow my rules"
      />
      <ul className="flex flex-col gap-2 mt-4 text-hg-black text-sm">
        <li className="flex flex-row ml-4">
          <SvgMapMarker
            className="mr-2"
            height={15}
            width={15}
            fill={HOLAGLOW_COLORS['black']}
          />
          <Text size="xs">{clinicInfo.address}</Text>
        </li>
        <li className="flex flex-row ml-4">
          <SvgPhone
            className="mr-2"
            height={15}
            width={15}
            fill={HOLAGLOW_COLORS['black']}
          />
          <Text size="xs">{clinicInfo.phone}</Text>
        </li>
        <li className="self-start flex flex-row mt-2 p-2 text-hg-black bg-hg-lightMalva rounded-md ml-2">
          <SvgDiamond
            className="mr-2"
            height={15}
            width={15}
            fill={HOLAGLOW_COLORS['black']}
          />
          <Text size="xs">Presupuesto con validez de 30 días</Text>
        </li>
      </ul>
    </header>
  );
}
