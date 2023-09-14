import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Profesionals() {
  return (
    <div className="bg-hg-skyblue/20 overflow-hidden">
      <Container className="py-12">
        <Carousel
          hasControls
          hasDots
          className="relative mb-12"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
        >
          <Flex
            layout="col-left"
            className="gap-8 lg:gap-16 w-full items-stretch lg:flex-row"
          >
            <div className="relative overflow-hidden aspect-square lg:aspect-auto lg:w-1/2">
              <Image
                src="/images/home/profesionales.png"
                alt="profesionales"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <Flex layout="col-left" className="lg:w-1/2">
              <Flex
                layout="row-center"
                className="w-full gap-8 lg:gap-16 mb-12 lg:mb-16"
              >
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales2.png"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales1.png"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </Flex>
              <Title size="2xl" className="font-bold mb-6">
                Equipo médico con los mejores{' '}
                <Underlined color={HOLAGLOW_COLORS['tertiary']}>
                  profesionales
                </Underlined>
              </Title>
              <Text size="lg" className="text-hg-black-500 mb-8">
                Sed necessitatibus saepe qui tenetur delectus 33 officiis
                inventore et rerum unde cum officiis repellendus
              </Text>
              <Button type="secondary" size="xl">
                Conoce al equipo médico
              </Button>
            </Flex>
          </Flex>
          <Flex
            layout="col-left"
            className="gap-8 lg:gap-16 w-full items-stretch lg:flex-row"
          >
            <div className="relative overflow-hidden aspect-square lg:aspect-auto lg:w-1/2">
              <Image
                src="/images/home/profesionales.png"
                alt="profesionales"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <Flex layout="col-left" className="lg:w-1/2">
              <Flex
                layout="row-center"
                className="w-full gap-8 lg:gap-16 mb-12 lg:mb-16"
              >
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales2.png"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="relative w-1/2 aspect-square">
                  <Image
                    src="/images/home/profesionales1.png"
                    alt="profesionales2"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </Flex>
              <Title size="2xl" className="font-bold mb-6">
                Equipo médico con los mejores{' '}
                <Underlined color={HOLAGLOW_COLORS['tertiary']}>
                  profesionales
                </Underlined>
              </Title>
              <Text size="lg" className="text-hg-black-500 mb-8">
                Sed necessitatibus saepe qui tenetur delectus 33 officiis
                inventore et rerum unde cum officiis repellendus
              </Text>
              <Button type="secondary" size="xl">
                Conoce al equipo médico
              </Button>
            </Flex>
          </Flex>
        </Carousel>
      </Container>
    </div>
  );
}
