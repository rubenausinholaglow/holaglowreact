import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import { SvgCircle } from 'app/icons/Icons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import GoToCheckout from './GoToCheckout';

export default function LandingPV() {
  return (
    <MainLayoutSSR hideFooter hideAppointmentButton>
      <Flex
        layout="col-left"
        className="bg-hg-cream500 rounded-t-2xl min-h-[calc(100vh-56px)]"
      >
        <Image
          src="/images/statics/landings/PV/PV.jpg"
          height={100}
          width={500}
          priority
          alt="Descubre nuestro probador virtual"
          className="rounded-t-2xl md:hidden w-full"
        />
        <Container className="py-4 grow flex flex-col md:flex-row gap-12 md:grow-0 md:pt-12">
          <Image
            src="/images/statics/landings/PV/PV.jpg"
            height={500}
            width={500}
            priority
            alt="Descubre nuestro probador virtual"
            className="rounded-t-2xl hidden md:block md:self-start md:rounded-2xl md:w-1/2"
          />
          <Flex layout="col-left" className="grow md:w-1/2">
            <Title className="text-hg-secondary mb-2 tracking-tight">
              Te asesoramos gratis por videollamada
            </Title>
            <Text className="mb-4 text-hg-black500">
              Pide tu primera cita online y te informamos sobre los mejores
              tratamientos para ti
            </Text>
            <GoToCheckout />

            <ul className="text-hg-black500 mt-auto p-4 bg-white/60 rounded-xl flex flex-col gap-2">
              <li className="flex gap-2 items-start">
                <SvgCircle className="bg-hg-secondary text-hg-secondary h-1.5 w-1.5 rounded-full mt-2" />
                Reserva tu cita gratis con nuestro equipo
              </li>
              <li className="flex gap-2 items-start">
                <SvgCircle className="bg-hg-secondary text-hg-secondary h-1.5 w-1.5 rounded-full mt-2" />
                Te asesoramos con nuestro escáner facial 3D
              </li>
              <li className="flex gap-2 items-start">
                <SvgCircle className="bg-hg-secondary text-hg-secondary h-1.5 w-1.5 rounded-full mt-2" />
                Diseñamos el tratamiento ideal para ti
              </li>
            </ul>
          </Flex>
        </Container>
      </Flex>
    </MainLayoutSSR>
  );
}
