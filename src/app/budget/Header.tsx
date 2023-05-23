import Image from 'next/image';

import { Clinic } from 'types/clinic';
import { SvgPhone, SvgMapMarker, SvgDiamond } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Header({ clinicInfo }: { clinicInfo: Clinic }) {
  console.log(clinicInfo);

  return (
    <header className='w-full p-8 pb-12 bg-[url("/images/budget/budgetHeader.jpg")] bg-cover bg-right-bottom'>
      <Image className='mx-auto' src='/images/holaglow.svg' height='40' width='188' alt='Holaglow' />

      <Image src='/images/budget/myGlowMyRules.svg' height='180' width='330' alt='My glow my rules' />
      <ul className='flex flex-col gap-2 mt-4 text-hg-300 text-sm'>
        <li className='flex flex-row ml-4'>
          <SvgMapMarker className='mr-2' height={15} width={15} fill={HOLAGLOW_COLORS['hg-300']} />
          <p>{clinicInfo.address}</p>
        </li>
        <li className='flex flex-row ml-4'>
          <SvgPhone className='mr-2' height={15} width={15} fill={HOLAGLOW_COLORS['hg-300']} />
          <p>{clinicInfo.phone}</p>
        </li>
        <li className='self-start flex flex-row mt-2 p-2 bg-white/50 rounded-md ml-2'>
          <SvgDiamond className='mr-2' height={15} width={15} fill={HOLAGLOW_COLORS['hg-300']} />
          <p>Presupuesto con validez de 30 días</p>
        </li>
      </ul>
    </header>
  );
}
