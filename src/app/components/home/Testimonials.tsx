import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    imgUrl: '/images/home/testimonial1.png',
    name: 'Marta',
    testimonial:
      'Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Hac habitasse platea dictumst quisque sagittis purus sit amet. Turpis tincidunt id aliquet risus feugiat. Massa enim nec dui nunc mattis enim ut tellus. Velit dignissim sodales ut eu sem integer vitae justo eget.',
  },
  {
    imgUrl: '/images/home/testimonial1.png',
    name: 'Luisa',
    testimonial:
      'Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Lectus urna duis convallis convallis. Proin sagittis nisl rhoncus mattis rhoncus urna.',
  },
  {
    imgUrl: '/images/home/testimonial1.png',
    name: 'Sergio',
    testimonial:
      'Hac habitasse platea dictumst quisque sagittis purus sit amet. Turpis tincidunt id aliquet risus feugiat. Massa enim nec dui nunc mattis enim ut tellus. Velit dignissim sodales ut eu sem integer vitae justo eget.',
  },
];

const Testimonial = ({
  imgUrl,
  name,
  testimonial,
}: {
  imgUrl: string;
  name: string;
  testimonial: string;
}) => {
  return (
    <Flex layout="col-center" className="basis-0 grow">
      <Image
        src={imgUrl}
        alt="testimonials"
        width={100}
        height={100}
        style={{
          width: '80%',
          height: 'auto',
        }}
        className="rounded-xl mb-4"
      />
      <Text className="font-semibold mb-4">{name}</Text>
      <Text size="sm" className="text-hg-black500 text-center">
        {testimonial}
      </Text>
    </Flex>
  );
};

export default function Testimonials() {
  return (
    <Container className="py-12">
      <Title size="2xl" className="font-bold mb-12 max-w-[75%]">
        Tu experiencia es nuestra
        <Underlined color={HOLAGLOW_COLORS['lime']}>obsesión</Underlined>
      </Title>
      <Flex layout="row-center" className="gap-12 items-start">
        {TESTIMONIALS.map(item => (
          <Testimonial
            key={item.name}
            imgUrl={item.imgUrl}
            name={item.name}
            testimonial={item.testimonial}
          />
        ))}
      </Flex>
    </Container>
  );
}
