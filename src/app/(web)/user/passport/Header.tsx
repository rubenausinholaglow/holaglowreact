import { SvgHolaglow } from 'app/icons/Icons';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-hg-tertiary">
      <div className="m-4 bg-hg-tertiary500 p-[1px]">
        <div className="bg-hg-tertiary p-4 flex flex-col items-center">
          <p className="tracking-[10px] mt-32 mb-2 text-hg-primary">BEAUTY</p>
          <Image
            className="mb-28"
            src="/images/passport/passport.svg"
            height="32"
            width="240"
            alt="Passport"
          />
          <SvgHolaglow
            className="mx-auto"
            width={150}
            height={40}
            fill={HOLAGLOW_COLORS['primary']}
          />
        </div>
      </div>
    </header>
  );
}
