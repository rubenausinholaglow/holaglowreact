'use client';

import { useEffect } from 'react';
import { Clinic } from '@interface/clinic';
import Clinics from 'app/components/home/Clinics';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCheck } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { fetchClinics } from 'utils/fetch';

export default function ClinicsCheckout() {
  const router = useRouter();
  const { clinics, setClinics, selectedClinic, setSelectedClinic } =
    useGlobalPersistedStore(state => state);

  const { selectedTreatments } = useGlobalPersistedStore(state => state);
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

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    router.push('/checkout/agenda');
  };

  return (
    <MainLayout isCheckout>
      <Container>
        <Flex
          layout="col-right"
          className="bg-hg-tertiary100 p-3 gap-3 rounded-xl"
        >
          <Flex layout="row-between" className="items-start">
            <div>
              <Text className="font-semibold">
                Arrugas expresión: Frente, entrecejo y patas de gallo
              </Text>
              <Text size="sm">1 vial ácido hialurónico</Text>
            </div>
            <SvgCheck className="mt-[2px]" height={24} width={24} />
          </Flex>
        </Flex>

        <Title className="font-semibold">Selecciona tu clínica</Title>
      </Container>
      <Clinics />

      <Flex layout="col-center">
        {selectedTreatments?.map(product => (
          <Flex key={product.id}>
            {product.title}
            {product.description}
            {product.price}
          </Flex>
        ))}
        Selecciona una clínica
        {clinics.map(clinic => (
          <Flex onClick={() => selectClinic(clinic)} key={clinic.internalName}>
            <Flex>{clinic.city}</Flex>
            <Flex>{clinic.address}</Flex>
          </Flex>
        ))}
      </Flex>
    </MainLayout>
  );
}
