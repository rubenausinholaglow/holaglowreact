'use client';

import { useEffect, useState } from 'react';
import { DiagnosticData } from '@interface/derma/diagnosis';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useSearchParams } from 'next/navigation';

import Login from '../planes/components/Login';
import DiagnosisBlock from './Diagnosis';
import EmptyDiagnosis from './EmptyDiagnosis';
import RoutineExplanation from './RoutineExplanation';
import UserFeedbackDiagnosis from './UserFeedbackDiagnosis';

export default function Diagnostico() {
  const { dermaPhone, setDermaPhone } = useSessionStore(state => state);
  const [isLogged, setIsLogged] = useState(dermaPhone != '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState<any | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const phone = searchParams.get('phone');

    if (phone) {
      setDermaPhone(phone);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async (phone: string) => {
      const response: DiagnosticData = await dermaService.getDiagnosis(phone);

      setDiagnosisData(response);
      if (!isLogged) setIsLogged(true);
    };

    if (dermaPhone) {
      fetchData(dermaPhone);
    }
  }, [dermaPhone]);

  if (!isLogged && !dermaPhone && isLoaded) {
    return <Login setIsLogged={setIsLogged} />;
  }

  if (!diagnosisData) {
    return <FullScreenLoading isDerma />;
  }

  const initialDate = dayjs(diagnosisData?.creationDate);
  const post30Days = initialDate.add(30, 'day');
  const post60Days = initialDate.add(60, 'day');
  const post90Days = initialDate.add(90, 'day');

  const hasDiagnosticImages = (diagnosis: any) => {
    return diagnosis.front || diagnosis.left || diagnosis.right;
  };

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <CheckHydration>
        {isLogged && (
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
        )}
        <div className="relative">
          <Container className="px-0 md:px-4">
            <Flex
              layout="row-right"
              className="w-full -translate-y-12 relative z-50 pr-4 md:pr-0"
            >
              <a
                className="text-hg-primary text-sm"
                href={`${ROUTES.derma.diagnostico.subscription}?userId=${diagnosisData?.user?.id}&routine=${diagnosisData?.diagnostic[0].routine}`}
              >
                Gestionar suscripción
              </a>
            </Flex>
            {isLogged && diagnosisData && (
              <Flex
                layout="col-left"
                className="w-full md:flex-row gap-6 md:gap-16 pt-4"
              >
                <ul className="w-full md:w-1/2 flex flex-col gap-8 px-4 md:px-0 pb-4 md:pb-12">
                  <li>
                    <Title
                      size="xldr"
                      className="text-derma-primary font-light mb-4"
                    >
                      Primer diagnóstico
                    </Title>

                    <Text className="text-sm mb-6">
                      Después de 24-48 horas de tu solicitud
                    </Text>

                    {diagnosisData?.diagnostic[0] && (
                      <DiagnosisBlock
                        isFirstDiagnosis
                        user={diagnosisData.user}
                        index={0}
                        diagnosis={diagnosisData.diagnostic[0]}
                        isVisible={diagnosisData.diagnostic.length === 1}
                      />
                    )}
                  </li>

                  <li>
                    <Title
                      size="xldr"
                      className="text-derma-primary font-light mb-4"
                    >
                      Seguimiento a 30 días
                    </Title>
                    <Text className="text-sm mb-6">
                      Disponible a partir del{' '}
                      {post30Days.format('dddd, D [de] MMMM')}
                    </Text>

                    {diagnosisData.diagnostic[1] ? (
                      <>
                        {hasDiagnosticImages(diagnosisData.diagnostic[1]) ? (
                          <DiagnosisBlock
                            user={diagnosisData.user}
                            index={1}
                            diagnosis={diagnosisData.diagnostic[1]}
                            isVisible={diagnosisData.diagnostic.length === 2}
                          />
                        ) : (
                          <UserFeedbackDiagnosis index={1} />
                        )}
                      </>
                    ) : (
                      <EmptyDiagnosis />
                    )}
                  </li>

                  <li>
                    <Title
                      size="xldr"
                      className="text-derma-primary font-light mb-4"
                    >
                      Seguimiento a 60 días
                    </Title>
                    <Text className="text-sm mb-6">
                      Disponible a partir del{' '}
                      {post60Days.format('dddd, D [de] MMMM')}
                    </Text>

                    {diagnosisData.diagnostic[2] ? (
                      <>
                        {hasDiagnosticImages(diagnosisData.diagnostic[2]) ? (
                          <DiagnosisBlock
                            user={diagnosisData.user}
                            index={2}
                            diagnosis={diagnosisData.diagnostic[2]}
                            isVisible={diagnosisData.diagnostic.length === 3}
                          />
                        ) : (
                          <UserFeedbackDiagnosis index={2} />
                        )}
                      </>
                    ) : (
                      <EmptyDiagnosis />
                    )}
                  </li>

                  <li>
                    <Title
                      size="xldr"
                      className="text-derma-primary font-light mb-4"
                    >
                      Seguimiento a 90 días
                    </Title>
                    <Text className="text-sm mb-6">
                      Disponible a partir del{' '}
                      {post90Days.format('dddd, D [de] MMMM')}
                    </Text>

                    {diagnosisData.diagnostic[3] ? (
                      <>
                        {hasDiagnosticImages(diagnosisData.diagnostic[3]) ? (
                          <DiagnosisBlock
                            user={diagnosisData.user}
                            index={3}
                            diagnosis={diagnosisData.diagnostic[3]}
                            isVisible={diagnosisData.diagnostic.length === 4}
                          />
                        ) : (
                          <UserFeedbackDiagnosis index={3} />
                        )}
                      </>
                    ) : (
                      <EmptyDiagnosis />
                    )}
                  </li>
                </ul>

                <div className="w-full md:w-1/2 bg-derma-secondary500 rounded-t-3xl p-4 py-6 md:rounded-3xl">
                  <Title
                    size="xldr"
                    className="text-derma-primary font-light mb-4 text-center md:text-left"
                  >
                    Modo de empleo
                  </Title>

                  <RoutineExplanation />
                </div>
              </Flex>
            )}
          </Container>
        </div>
      </CheckHydration>
    </DermaLayout>
  );
}
