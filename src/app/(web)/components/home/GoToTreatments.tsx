'use client';

import ROUTES from '@utils/routes';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function GoToTreatments() {
  return (
    <div className="bg-gradient-15deg from-hg-pink to-hg-secondary700">
      <Container className="py-12">
        <Flex layout="col-left" className="gap-4 items-center md:flex-row">
          <Flex layout="col-left" className="md:w-1/2">
            <SvgHolaglowHand
              height={90}
              width={90}
              className="text-hg-secondary mb-6"
            />
            <Title
              isAnimated
              size="2xl"
              className="font-bold mb-12 md:mb-6 text-white"
            >
              ¿Te ayudamos a encontrar tu{' '}
              <Underlined color={HOLAGLOW_COLORS['tertiary']}>
                tratamiento
              </Underlined>{' '}
              ideal?
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
              className="mx-auto md:mx-0 mb-10"
              href={ROUTES.landings.pv}
              id={'tmevent_multistep_module'}
            >
              Pedir cita gratis
              <SvgArrow className="ml-4" height={24} width={24} />
            </Button>
          </Flex>
          <div className="w-full md:w-1/2 relative aspect-square">
            <Image
              src="/images/home/treatments2.png"
              alt="descubre los tratamientos"
              fill
              className="object-fit"
            />
          </div>
        </Flex>
      </Container>
    </div>
  );
}
