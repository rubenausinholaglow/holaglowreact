'use client';

import { useEffect, useState } from 'react';
import { UpsellingData } from '@interface/upselling';
import { dermaService } from '@services/DermaService';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import Login from '../planes/components/Login';
import DiagnosisBlock from './Diagnosis';
import EmptyDiagnosis from './EmptyDiagnosis';
import ProfessionalHeader from './ProfessionalHeader';
import RoutineExplanation from './RoutineExplanation';

export default function Diagnostico() {
  const { dermaPhone } = useSessionStore(state => state);
  const [isLogged, setIsLogged] = useState(dermaPhone != '');
  const [diagnosisData, setDiagnosisData] = useState<UpsellingData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await dermaService.getDiagnosis(dermaPhone);
      setDiagnosisData(response);
      if (!isLogged) setIsLogged(true);
    };
    if (dermaPhone) fetchData();
  }, [dermaPhone]);

  if (!isLogged) {
    return <Login setIsLogged={setIsLogged} />;
  }

  console.log(diagnosisData);

  const initialDate = dayjs(diagnosisData?.creationDate);
  const post30Days = dayjs(diagnosisData?.creationDate).add(30, 'day');
  const post60Days = dayjs(diagnosisData?.creationDate).add(60, 'day');
  const post90Days = dayjs(diagnosisData?.creationDate).add(90, 'day');

  return (
    <div className="bg-derma-secondary300 min-h-screen">
      {isLogged && (
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      )}

      <DermaLayout hideButton hideFooter>
        <Container className="px-0 md:px-4">
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
                      diagnosis={diagnosisData.diagnostic[0]}
                    />
                  )}
                </li>

                <li>
                  <Title
                    size="xldr"
                    className="text-derma-primary font-light mb-4"
                  >
                    Diagnóstico a 30 días
                  </Title>
                  <Text className="text-sm mb-6">
                    Disponible a partir del{' '}
                    {post30Days.format('dddd, D [de] MMMM')}
                  </Text>

                  {/* {diagnosisData?.diagnostic.length > 1 && (
                    <DiagnosisBlock
                      user={diagnosisData.user}
                      diagnosis={diagnosisData.diagnostic[1]}
                    />
                  )} */}

                  {!dayjs().isAfter(post30Days) ? (
                    <Flex className="flex flex-col items-start p-4 bg-white md:border border-derma-secondary400 rounded-3xl">
                      <ProfessionalHeader
                        diagnosis={diagnosisData.diagnostic[0]}
                      />
                      <div className="text-sm">
                        <Text className="text-derma-primary mb-4 font-semibold">
                          Hola {diagnosisData.user.firstName},
                        </Text>

                        <Text className="mb-4">
                          Ya puedes subir las 3 fotos de la evolución de tu
                          rostro en detalle frontal y perfil de ambos lados.
                        </Text>

                        <Button
                          className="w-full"
                          type="derma"
                          size="xl"
                          href={`${ROUTES.derma.diagnostico.check30}?diagnosisId=${diagnosisData.diagnostic[1].id}`}
                        >
                          Empezar ahora
                          <SvgArrow className="ml-4" />
                        </Button>
                      </div>
                    </Flex>
                  ) : (
                    <EmptyDiagnosis />
                  )}
                </li>

                <li>
                  <Title
                    size="xldr"
                    className="text-derma-primary font-light mb-4"
                  >
                    Diagnóstico a 60 días
                  </Title>
                  <Text className="text-sm mb-6">
                    Disponible a partir del{' '}
                    {post60Days.format('dddd, D [de] MMMM')}
                  </Text>
                  <EmptyDiagnosis />
                </li>

                <li>
                  <Title
                    size="xldr"
                    className="text-derma-primary font-light mb-4"
                  >
                    Diagnóstico a 90 días
                  </Title>
                  <Text className="text-sm mb-6">
                    Disponible a partir del{' '}
                    {post90Days.format('dddd, D [de] MMMM')}
                  </Text>

                  <EmptyDiagnosis />
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
      </DermaLayout>
    </div>
  );
}
