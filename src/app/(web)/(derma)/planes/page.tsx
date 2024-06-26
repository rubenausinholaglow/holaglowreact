'use client';

import { useEffect, useState } from 'react';
import { UpsellingData } from '@interface/upselling';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheckCircle } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import Login from './components/Login';
import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

export default function Upselling() {
  const { dermaPhone } = useSessionStore(state => state);
  const [isTopMessageVisible, setIsTopMessageVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(dermaPhone != '');
  const [apiResponse, setApiResponse] = useState<UpsellingData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dermaService.getRoutine(dermaPhone);
      setApiResponse(response);

      if (!isLogged) setIsLogged(true);
    };
    if (dermaPhone) fetchData();
  }, [dermaPhone]);

  useEffect(() => {
    if (isLogged) {
      setIsTopMessageVisible(true);
      setTimeout(() => {
        setIsTopMessageVisible(false);
      }, 5000);
    }
  }, [isLogged]);

  return (
    <DermaLayout
      className="bg-derma-secondary100"
      hideButton
      hideFooter={!isLogged}
    >
      <CheckHydration>
        <div
          className={`h-auto transition-all overflow-hidden duration-1000 ${
            isTopMessageVisible ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <Flex className="bg-derma-primary/20 p-4 items-start gap-2">
            <SvgCheckCircle className="text-derma-primary mt-2" />
            <div>
              <Text className="font-semibold">¡Acceso validado!</Text>
              <Text className="text-sm">
                Autenticación procesada correctamente
              </Text>
            </div>
          </Flex>
        </div>
        {!isLogged && <Login setIsLogged={setIsLogged} />}
        {isLogged && (
          <>
            <UpsellingIntro data={apiResponse} />
            <UpsellingRoutines data={apiResponse} />
            <UpsellingPharmacies data={apiResponse} />
          </>
        )}
      </CheckHydration>
    </DermaLayout>
  );
}
