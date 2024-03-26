'use client';

import { isMobile } from 'react-device-detect';
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
    <div className="rounded-t-3xl md:rounded-none p-4 md:p-[1px] h-full flex flex-col md:flex-row md:gap-16">
      <Carousel
        dragEnabled={false}
        touchEnabled={false}
        hasControls
        hasTopControls
        isIntrinsicHeight
        visibleSlides={1}
        infinite={false}
        isDerma
        className="md:order-2 md:rounded-3xl overflow-hidden"
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
      <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-b-2xl overflow-hidden shadow-centered-black-sm flex-grow md:shadow-none">
        <Title className="font-light text-derma-tertiary text-drxl mb-4">
          Clínica {clinic.name}
        </Title>
        <Flex className="gap-2 w-full items-start mb-6 md:mb-16">
          <SvgLocation className="shrink-0 -mt-[2px] h-5 w-5" />
          <Text size="sm">{clinic.address}</Text>
        </Flex>
        <Text className="font-semibold text-derma-tertiary mb-4 md:text-lg md:mb-8">
          Servicios destacados
        </Text>
        <ul className="flex gap-2 flex-wrap md:gap-4">
          {TAGS.map(tag => (
            <li
              key={tag}
              className="bg-[#ebfcf9] text-derma-primary py-2 px-4 rounded-xl text-xs md:text-sm shrink-0"
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
    <div className="md:bg-white md:py-16">
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
          controlStyles={
            isMobile
              ? 'px-4 md:px-0 mt-4'
              : 'absolute left-[-100%] bottom-5 ml-24'
          }
          hasDots={isMobile}
          hasControls={!isMobile}
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
    </div>
  );
}
