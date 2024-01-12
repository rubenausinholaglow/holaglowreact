import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function StoriesDerma() {
  const dermaImages: any[] = [
    {
      id: 1,
      urlBefore: '/images/derma/home/before1.webp',
      urlAfter: '/images/derma/home/after1.webp',
    },
    {
      id: 2,
      urlBefore: '/images/derma/home/before1.webp',
      urlAfter: '/images/derma/home/after1.webp',
    },
    {
      id: 3,
      urlBefore: '/images/derma/home/before1.webp',
      urlAfter: '/images/derma/home/after1.webp',
    },
  ];

  return (
    <Container className="py-12 overflow-hidden">
      <Flex
        layout="col-left"
        className="gap-4 items-center relative md:justify-center md:flex-row"
      >
        <Flex layout="col-left" className="md:w-1/2">
          <Title
            isAnimated
            size="2xl"
            className="font-gtUltraBold text-derma-primary font-bold mb-4"
          >
            Historias de Derma
          </Title>
          <Text
            isAnimated
            className="text-hg-black500 mb-8 md:w-full md:text-lg"
          >
            Conectamos a personas con médicos experimentados para un
            descubrimiento personalizado de productos y tratamientos para el
            acné hasta el envejecimiento.
          </Text>
        </Flex>
        <Flex layout="col-left" className="md:w-1/2 w-full">
          <Carousel
            hasControls={dermaImages?.length > 1}
            dragEnabled={false}
            touchEnabled={false}
            hasDots
            className="rounded-xl aspect-square"
          >
            {dermaImages?.map(item => (
              <div key={item.id} className="overflow-hidden relative">
                <ImgComparisonSlider className="outline-none w-full">
                  <figure slot="first" className="before">
                    <div className="relative aspect-square">
                      <Image
                        src={item.urlBefore}
                        alt=""
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                    <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute left-4 bottom-4 text-sm">
                      Antes
                    </span>
                  </figure>
                  <figure slot="second" className="after">
                    <div className="relative aspect-square">
                      <Image
                        src={item.urlAfter}
                        alt=""
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                    <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute right-4 bottom-4 text-sm">
                      Después
                    </span>
                  </figure>
                </ImgComparisonSlider>
              </div>
            ))}
          </Carousel>
        </Flex>
      </Flex>
    </Container>
  );
}
