import { AnimateOnViewport } from 'app/(web)/components/common/AnimateOnViewport';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HomeProfessionals() {
  return (
    <div className="bg-hg-skyblue/20 overflow-hidden">
      <Container className="py-12">
        <Flex
          layout="col-left"
          className="gap-8 lg:gap-16 w-full items-stretch lg:flex-row"
        >
          <AnimateOnViewport className="relative overflow-hidden aspect-square lg:aspect-auto lg:w-1/2">
            <Image
              src="/images/home/profesionales.jpg"
              alt="profesionales"
              fill
              className="object-cover rounded-xl"
              loading="eager"
            />
          </AnimateOnViewport>

          <Flex layout="col-left" className="lg:w-1/2 pb-1">
            <AnimateOnViewport origin="right">
              <Flex
                layout="row-center"
                className="w-full gap-8 lg:gap-16 mb-12 lg:mb-16"
              >
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales2.jpg"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales1.jpg"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </Flex>
              <Title size="2xl" className="font-bold mb-6">
                El mejor equipo para ponerse en tu{' '}
                <Underlined color={HOLAGLOW_COLORS['secondary500']}>
                  piel
                </Underlined>
              </Title>
              <Text className="text-hg-black500 mb-8 lg:text-lg">
                Estarás en manos de profesionales con experiencia contrastada
                para asesorarte y aplicar nuestros tratamientos con la mayor
                seguridad, eficacia y confianza
              </Text>
              <a href="/quienes-somos">
                <Button
                  type="secondary"
                  size="xl"
                  className="mx-auto lg:mx-0"
                  id={'tmevent_about_us_module'}
                >
                  Conoce al equipo
                </Button>
              </a>
            </AnimateOnViewport>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
