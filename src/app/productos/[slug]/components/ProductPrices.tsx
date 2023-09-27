import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

export default function ProductPrices({ product }: { product: Product }) {
  return (
    <div className="bg-gradient from-hg-secondary500 to-hg-primary300">
      <Container className="py-12">
        <Flex layout="col-left" className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6">
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              Personaliza
            </Underlined>{' '}
            tu experiencia
          </Title>
          <Text className="text-hg-black500 mb-8">
            Podrás presumir del cambio el mismo día y observarás el resultado
            óptimo a las dos semanas.
          </Text>

          <Flex className="bg-white px-6 py-16 rounded-2xl w-full">
            <Text>Work in progres...</Text>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
