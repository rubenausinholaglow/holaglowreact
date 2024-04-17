import ROUTES from '@utils/routes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function GuaranteedResults({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Container className={`pb-12 ${className}`}>
      <Flex className="w-full gap-4 p-4 bg-derma-secondary400 rounded-2xl">
        <Image
          src="/images/derma/landingPrecios/guaranteedResults.svg"
          alt="resultados garantizados"
          height={72}
          width={72}
          className="shrink-0"
        />
        <div>
          <Text className="font-semibold mb-1">Mejor piel en 90 días*</Text>
          <Text className="text-sm md:text-md">
            Prueba tu rutina siguiendo las indicaciones del médico y si en 3
            meses no ves una mejora, te devolvemos el dinero. Consulta{' '}
            <a href={ROUTES.statics.termsAndConditions}>las condiciones</a>
          </Text>
        </div>
      </Flex>
    </Container>
  );
}
