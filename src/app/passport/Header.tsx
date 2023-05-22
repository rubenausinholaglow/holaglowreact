import Image from 'next/image';

import { Clinic } from 'types/clinic';
import { SvgPhone, SvgMapMarker, SvgDiamond } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Header({ clinicInfo }: { clinicInfo: Clinic }) {
  return (
    <header className='p-4 bg-hg-100'>
      <div className='w-full bg-gradient-to-r from-hg-500 to-hg-300 to-70% p-[1px]'>
        <div className='flex flex-col justify-center items-center bg-hg-100 w-full p-2'>
          <p className='tracking-[8px] text-hg-400 mt-32 mb-4'>BEAUTY</p>
          <Image
            className='self-center mb-32'
            src='/images/passport/passport.svg'
            height='32'
            width='240'
            alt='Passport'
          />
          <Image className='mx-auto' src='/images/holaglow.svg' height='24' width='115' alt='Holaglow' />
        </div>
      </div>
    </header>
  );
}
