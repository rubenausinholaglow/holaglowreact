'use client';

import { useEffect, useState } from 'react';
import { UpsellingData } from '@interface/upselling';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheckCircle } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import Login from './components/Login';
import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

export default function Upselling() {
  const [phone, setPhone] = useState('');
  const [isTopMessageVisible, setIsTopMessageVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [apiResponse, setApiResponse] = useState<UpsellingData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dermaService.getRoutine('617628726'); // <--- usar phone
      setApiResponse(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLogged) {
      setIsTopMessageVisible(true);
      setTimeout(() => {
        setIsTopMessageVisible(false);
      }, 5000);
    }
  }, [isLogged]);

  return (
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
      <DermaLayout
        className="bg-derma-secondary100"
        hideButton
        hideFooter={!isLogged}
      >
        {!isLogged && <Login setIsLogged={setIsLogged} setPhone={setPhone} />}
        {apiResponse && isLogged && (
          <>
            <UpsellingIntro data={apiResponse} />
            <UpsellingRoutines data={apiResponse} />
            <UpsellingPharmacies data={apiResponse} />
          </>
        )}
      </DermaLayout>
    </CheckHydration>
  );
}
