'use client';

import { useEffect, useState } from 'react';
import { Clinic } from '@interface/clinic';
import * as Accordion from '@radix-ui/react-accordion';
import Clinics from 'app/components/home/Clinics';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCheck } from 'icons/Icons';
import { SvgAngle, SvgCar, SvgRadioChecked } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchClinics } from 'utils/fetch';

export default function ClinicsCheckout() {
  const router = useRouter();
  const { clinics, setClinics, selectedClinic, setSelectedClinic } =
    useGlobalPersistedStore(state => state);
  const { selectedTreatments } = useGlobalPersistedStore(state => state);
  const [googleMapAddress, setGoogleMapAddress] = useState('');
  const [mapHeight, setMapHeight] = useState(550);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);

  useEffect(() => {
    if (!isEmpty(selectedClinic)) {
      const mapLayer = document.querySelector('#mapLayer');

      if (mapLayer) {
        const mapLayerElement = mapLayer as HTMLElement;
        setMapHeight(mapLayerElement.offsetHeight);
      }

      const formattedAddress = selectedClinic.address.replace(/ /g, '+');
      const formattedCity = selectedClinic.city.replace(/ /g, '+');

      setGoogleMapAddress(`${formattedAddress},${formattedCity}`);
    }
  }, [selectedClinic]);

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    router.push('/checkout/agenda');
  };

  console.log(selectedClinic);

  return (
    <MainLayout isCheckout>
      <div className="relative mt-9 md:mt-16">
        <Container className="md:pr-32">
          <Flex
            layout="col-left"
            className="bg-hg-tertiary100 p-3 gap-3 rounded-xl md:w-1/2 mb-12"
          >
            <Flex layout="row-between" className="items-start w-full">
              <div>
                <Text className="font-semibold text-left mb-2">
                  Arrugas expresión: Frente, entrecejo y patas de gallo
                </Text>
                <Text className="text-left" size="xs">
                  1 vial ácido hialurónico
                </Text>
              </div>
              <SvgRadioChecked
                className="mt-[2px] shrink-0"
                height={24}
                width={24}
              />
            </Flex>
            <Text
              size="xl"
              className="text-hg-secondary font-semibold w-full text-right"
            >
              289€
            </Text>
          </Flex>

          <Title className="font-semibold mb-6">Selecciona tu clínica</Title>

          <Flex
            layout="col-left"
            className="gap-4 mr-24 w-full md:w-1/2 md:mb-8"
          >
            {clinics.map((clinic, index) => (
              <Flex
                layout="row-center"
                className={`transition-all w-full justify-between p-3 cursor-pointer rounded-xl ${
                  selectedClinic && selectedClinic.city === clinic.city
                    ? 'bg-hg-secondary100'
                    : 'bg-hg-black50'
                } `}
                key={clinic.city}
                onClick={() => setSelectedClinic(clinics[index])}
              >
                <Flex layout="col-left">
                  <Text size="lg" className="font-semibold mb-2">
                    {clinic.city}
                  </Text>
                  <address className="not-italic mb-2 text-xs">
                    {clinic.address}
                  </address>
                </Flex>
                {selectedClinic && selectedClinic.city === clinic.city ? (
                  <SvgRadioChecked height={24} width={24} />
                ) : (
                  <div className="border border-hg-black h-[24px] w-[24px] rounded-full"></div>
                )}
              </Flex>
            ))}
          </Flex>
          <Flex
            layout="row-left"
            className="bg-hg-primary300 p-3 gap-3 rounded-t-2xl md:rounded-2xl md:w-1/2 items-start fixed bottom-0 left-0 right-0 md:relative"
          >
            <div className="bg-hg-primary p-3 rounded-full">
              <SvgCar height={16} width={16} />
            </div>
            <div>
              <Text size="sm" className="font-semibold mb-2">
                Parking Gratis
              </Text>
              <Text className="text-left" size="xs">
                Te pagamos el parking para que tú disfrutes al máximo de la
                experiencia
              </Text>
              <Link className="text-xs underline" href="https://www.google.cat">
                Más info
              </Link>
            </div>
          </Flex>
        </Container>

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
                src={`https://www.google.com/maps/embed/v1/place?q=Holaglow,+${googleMapAddress},+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Flex layout="col-center">
        {selectedTreatments?.map(product => (
          <Flex key={product.id}>
            {product.title}
            {product.description}
            {product.price}
          </Flex>
        ))}
      </Flex>
    </MainLayout>
  );
}
