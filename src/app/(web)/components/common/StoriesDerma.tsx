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
        className="gap-4 items-center md:items-start relative md:justify-center md:flex-row md:gap-16"
      >
        <Flex layout="col-left" className="md:w-3/5">
          <Title
            isAnimated
            size="2xl"
            className="font-gtUltraBold text-derma-primary font-bold mb-4"
          >
            Historias inspiradoras
          </Title>
          <Text
            isAnimated
            className="text-hg-black500 mb-8 md:w-full md:text-lg"
          >
            No hay dos pieles iguales. Por eso, todas las experiencias son
            diferentes, solo coinciden en la satisfacción de los objetivos
            conseguidos.
          </Text>
        </Flex>
        <Flex layout="col-left" className="md:w-2/5 w-full">
          <Carousel
            hasControls={dermaImages?.length > 1}
            dragEnabled={false}
            touchEnabled={false}
            hasDots
            className="rounded-xl aspect-square"
            isDerma
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
