import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import RoutineItems from './RoutineItems';

export default function BenefitsApplicationResultsDerma({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`py-12 bg-derma-primary100 ${className}`}>
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Una rutina minimalista
        </Title>
        <Text className="text-hg-black500 mb-8 md:text-lg">
          Lo que tu piel necesita. Nada más. Nada menos.
        </Text>
        <RoutineItems />
      </Container>
    </div>
  );
}
