'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import TextInputField from '@dashboardComponents/TextInputField';
import AuthenticationService from '@services/AuthtenticationService';
import UserService from '@services/UserService';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgSpinner } from 'app/icons/Icons';
import { useDermaStore } from 'app/stores/dermaStore';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [AuthSuccesfully, setAuthSuccesfully] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState('');
  const { user, setCurrentUser } = useGlobalPersistedStore(state => state);
  const { setClient, client } = useSessionStore(state => state);
  const {
    picturesUrls,
    setPicturesUrls,
    setId,
    setPain,
    setSymptoms,
    setSkinType,
    setSkinSensibility,
    setAllergy,
    setAllergyInfo,
    setIllness,
    setIllnessInfo,
    setMedication,
    setMedicationInfo,
    setLactating,
    setExtraInfo,
    userIdRecover,
    setUserIdRecover,
  } = useDermaStore(state => state);

  const router = useRouter();
  async function login() {
    if (userId) {
      setIsLoading(true);
      await AuthenticationService.isValidLoginDerma(userId)
        .then(response => {
          if (!response) {
            setErrorMessage('Usuario no encontrado');
          }
          setIsLoading(false);
        })
        .catch(error => {
          Bugsnag.notify('Error during authentication: ' + error);
          setErrorMessage('Error durante la autenticación: ' + error);
        });
    }
  }
  useEffect(() => {
    const queryString = window?.location?.search;
    const params = new URLSearchParams(queryString.toLowerCase());
    const userId = params.get('userid') || '';
    setUserId(userId);
    if (!userIdRecover && userId) {
      login();
    }
    setUserIdRecover(userId);
  }, []);

  async function handleValidateToken() {
    setIsLoading(true);
    setErrorMessage('');
    await AuthenticationService.isValidToken(token, true)
      .then(async response => {
        if (response) {
          UserService.getDermaQuestions(userId).then(x => {
            if (x) {
              setPicturesUrls(x.photos);
              setId(x.id!);
              setPain(x.skinPain);
              const symptons: string[] = [];
              x.skinConcerns.forEach(x => symptons.push(x.concern));
              setSymptoms(symptons);
              setSkinType(x.skinType);
              setSkinSensibility(x.skinSensibility);
              setAllergy(x.allergy);
              setAllergyInfo(x.allergyInfo);
              setIllness(x.illness);
              setIllnessInfo(x.illnessInfo);
              setMedication(x.medication);
              setMedicationInfo(x.medicationInfo);
              setLactating(x.lactating);
              setExtraInfo(x.extraInfo);
              setClient(x.user);
              setCurrentUser({
                email: x.user.email,
                firstName: x.user.firstName,
                clinicToken: '',
                flowwwToken: '',
                id: x.user.id,
                name: x.user.firstName,
                surname: x.user.lastName,
                secondSurname: x.user.secondLastName,
                phone: x.user.phone,
              });
              router.push(ROUTES.derma.multistep.thankyou);
            }
          });
        } else {
          setErrorMessage('Código no válido');
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage('Error durante la validación del token: ' + error);
      });
  }

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <Container>
          <div className="py-24 md:pt-36 md:pb-40 text-center max-w-md mx-auto">
            {!AuthSuccesfully && (
              <div className="relative">
                <p className="mt-6 text-gray-700 mb-6">
                  Introduce el código que has recibido para continuar
                </p>
                <TextInputField
                  placeholder="Código"
                  value={token}
                  onChange={(e: any) => setToken(e.target.value)}
                  hasNoValidation
                />
                <Button
                  type="derma"
                  className="mt-6"
                  onClick={handleValidateToken}
                >
                  {isLoading ? (
                    <SvgSpinner height={24} width={24} />
                  ) : (
                    <>Validar</>
                  )}
                </Button>
                {userIdRecover && (
                  <Button type="derma" className="mt-6 ml-5" onClick={login}>
                    {isLoading ? (
                      <SvgSpinner height={24} width={24} />
                    ) : (
                      <>Reenviar Código</>
                    )}
                  </Button>
                )}
              </div>
            )}
            {errorMessage && (
              <p className="text-red-500 mt-6">{errorMessage}</p>
            )}
          </div>
        </Container>
      </div>
    </DermaLayout>
  );
}
