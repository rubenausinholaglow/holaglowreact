import Image from 'next/image';
import { SvgMedicine, SvgReceipt, SvgCalendar, SvgMapMarker } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Issues() {
  return (
    <section className='p-16 bg-hg-100'>
      <h3 className='text-md font-semibold text-hg-500 w-1/2'>
        Posibles complicaciones tras un tratamiento de proyección de pómulos
      </h3>
    </section>
  );
}
