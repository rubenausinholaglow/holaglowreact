import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function UserFeedbackDiagnosis({ index }: { index: number }) {
  return (
    <Flex className="flex flex-col items-start p-4 bg-white md:border border-derma-secondary400 rounded-3xl">
      <div className="text-sm">
        <Text className="text-derma-primary mb-4 font-semibold">
          Seguimiento a los {index * 30} días
        </Text>

        <Text className="mb-4">
          Sube 3 fotos de tu rostro y te enviaré mis comentarios y una
          valoración de tu evolución.
        </Text>

        <Button
          className="w-full"
          type="derma"
          size="lg"
          href={`${ROUTES.derma.diagnostico.seguimiento}?index=${index}`}
        >
          Empezar ahora
          <SvgArrow className="ml-4" />
        </Button>
      </div>
    </Flex>
  );
}
