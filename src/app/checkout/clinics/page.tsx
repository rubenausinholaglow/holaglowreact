'use client';

import { useEffect, useState } from 'react';
import { Clinic } from '@interface/clinic';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';
import { fetchClinics } from 'utils/fetch';
import { useRouter } from 'next/navigation';

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
  );
}
