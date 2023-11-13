'use client';

import { useSessionStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

interface SliderItem {
  title: string;
  text: string;
  imgUrl: string;
}

const SLIDES: SliderItem[] = [
  {
    title: 'Soluciones personalizadas',
    text: 'Nuestro equipo médico te ayudará a encontrar las soluciones para cubrir las necesidades de tu piel y conseguir los objetivos que desees.',
    imgUrl: '/images/statics/landings/captacion/slide1.svg',
  },
  {
    title: 'Escáner facial en 3D',
    text: 'Generaremos tu imagen en tres dimensiones mediante fotografías reales, gracias a la tecnología más innovadora.',
    imgUrl: '/images/statics/landings/captacion/slide2.svg',
  },
  {
    title: 'Resultados antes y después',
    text: 'Si sientes curiosidad por algún tratamiento de medicina estética, podrás descubrir cómo sería el resultado mediante la simulación sobre tu propia imagen 3D.',
    imgUrl: '/images/statics/landings/captacion/slide3.svg',
  },
  {
    title: 'Asesoramiento gratis',
    text: 'El médico te asesorará, te explicará detalladamente en qué consisten los tratamientos y responderá todas tus dudas.',
    imgUrl: '/images/statics/landings/captacion/slide4.svg',
  },
];

export default function ConsistOf() {
  const { deviceSize } = useSessionStore(state => state);

  return (
    <Container className="py-8 md:mb-12">
      <Title animated size="2xl" className="font-bold mb-4 text-center">
        ¿En qué{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>consiste</Underlined>?
      </Title>

      {deviceSize.isMobile && (
        <Carousel
          hasControls
          className="relative mt-8"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
        >
          {SLIDES.map((item: SliderItem, index: number) => (
            <Flex key={index} layout="col-center" className="items-stretch">
              <div className="relative">
                <Image
                  src={item.imgUrl}
                  height={140}
                  width={140}
                  alt={item.title}
                  className="mx-auto"
                />
                <span className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] font-bold text-[56px]">
                  {index + 1}
                </span>
              </div>
              <Title disableAnimation className="text-2xl mb-4">
                {item.title}
              </Title>
              <Text disableAnimation className="text-center">
                {item.text}
              </Text>
            </Flex>
          ))}
        </Carousel>
      )}

      {!deviceSize.isMobile && (
        <div className="grid grid-cols-2 gap-16 my-12">
          {SLIDES.map((item: SliderItem, index: number) => (
            <Flex key={index} layout="col-center" className="items-stretch">
              <div className="relative">
                <Image
                  src={item.imgUrl}
                  height={140}
                  width={140}
                  alt={item.title}
                  className="mx-auto"
                />
                <span className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] font-bold text-[56px]">
                  {index + 1}
                </span>
              </div>
              <Title disableAnimation className="text-2xl mb-4">
                {item.title}
              </Title>
              <Text disableAnimation className="text-center">
                {item.text}
              </Text>
            </Flex>
          ))}
        </div>
      )}

      <Flex className="justify-center">
        <Button
          isAnimated
          size="xl"
          type="tertiary"
          customStyles="bg-hg-primary hover:bg-hg-secondary100"
          href="#leadForm"
        >
          ¡Yo quiero!
        </Button>
      </Flex>
    </Container>
  );
}
