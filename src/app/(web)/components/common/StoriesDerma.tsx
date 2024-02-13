import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function StoriesDerma() {
  const dermaImages: any[] = [
    '/images/derma/beforeAfter/beforeAfter1.jpg',
    '/images/derma/beforeAfter/beforeAfter2.jpg',
    '/images/derma/beforeAfter/beforeAfter3.jpg',
    '/images/derma/beforeAfter/beforeAfter4.jpg',
  ];

  return (
    <Container className="py-12 overflow-hidden">
      <Flex
        layout="col-left"
        className="gap-4 items-center md:items-start relative md:justify-center md:flex-row md:gap-16"
      >
        <Flex layout="col-left" className="md:w-1/2">
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
        <Flex layout="col-left" className="md:w-1/2 w-full relative">
          <Carousel
            hasControls={dermaImages?.length > 1}
            dragEnabled={false}
            touchEnabled={false}
            hasDots
            className="rounded-xl"
            isDerma
          >
            {dermaImages?.map(item => (
              <div
                key={item.id}
                className="overflow-hidden relative rounded-2xl"
              >
                <Image
                  height={400}
                  width={600}
                  src={item}
                  alt="Antes y después Derma by Holaglow"
                />
              </div>
            ))}
          </Carousel>
          <Text className="absolute bottom-20 left-4 bg-derma-primary500/80 text-derma-tertiary py-1 px-2 rounded-full text-sm">
            Antes
          </Text>
          <Text className="absolute bottom-20 right-4 bg-derma-primary500/80 text-derma-tertiary py-1 px-2 rounded-full text-sm">
            Después
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}
