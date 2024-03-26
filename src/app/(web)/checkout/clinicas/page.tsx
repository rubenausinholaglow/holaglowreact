'use client';

import { useEffect, useState } from 'react';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgCar, SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Clinic } from 'app/types/clinic';
import { getDiscountedPrice } from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function ClinicsCheckout() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { clinics } = useGlobalPersistedStore(state => state);
  const { selectedClinic, setSelectedClinic, selectedTreatments } =
    useSessionStore(state => state);

  useEffect(() => {
    if (selectedClinic) {
      setSelectedClinic(undefined);
    }
  }, []);

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    router.push(ROUTES.checkout.schedule);
  };

  const availableClinicsByPRoduct = selectedTreatments[0].clinicDetail.map(
    item => item.clinic.city
  );

  return (
    <App>
      <MainLayout isCheckout>
        <Container className="mt-6 md:mt-16">
          <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
            <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
              <Title className="font-semibold">Selecciona tu clínica</Title>

              {clinics.map((item, index) => (
                <Flex
                  layout="row-center"
                  className={`transition-all w-full justify-between p-3 cursor-pointer rounded-xl ${
                    availableClinicsByPRoduct.includes(item.city)
                      ? ''
                      : 'pointer-events-none opacity-20'
                  } ${
                    selectedClinic && selectedClinic.city === item.city
                      ? 'bg-hg-secondary100'
                      : 'bg-hg-black50'
                  } `}
                  key={item.city}
                  onClick={() => selectClinic(clinics[index])}
                >
                  <Flex layout="col-left">
                    <Text size="lg" className="font-semibold mb-2">
                      {item.city}{' '}
                      {!availableClinicsByPRoduct.includes(item.city) && (
                        <span className="text-sm">(No disponible)</span>
                      )}
                    </Text>
                    <address className="not-italic mb-2 text-xs">
                      {item.address}
                    </address>
                  </Flex>
                  {selectedClinic && selectedClinic.city === item.city ? (
                    <SvgRadioChecked
                      height={24}
                      width={24}
                      className="shrink-0 ml-4"
                    />
                  ) : (
                    <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-4"></div>
                  )}
                </Flex>
              ))}
              <Flex
                layout="row-left"
                className="bg-hg-primary100 p-6 gap-3 rounded-t-2xl md:rounded-2xl w-full items-start relative bottom-0 left-0 right-0 md:relative"
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
    </App>
  );
}
