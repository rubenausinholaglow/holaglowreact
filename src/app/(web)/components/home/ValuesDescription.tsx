import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ValuesDescription() {
  return (
    <Container className="py-12 overflow-hidden">
      <Flex
        layout="col-left"
        className="gap-4 items-center relative md:justify-center md:flex-row"
      >
        <Flex layout="col-left" className="relative z-10 md:w-1/2">
          <Title size="2xl" className="font-bold mb-6">
            Di hola a tu mejor versión
          </Title>
          <Text className="text-hg-black500 md:text-lg mb-4">
            Consigue los resultados que quieres con nuestros tratamientos
            personalizados de medicina estética.
          </Text>
        </Flex>

        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[34/29]">
            <Image
              src="/images/home/prejuiciosValue.png"
              alt="prejuicios"
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      </Flex>
    </Container>
  );
}
