'use client';

import { Clinic } from '@interface/clinic';
import useRoutes from '@utils/useRoutes';
import { SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

export default function CheckoutClinicSelector({
  isDashboard = false,
  className = '',
}: {
  isDashboard?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { clinics } = useGlobalPersistedStore(state => state);

  const { selectedClinic, setSelectedClinic } = useSessionStore(state => state);

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);

    if (!isDashboard) {
      router.push(ROUTES.checkout.type);
    }
  };

  return (
    <Flex layout="col-left" className={`gap-4 w-full ${className}`}>
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
            <SvgRadioChecked height={24} width={24} className="shrink-0 ml-4" />
          ) : (
            <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-4"></div>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
