import ROUTES from '@utils/routes';
import { SvgArrow, SvgUserSquare } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import ProfessionalHeader from './ProfessionalHeader';

export default function UserFeedbackDiagnosis({
  diagnosisData,
}: {
  diagnosisData: any;
}) {
  console.log(diagnosisData);

  return (
    <Flex className="flex flex-col items-start p-4 bg-white md:border border-derma-secondary400 rounded-3xl">
      <ProfessionalHeader diagnosis={diagnosisData.diagnostic[0]} />
      <div className="text-sm">
        <Text className="text-derma-primary mb-4 font-semibold">
          Hola {diagnosisData.user.firstName},
        </Text>

        <Text className="mb-4">
          Ya puedes subir las 3 fotos de la evolución de tu rostro en detalle
          frontal y perfil de ambos lados.
        </Text>

        <Button
          className="w-full"
          type="derma"
          size="xl"
          href={`${ROUTES.derma.diagnostico.check30}?diagnosticId=${diagnosisData.diagnostic[1].id}`}
        >
          Empezar ahora
          <SvgArrow className="ml-4" />
        </Button>
      </div>
    </Flex>
  );
}
