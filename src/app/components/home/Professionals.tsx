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
          className="relative mb-12"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
        >
          <Flex layout="row-center" className="gap-16 w-full items-stretch">
            <div className="relative overflow-hidden w-1/2">
              <Image
                src="/images/home/profesionales.png"
                alt="profesionales"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <Flex layout="col-left" className="w-1/2">
              <Flex layout="row-center" className="w-full gap-16 mb-16">
                <Image
                  src="/images/home/profesionales2.png"
                  alt="profesionales2"
                  width={200}
                  height={200}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                  className="rounded-xl"
                />
                <Image
                  src="/images/home/profesionales1.png"
                  alt="profesionales1"
                  width={200}
                  height={200}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                  className="rounded-xl"
                />
              </Flex>
              <Title size="2xl" className="font-bold mb-6">
                Equipo médico con los mejores{' '}
                <Underlined color={HOLAGLOW_COLORS['malva']}>
                  profesionales
                </Underlined>
              </Title>
              <Text size="lg" className="text-hg-gray-200 mb-8">
                Sed necessitatibus saepe qui tenetur delectus 33 officiis
                inventore et rerum unde cum officiis repellendus
              </Text>
              <Button type="secondary" size="xl">
                Conoce al equipo médico
              </Button>
            </Flex>
          </Flex>
          <Flex layout="row-center" className="gap-16 w-full items-stretch">
            <div className="relative overflow-hidden w-1/2">
              <Image
                src="/images/home/profesionales.png"
                alt="profesionales"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <Flex layout="col-left" className="w-1/2">
              <Flex layout="row-center" className="w-full gap-16 mb-16">
                <Image
                  src="/images/home/profesionales2.png"
                  alt="profesionales2"
                  width={200}
                  height={200}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                  className="rounded-xl"
                />
                <Image
                  src="/images/home/profesionales1.png"
                  alt="profesionales1"
                  width={200}
                  height={200}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                  className="rounded-xl"
                />
              </Flex>
              <Title size="2xl" className="font-bold mb-6">
                Equipo médico con los mejores{' '}
                <Underlined color={HOLAGLOW_COLORS['malva']}>
                  profesionales
                </Underlined>
              </Title>
              <Text size="lg" className="text-hg-gray-200 mb-8">
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
