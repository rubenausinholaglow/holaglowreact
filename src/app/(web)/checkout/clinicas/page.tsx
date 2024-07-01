'use client';

import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Clinic } from 'app/types/clinic';
import useRoutes from 'app/utils/useRoutes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import FreeParking from '../components/FreeParking';

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

  const availableClinicsByPRoduct =
    selectedTreatments[0] && selectedTreatments[0].clinicDetail
      ? selectedTreatments[0].clinicDetail.map(item => item.clinic.city)
      : [];

  return (
    <App>
      <MainLayout isCheckout>
        <Container className="mt-6 md:mt-16">
          <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
            <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
              <Title size="xldr" className="font-light">
                Selecciona tu clínica
              </Title>

              {clinics.map((item, index) => (
                <Flex
                  layout="row-left"
                  className={`border border-hg-black300 py-4 px-4 rounded-2xl gap-4 w-full hover:bg-hg-secondary100 cursor-pointer ${
                    availableClinicsByPRoduct.includes(item.city)
                      ? ''
                      : 'pointer-events-none opacity-20'
                  } ${
                    selectedClinic && selectedClinic.city === item.city
                      ? 'border-hg-secondary'
                      : ''
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
                      {item?.address}, {item?.district}, {item?.zipCode}{' '}
                      {item?.province}
                      <br />
                      {item?.addressExtraInfo}
                    </address>
                  </Flex>
                  {selectedClinic && selectedClinic.city === item.city ? (
                    <SvgRadioChecked
                      height={24}
                      width={24}
                      className="shrink-0 ml-auto"
                    />
                  ) : (
                    <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-auto"></div>
                  )}
                </Flex>
              ))}
              {!isMobile && (
                <CheckHydration>
                  <FreeParking className="mt-12" />
                </CheckHydration>
              )}
            </Flex>
          </Flex>
        </Container>
      </MainLayout>
      {isMobile && (
        <CheckHydration>
          <FreeParking className="absolute bottom-0 left-0 right-0" />
        </CheckHydration>
      )}
    </App>
  );
}
