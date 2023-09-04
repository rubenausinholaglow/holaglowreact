import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ValuesDescription() {
  return (
    <Container className="mb-12">
      <Flex layout="row-center" className="gap-4 items-center">
        <Flex layout="col-right" className="w-1/2">
          <Title size="2xl" className="font-bold mb-4 pr-16">
            La belleza es lo que te dé la gana
          </Title>
          <Text size="lg" className="text-hg-gray-200">
            Di adiós a los prejuicios y defiende tu propia idea de belleza con
            tratamientos eficaces para conseguir los objetivos que tú quieras.
          </Text>
        </Flex>
        <div className="w-1/2 relative aspect-square">
          <Image
            src="/images/home/prejuiciosValue.png"
            alt="prejuicios"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </Flex>
    </Container>
  );
}
