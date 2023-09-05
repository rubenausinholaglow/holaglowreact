'use client';

import { useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAngle } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

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
      <AccordionPrimitive.Root
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-full"
      >
        <AccordionPrimitive.Item value="item" className="w-full">
          <AccordionPrimitive.Header className="w-full">
            <AccordionPrimitive.Trigger
              className="w-full"
              onClick={() => setSelectedClinic(city)}
            >
              <Flex
                layout="row-center"
                className={`w-full text-xs transition-all justify-between cursor-pointer p-3 ${
                  isActive ? 'bg-hg-lime' : 'bg-hg-black100'
                }`}
              >
                <Flex layout="col-left">
                  <Text size="lg" className="font-semibold mb-2">
                    {city}
                  </Text>
                  <address className="not-italic mb-2">{address}</address>
                  <Link
                    className="text-hg-black500 underline"
                    href="https://www.google.cat"
                  >
                    Más info
                  </Link>
                </Flex>
                <SvgAngle
                  height={24}
                  width={24}
                  className="rotate-90 md:rotate-0"
                />
              </Flex>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <div
              className="aspect-square relative"
              style={{
                background: `url("/images/home/maps/${selectedClinic.toLowerCase()}.png") center / 225% no-repeat`,
              }}
            ></div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    );
  };

  return (
    <div className="relative bg-white">
      <Container className="py-12">
        <div className="md:w-1/2 md:py-12 md:pr-24">
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

      <div
        className="absolute bg-slate-400 top-0 bottom-0 right-0 left-1/2 hidden md:block"
        style={{
          background: `url("/images/home/maps/${selectedClinic.toLowerCase()}.png") center / cover no-repeat`,
        }}
      ></div>
    </div>
  );
}
