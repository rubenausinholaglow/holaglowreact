import {
  SvgDiamond,
  SvgHolaglow,
  SvgMapMarker,
  SvgPhone,
} from 'app/icons/Icons';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { Clinic } from '../types';

export default function Header({
  clinicInfo,
  maxDiscountDate,
}: {
  clinicInfo: Clinic;
  maxDiscountDate: Date;
}) {
  const now = new Date();
  const date = new Date(maxDiscountDate).getDate().toString().padStart(2, '0');
  const month = (new Date(maxDiscountDate).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const year = new Date(maxDiscountDate).getFullYear();

  const parsedDate = `${date}/${month}/${year}`;
  return (
    <header className='w-full p-8 pb-12 bg-[url("/images/budget/budgetHeaderRedesign.png")] bg-cover bg-no-repeat	bg-right-bottom'>
      <SvgHolaglow
        className="mx-auto"
        width={180}
        height={45}
        fill={HOLAGLOW_COLORS['tertiary']}
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
        <li className="self-start flex flex-row mt-2 p-2 text-hg-black bg-hg-tertiary500 rounded-md ml-2">
          <SvgDiamond
            className="mr-2"
            height={15}
            width={15}
            fill={HOLAGLOW_COLORS['black']}
          />
          {maxDiscountDate > now && (
            <Text size="xs">Presupuesto con validez hasta {parsedDate}</Text>
          )}
          {maxDiscountDate <= now && (
            <Text size="xs">Presupuesto con validez de 30 días</Text>
          )}
        </li>
      </ul>
    </header>
  );
}
