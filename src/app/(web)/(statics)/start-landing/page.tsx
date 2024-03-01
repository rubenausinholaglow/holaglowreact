import { fetchProduct } from '@utils/fetch';
import MainLayoutSSR from 'app/(ssr)/homeSSR/components/MainLayout';
import { SvgCircle } from 'app/icons/Icons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import GoToCheckout from './GoToCheckout';

export default async function LandingPV() {
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
          className="rounded-t-2xl"
        />
        <Container className="py-4 grow flex flex-col">
          <Flex layout="col-left" className="grow">
            <TitleDerma className="text-hg-secondary mb-2">
              Asesórate gratis con nuestro equipo médico
            </TitleDerma>
            <Text className="mb-4 text-hg-black500">
              Pide tu primera cita médica y te informamos sobre los mejores
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
