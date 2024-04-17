import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import Diagnosis from './Diagnosis';
import FirstDiagnosis from './FirstDiagnosis';
import RoutineExplanation from './RoutineExplanation';

const DIAGNOSIS = [
  {
    images: [
      '/images/derma/multistep/Basart.png',
      '/images/derma/multistep/Basart.png',
      '/images/derma/multistep/Basart.png',
    ],
    professional: {
      name: 'Dr. Sonsoles Espí',
      imgSrc: '/images/derma/home/professionals/Sonsoles.png',
    },
    date: new Date('2024-04-17'),
    user: {
      name: 'Perico',
      surname: 'de los',
      secondSurname: 'palotes',
    },
    receipt: {
      expeditionDate: new Date('2024-04-27'),
      link: 'https://www.derma.holaglow.com',
    },
  },
];

export default function Diagnostico() {
  return (
    <div className="bg-derma-secondary300 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <Container className="px-0 md:px-4">
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 pt-4"
          >
            <ul className="w-full md:w-1/2 flex flex-col gap-8 px-4 md:px-0">
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

                <FirstDiagnosis data={DIAGNOSIS[0]} />
              </li>

              <li>
                <Title
                  size="xldr"
                  className="text-derma-primary font-light mb-4"
                >
                  Diagnóstico a 30 días
                </Title>
                <Text className="text-sm mb-6">
                  Disponible a partir del [date]
                </Text>
                <Diagnosis data={DIAGNOSIS[1] || {}} />
              </li>

              <li>
                <Title
                  size="xldr"
                  className="text-derma-primary font-light mb-4"
                >
                  Diagnóstico a 60 días
                </Title>
                <Text className="text-sm mb-6">
                  Disponible a partir del [date]
                </Text>
                <Diagnosis data={DIAGNOSIS[2] || {}} />
              </li>

              <li>
                <Title
                  size="xldr"
                  className="text-derma-primary font-light mb-4"
                >
                  Diagnóstico a 90 días
                </Title>
                <Text className="text-sm mb-6">
                  Disponible a partir del [date]
                </Text>
                <Diagnosis data={DIAGNOSIS[3] || {}} />
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
        </Container>
      </DermaLayout>
    </div>
  );
}
