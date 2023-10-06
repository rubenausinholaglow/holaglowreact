'use client';

import { Clinic } from '@interface/clinic';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCar, SvgRadioChecked } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClinicsCheckout() {
  const router = useRouter();
  const { clinics, selectedClinic, setSelectedClinic } =
    useGlobalPersistedStore(state => state);
  const { selectedTreatments } = useGlobalPersistedStore(state => state);
  useEffect(() => {
    if (selectedClinic) {
      setSelectedClinic(undefined);
    }
  }, []);
  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    router.push('/checkout/agenda');
  };

  return (
    <MainLayout isCheckout>
      <Container className="mt-6 md:mt-16">
        <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
          <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
            <Title className="font-semibold hidden md:block">
              Detalle de tu pedido
            </Title>
            {selectedTreatments &&
              Array.isArray(selectedTreatments) &&
              selectedTreatments.map(product => (
                <Flex
                  layout="col-left"
                  className="w-full bg-hg-secondary100 p-3 gap-3 rounded-xl mb-12"
                  key={product.id}
                >
                  <Flex layout="row-between" className="items-start w-full">
                    <div>
                      <Text className="font-semibold text-left mb-2">
                        {product.title}
                      </Text>
                      <Text className="text-left" size="xs">
                        {product.description}
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
                    {product.price}€
                  </Text>
                </Flex>
              ))}
          </Flex>
          <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
            <Title className="font-semibold">Selecciona tu clínica</Title>

            {clinics.map((clinic, index) => (
              <Flex
                layout="row-center"
                className={`transition-all w-full justify-between p-3 cursor-pointer rounded-xl ${
                  selectedClinic && selectedClinic.city === clinic.city
                    ? 'bg-hg-secondary100'
                    : 'bg-hg-black50'
                } `}
                key={clinic.city}
                onClick={() => selectClinic(clinics[index])}
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
            <Flex
              layout="row-left"
              className="bg-hg-primary100 p-6 gap-3 rounded-t-2xl md:rounded-2xl w-full items-start fixed bottom-0 left-0 right-0 md:relative"
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
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </MainLayout>
  );
}
