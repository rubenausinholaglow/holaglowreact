'use client';

import { SvgLocation } from 'app/icons/Icons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const CLINICS = [
  {
    name: 'Barcelona',
    address: 'Avenida Diagonal, 299 - 08013',
    images: [
      'barcelona1.jpg',
      'barcelona2.jpg',
      'barcelona3.jpg',
      'barcelona4.jpg',
    ],
  },
  {
    name: 'Madrid',
    address: 'C. de Andrés Mellado, 3 - 28015 (frente a Corte Inglés Princesa)',
    images: ['madrid1.jpg', 'madrid2.jpg', 'madrid3.jpg'],
  },
  {
    name: 'Valencia',
    address: 'Plaza de Alfonso el Magnánimo, 6 - 46003 (Metro Colón)',
    images: [
      'valencia1.jpg',
      'valencia2.jpg',
      'valencia3.jpg',
      'valencia4.jpg',
    ],
  },
];

const TAGS = [
  'Medicina estética',
  'Formulación magistral',
  'Mesoterapia',
  'Hidratación profunda',
  'Peeling químico',
  'Hydrafacial',
  'Microneedling',
];

function ClinicSlide({ clinic }: { clinic: any }) {
  return (
    <div className="rounded-t-3xl p-4 h-full flex flex-col">
      <Carousel
        dragEnabled={false}
        touchEnabled={false}
        hasControls
        hasTopControls
        isIntrinsicHeight
        visibleSlides={1}
        infinite={false}
        isDerma
      >
        {clinic.images.map((image: string) => (
          <div
            key={image}
            className="aspect-square relative rounded-t-3xl overflow-hidden"
          >
            <Image
              src={`/images/derma/clinics/${image}`}
              alt={`Descubre nuestra clínica Holaglow en ${clinic.name}`}
              objectFit="cover"
              fill
            />
          </div>
        ))}
      </Carousel>
      <div className="bg-white p-4 rounded-b-2xl overflow-hidden shadow-centered-black-sm flex-grow">
        <Title className="font-light text-derma-tertiary text-drxl mb-4">
          Clínica {clinic.name}
        </Title>
        <Flex className="gap-2 w-full items-start mb-6">
          <SvgLocation className="shrink-0 -mt-[2px] h-5 w-5" />
          <Text size="sm">{clinic.address}</Text>
        </Flex>
        <Text className="font-semibold text-derma-tertiary mb-4">
          Servicios destacados
        </Text>
        <ul className="flex gap-2 flex-wrap">
          {TAGS.map(tag => (
            <li
              key={tag}
              className="bg-derma-primary300/20 text-derma-primary py-2 px-4 rounded-xl text-xs shrink-0"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ClinicsDerma({
  className = '',
}: {
  className?: string;
}) {
  return (
    <>
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Conoce nuestras clínicas
        </Title>
        <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
          Vive una experiencia a medida, desde el probador virtual hasta
          tratamientos personalizados. Encuentra la clínica Holaglow más cercana
          a ti y ven a conocernos.
        </Text>
      </Container>
      <Container className="px-0 md:px-4">
        <Carousel
          controlStyles="px-4 md:px-0 mt-4"
          hasDots
          isIntrinsicHeight
          visibleSlides={1}
          currentSlide={0}
          infinite={false}
          isDerma
        >
          {CLINICS.map(clinic => (
            <ClinicSlide key={clinic.name} clinic={clinic} />
          ))}
        </Carousel>
      </Container>
    </>
  );
}
