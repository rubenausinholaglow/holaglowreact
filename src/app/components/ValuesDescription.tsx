import { Container, Flex } from 'components/Layouts/Layouts';
import { Text } from 'components/Texts';
import Image from 'next/image';

const VALUES = [
  { name: 'Tus reglas' },
  { name: 'Sin Cirugía' },
  { name: 'Resultados Reales' },
  { name: 'Tu brillo' },
];

export default function ValuesDescription() {
  return (
    <Container className="mb-12">
      <Flex layout="row-center" className="gap-4 items-center">
        <Flex layout="col-right" className="w-1/2 max-w-[500px]">
          <Text className="text-[64px] leading-[72px] font-bold  mb-4">
            Di adiós a los prejuicios
          </Text>
          <Text size="xl" className="text-hg-gray-200">
            Defiende tu propia idea de belleza con tratamientos eficaces para
            conseguir los objetivos que tú quieras
          </Text>
        </Flex>
        <div className="w-1/2 relative aspect-[3/2] max-w-[500px]">
          <Image
            src="/images/fakeImages/Home/prejuiciosValue.png"
            alt="prejuicios"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </Flex>
    </Container>
  );
}
