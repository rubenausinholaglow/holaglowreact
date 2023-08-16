import { HOLAGLOW_COLORS } from 'app/web/utils/colors';
import {
  SvgHolaglow,
  SvgInstagram,
  SvgMapMarker,
  SvgPhone,
  SvgWorldWideWeb,
} from 'icons/Icons';

import { Clinic } from './types';

export default function Footer({ clinicInfo }: { clinicInfo: Clinic }) {
  return (
    <section className="bg-white p-8 text-hg-darkMalva mb-8">
      <SvgHolaglow
        className="mb-8"
        width={150}
        height={35}
        fill={HOLAGLOW_COLORS['malva']}
      />

      <ul className="grid grid-cols-3 gap-8 text-xs">
        <li>
          <p className="mb-4">My glow, my rules.</p>
          <p>La nueva cara de la medicina estética, sin cirugía</p>
        </li>
        <li>
          <p className="flex flex-row mb-4">
            <SvgMapMarker
              height={20}
              width={20}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <span className="ml-2">{clinicInfo.address}</span>
          </p>
          <p className="flex flex-row items-center">
            <SvgPhone
              height={15}
              width={15}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <span className="ml-2">{clinicInfo.phone}</span>
          </p>
        </li>
        <li>
          <p className="flex flex-row items-center mb-4">
            <SvgWorldWideWeb
              height={18}
              width={22}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <span className="ml-2">holaglow.com</span>
          </p>
          <p className="flex flex-row items-center ml-1">
            <SvgInstagram
              height={18}
              width={18}
              fill={HOLAGLOW_COLORS['darkMalva']}
            />
            <span className="ml-2">holaglow.clinics</span>
          </p>
        </li>
      </ul>
    </section>
  );
}
