import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function UserFeedbackDiagnosis({
  diagnosisData,
  index,
}: {
  diagnosisData: any;
  index: number;
}) {
  return (
    <Flex className="flex flex-col items-start p-4 bg-white md:border border-derma-secondary400 rounded-3xl">
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
          href={`${ROUTES.derma.diagnostico.seguimiento}?index=${index}`}
        >
          Empezar ahora
          <SvgArrow className="ml-4" />
        </Button>
      </div>
    </Flex>
  );
}
