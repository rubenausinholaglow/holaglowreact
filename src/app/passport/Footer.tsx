import Image from 'next/image';

import { Clinic } from 'types/clinic';
import { SvgPhone, SvgMapMarker, SvgWorldWideWeb, SvgInstagram } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Footer({ clinicInfo }: { clinicInfo: Clinic }) {
  return (
    <section className='bg-white p-8 text-[#717D96]'>
      <Image className='mb-8' src='/images/holaglow.svg' height='25' width='120' alt='holaglow' />

      <ul className='grid grid-cols-3 gap-8'>
        <li>
          <p className='mb-4'>My glow, my rules.</p>
          <p>La nueva cara de la medicina estética, sin cirugía</p>
        </li>
        <li>
          <p className='flex flex-row mb-4'>
            <SvgMapMarker height={20} width={20} fill='#717D96' />
            <span className='ml-2'>{clinicInfo.address}</span>
          </p>
          <p className='flex flex-row items-center'>
            <SvgPhone height={15} width={15} fill='#717D96' />
            <span className='ml-2'>{clinicInfo.phone}</span>
          </p>
        </li>
        <li>
          <p className='flex flex-row items-center mb-4'>
            <SvgWorldWideWeb height={18} width={22} fill='#717D96' />
            <span className='ml-2'>holaglow.com</span>
          </p>
          <p className='flex flex-row items-center ml-1'>
            <SvgInstagram height={18} width={18} fill='#717D96' />
            <span className='ml-2'>holaglow.clinics</span>
          </p>
        </li>
      </ul>
    </section>
  );
}
