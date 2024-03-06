import ROUTES from '@utils/routes';
import { useDeviceSizeSSR } from 'app/(web)/components/layout/Breakpoint';
import { SvgUserScan } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function PVBanner({
  className = '',
  isFloating = false,
}: {
  className?: string;
  isFloating?: boolean;
}) {
  const deviceSize = useDeviceSizeSSR();

  return (
    <Flex
      layout="row-left"
      className={`w-full ${
        isFloating
          ? 'bg-white'
          : 'bg-derma-secondary500 rounded-2xl overflow-hidden'
      } md:h-full md:flex-col ${className} ${
        isFloating ? 'shadow-centered-black' : ''
      }`}
    >
      <Image
        src={`/images/products/${
          deviceSize.isMobile ? 'PVMobile.png' : 'PVDesktop.png'
        }`}
        alt="Descubre tu tratamiento ideal con nuestro probador virtual gratis"
        height={200}
        width={200}
        className={`${isFloating ? 'w-[115px]' : 'w-2/5'} md:h-auto md:w-full`}
      />
      <Flex layout="col-left" className="p-2 md:p-4 pl-4 md:items-center">
        <Text
          className={`font-semibold mb-1 md:text-center ${
            isFloating ? 'text-sm' : 'md:text-lg'
          }`}
        >
          No se qué tratamiento quiero
        </Text>
        <Text size="xs" className="text-hg-black500 mb-3 md:text-center">
          Te asesoramos gratis con nuestro escáner facial 3D
        </Text>

        <Button
          id={
            isFloating ? 'tmevent_floating_minicard_pv' : 'tmevent_minicard_pv'
          }
          type="secondary"
          size={deviceSize.isMobile ? 'sm' : 'md'}
          href={ROUTES.landings.pv}
        >
          <SvgUserScan className="h-4 w-4 mr-2" />
          Pide cita gratis
        </Button>
      </Flex>
    </Flex>
  );
}
