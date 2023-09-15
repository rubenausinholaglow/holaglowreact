'use client';

import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAngle } from 'icons/IconsDs';
import Link from 'next/link';

interface ClinicData {
  city: string;
  address: string;
  link: string;
  iframeSrc: string;
}

const CLINICS: ClinicData[] = [
  {
    city: 'Madrid',
    address: 'c. Andrés Mellado 3, 28015',
    link: 'htpps://www.holaglow.es',
    iframeSrc:
      'https://www.google.com/maps/embed/v1/place?q=Holaglow,+Calle+de+Andrés+Mellado,+Madrid,+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8',
  },
  {
    city: 'Barcelona',
    address: 'Av. Diagonal 299, 08013',
    link: 'htpps://www.holaglow.es',
    iframeSrc:
      'https://www.google.com/maps/embed/v1/place?q=Holaglow,+Avenida+Diagonal,+Barcelona,+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8',
  },
];

export default function Clinics() {
  const [selectedClinic, setSelectedClinic] = useState(CLINICS[0]);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    const mapLayer = document.querySelector('#mapLayer');

    if (mapLayer) {
      const mapLayerElement = mapLayer as HTMLElement;
      setMapHeight(mapLayerElement.offsetHeight);
    }
  }, []);

  return (
    <div className="relative bg-white">
      <Container className="py-12">
        <Title size="2xl" className="font-bold mb-8 md:w-1/2">
          Nuestras <br className="hidden md:block" />
          <Underlined color={HOLAGLOW_COLORS['primary']}>clínicas</Underlined>
        </Title>

        {/* mobile clinic selector */}
        <Accordion.Root
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 md:hidden"
        >
          {CLINICS.map(clinic => (
            <Clinic
              key={clinic.city}
              city={clinic.city}
              address={clinic.address}
              link={clinic.link}
              selectedClinic={selectedClinic}
            />
          ))}
        </Accordion.Root>

        {/* desktop clinic selector */}
        <div className="hidden md:flex w-1/2">
          <Flex layout="col-left" className="gap-4 mr-24 w-full">
            {CLINICS.map((clinic, index) => (
              <Flex
                layout="row-center"
                className={`transition-all w-full justify-between bg-hg-black100 p-4 cursor-pointer ${
                  selectedClinic.city === clinic.city
                    ? 'bg-hg-primary300'
                    : 'bg-hg-black100'
                } `}
                key={clinic.city}
                onClick={() => setSelectedClinic(CLINICS[index])}
              >
                <Flex layout="col-left">
                  <Text size="lg" className="font-semibold mb-2">
                    {clinic.city}
                  </Text>
                  <address className="not-italic mb-2 text-xs">
                    {clinic.address}
                  </address>
                  <Link
                    className="text-sm underline"
                    href="https://www.google.cat"
                  >
                    Más info
                  </Link>
                </Flex>
                <SvgAngle height={24} width={24} />
              </Flex>
            ))}
          </Flex>
        </div>
        <div
          id="mapLayer"
          className="absolute bg-slate-400 top-0 bottom-0 right-0 left-1/2 hidden md:block"
        >
          <div
            className={`overflow-hidden max-w-full w-full`}
            style={{ height: `${mapHeight}px` }}
          >
            <div id="g-mapdisplay" className="h-full w-full max-w-full">
              <iframe
                className="h-full w-full border-none"
                src={selectedClinic.iframeSrc}
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const Clinic = ({
  city,
  address,
  link,
  selectedClinic,
}: {
  city: string;
  address: string;
  link: string;
  selectedClinic: ClinicData;
}) => {
  return (
    <Accordion.Item
      value={city}
      className="group w-full bg-hg-black100 data-[state=open]:bg-hg-primary300"
    >
      <Accordion.Header className="w-full">
        <Accordion.Trigger className="w-full">
          <Flex
            layout="row-center"
            className="w-full text-xs transition-all justify-between cursor-pointer p-3 "
          >
            <Flex layout="col-left">
              <Text size="lg" className="font-semibold mb-2">
                {city}
              </Text>
              <address className="text-xs not-italic mb-2">{address}</address>
              <Link className="text-sm underline" href="https://www.google.cat">
                Más info
              </Link>
            </Flex>
            <SvgAngle
              height={24}
              width={24}
              className="rotate-90 md:rotate-0"
            />
          </Flex>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="md:hidden overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        <div className={`overflow-hidden max-w-full w-full h-[300px]`}>
          <div id="g-mapdisplay" className="h-full w-full max-w-full">
            <iframe
              className="h-full w-full border-none"
              src={selectedClinic.iframeSrc}
            ></iframe>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
