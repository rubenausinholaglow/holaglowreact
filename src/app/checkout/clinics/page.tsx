'use client';

import { useEffect, useState } from 'react';
import { Clinic } from '@interface/clinic';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';
import { fetchClinics } from 'utils/fetch';

export default function ClinicsCheckout() {
  const { clinics, setClinics, selectedClinic, setSelectedClinic } =
    useGlobalPersistedStore(state => state);

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
  };

  return (
    <Flex>
      {clinics.map(clinic => (
        <Flex onClick={() => selectClinic(clinic)} key={clinic.internalName}>
          <Flex>{clinic.city}</Flex>
          <Flex>{clinic.address}</Flex>
        </Flex>
      ))}
    </Flex>
  );
}
