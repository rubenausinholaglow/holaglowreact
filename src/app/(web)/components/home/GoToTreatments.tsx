import ROUTES from '@utils/routes';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function GoToTreatments() {
  return (
    <div className="bg-hg-secondary relative">
      <Container className="pt-12 pb-8 md:py-16 flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:pl-12 ml-auto">
          <Flex layout="col-left">
            <SvgHolaglowHand
              height={90}
              width={90}
              className="text-hg-secondary500 mb-6"
            />
            <Title
              isAnimated
              size="2xl"
              className="font-bold mb-12 md:mb-6 text-hg-primary"
            >
              ¿Te ayudamos a encontrar tu tratamiento ideal?
            </Title>
            <Text isAnimated size="lg" className="text-white mb-12">
              Te asesoramos gratis con nuestro escáner facial 3D para que puedas
              conocer todos nuestros tratamientos y ver el resultado antes de
              hacértelos
            </Text>
            <Button
              isAnimated
              type="secondary"
              size="xl"
              className="mx-auto md:mx-0"
              href={ROUTES.landings.pv}
              id={'tmevent_multistep_module'}
            >
              Pedir cita gratis
              <SvgArrow className="ml-4" height={24} width={24} />
            </Button>
          </Flex>
        </div>
        <div className="md:absolute top-0 bottom-0 left-0 right-1/2 rounded-br-[100px] overflow-hidden">
          <div className="relative h-full">
            <Image
              src="/images/home/descubre.jpg"
              alt="descubre"
              className="object-cover object-right-bottom"
              fill
            />
          </div>
        </div>
      </Container>
      <Image
        src="/images/home/descubre.jpg"
        alt="descubre"
        height={1552}
        width={1440}
        className="md:hidden w-full rounded-tr-[75px]"
      />
    </div>
  );
}
