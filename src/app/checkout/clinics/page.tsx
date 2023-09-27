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
import { SvgAngle } from 'icons/IconsDs';
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

    if (isEmpty(selectedClinic) && !isEmpty(clinics)) {
      setSelectedClinic(clinics[0]);
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

  return (
    <MainLayout isCheckout>
      <div className="relative">
        <Container className="md:pr-32">
          <Flex
            layout="col-left"
            className="bg-hg-tertiary100 p-3 gap-3 rounded-xl md:w-1/2 mt-9"
          >
            <Flex layout="row-between" className="items-start">
              <div>
                <Text className="font-semibold text-left">
                  Arrugas expresión: Frente, entrecejo y patas de gallo
                </Text>
                <Text className="text-left" size="sm">
                  1 vial ácido hialurónico
                </Text>
              </div>
              <SvgCheck className="mt-[2px]" height={24} width={24} />
            </Flex>
            <Flex layout="col-right">
              <Title className="text-hg-secondary mt-[12px] te">289€</Title>
            </Flex>
          </Flex>

          <Title className="font-semibold">Selecciona tu clínica</Title>

          <Flex layout="col-left" className="gap-4 mr-24 w-full md:w-1/2">
            {clinics.map((clinic, index) => (
              <Flex
                layout="row-center"
                className={`transition-all w-full justify-between p-4 cursor-pointer rounded-xl ${
                  selectedClinic.city === clinic.city
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
                <SvgCheck className="mt-[2px]" height={24} width={24} />
              </Flex>
            ))}
          </Flex>

          <Flex
            layout="col-left"
            className="bg-hg-primary300 p-3 gap-3 rounded-xl md:w-1/2 mt-9"
          >
            <Text size="lg" className="font-semibold mb-2">
              Parking Graits
            </Text>
            <Text className="text-left" size="sm">
              Te pagamos el parking para que tú disfrutes al máximo de la
              experiencia
            </Text>
            <Link className="text-sm underline" href="https://www.google.cat">
              Más info
            </Link>
          </Flex>
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
        </Container>
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
