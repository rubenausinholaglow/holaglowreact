import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { SvgHolaglow } from 'icons/Icons';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-hg-purple">
      <div className="m-4 bg-hg-purple300 p-[1px]">
        <div className="bg-hg-purple p-4 flex flex-col items-center">
          <p className="tracking-[10px] mt-32 mb-2 text-hg-lime">BEAUTY</p>
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
            fill={HOLAGLOW_COLORS['lime']}
          />
        </div>
      </div>
    </header>
  );
}
