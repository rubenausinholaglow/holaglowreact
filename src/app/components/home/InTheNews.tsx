import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgHolaGlowStar } from 'icons/IconsDs';
import Image from 'next/image';

const NEWS = [
  {
    imgUrl: '/images/home/news/elpais.jpg',
    medium: 'ElPaís',
    extract:
      'Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Hac habitasse platea dictumst quisque sagittis.',
  },
  {
    imgUrl: '/images/home/news/publico.jpg',
    medium: 'publico.es',
    extract:
      'Hac habitasse platea dictumst quisque sagittis purus sit amet. Turpis tincidunt id aliquet risus feugiat. Massa enim nec dui nunc mattis enim ut tellus.',
  },
  {
    imgUrl: '/images/home/news/ara.jpg',
    medium: 'Diari Ara',
    extract:
      'Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Lectus urna duis convallis convallis. Proin sagittis nisl rhoncus mattis rhoncus urna.',
  },
];

const NewsExtract = ({
  imgUrl,
  extract,
  medium,
}: {
  extract: string;
  imgUrl: string;
  medium: string;
}) => {
  return (
    <Flex layout="col-center" className="basis-0 grow">
      <Text size="xl" className="font-semibold mb-4 text-center">
        <span className="italic">&quot; </span>
        {extract}
        <span className="italic">&quot;</span>
      </Text>
      <Image
        src={imgUrl}
        alt={medium}
        width={300}
        height={100}
        style={{
          width: '50%',
          height: 'auto',
        }}
        className="rounded-xl mb-4"
      />
    </Flex>
  );
};

export default function Testimonials() {
  return (
    <Container className="pt-20 pb-12">
      <Title size="2xl" className="font-bold mb-20 relative">
        <SvgHolaGlowStar
          height={200}
          width={200}
          fill={HOLAGLOW_COLORS['lime']}
          className="absolute left-0 top-0 -translate-x-[33%] -translate-y-[33%]"
        />
        <span className="relative">Glow in the news</span>
      </Title>
      <Carousel
        hasControls
        className="relative mb-12"
        isIntrinsicHeight
        visibleSlides={1}
        infinite={false}
      >
        <Flex layout="row-center" className="gap-16 items-start">
          {NEWS.map(item => (
            <NewsExtract
              key={item.medium}
              imgUrl={item.imgUrl}
              medium={item.medium}
              extract={item.extract}
            />
          ))}
        </Flex>
        <Flex layout="row-center" className="gap-12 items-start">
          {NEWS.map(item => (
            <NewsExtract
              key={item.medium}
              imgUrl={item.imgUrl}
              medium={item.medium}
              extract={item.extract}
            />
          ))}
        </Flex>
      </Carousel>
    </Container>
  );
}
