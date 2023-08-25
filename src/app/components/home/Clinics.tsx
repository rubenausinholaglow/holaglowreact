'use client';

import { useState } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAngle } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';

const CLINICS = [
  {
    city: 'Barcelona',
    address: 'Av. Diagonal 299, 08013',
    link: 'htpps://www.holaglow.es',
  },
  {
    city: 'Madrid',
    address: 'c. Andrés Mellado 3, 28015',
    link: 'htpps://www.holaglow.es',
  },
  {
    city: 'Valencia',
    address: 'c. Nifru tai dea 356, 07003',
    link: 'htpps://www.holaglow.es',
  },
];

export default function Clinics() {
  const [selectedClinic, setSelectedClinic] = useState(CLINICS[0].city);

  const Clinic = ({
    city,
    address,
    link,
  }: {
    city: string;
    address: string;
    link: string;
  }) => {
    const [isActive] = useState(selectedClinic === city);

    return (
      <Flex
        layout="row-center"
        className={`transition-all justify-between cursor-pointer p-3 ${
          isActive ? 'bg-hg-lime' : 'bg-hg-black100'
        }`}
        onClick={() => setSelectedClinic(city)}
      >
        <div className="text-xs ">
          <Text size="lg" className="font-semibold mb-2">
            {city}
          </Text>
          <address className="not-italic mb-2">{address}</address>
          <Link className="text-hg-black500 underline" href={link}>
            Más info
          </Link>
        </div>
        <SvgAngle height={24} width={24} />
      </Flex>
    );
  };

  return (
    <div className="relative">
      <Container className="pt-12 pb-12">
        <div className="w-1/2 py-12 pr-24">
          <Title size="2xl" className="font-bold mb-8">
            Nuestras
            <br />
            <Underlined color={HOLAGLOW_COLORS['lime']}>clínicas</Underlined>
          </Title>
          <ul className="flex flex-col gap-4">
            {CLINICS.map(clinic => (
              <Clinic
                key={clinic.city}
                city={clinic.city}
                address={clinic.address}
                link={clinic.link}
              />
            ))}
          </ul>
        </div>
      </Container>

      <div className="absolute bg-slate-400 top-0 bottom-0 right-0 left-1/2">
        <Image
          src="/images/home/maps/barcelona.png"
          alt="clínica"
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
