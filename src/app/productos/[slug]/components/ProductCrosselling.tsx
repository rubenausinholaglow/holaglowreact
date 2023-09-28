import { useEffect } from 'react';
import { Product } from '@interface/product';
import ProductCarousel from 'app/components/product/ProductCarousel';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function ProductCrosselling({ product }: { product: Product }) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { filteredProducts, setFilteredProducts } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    if (isEmpty(filteredProducts)) {
      setFilteredProducts(stateProducts);
    }
  }, [stateProducts]);

  if (isEmpty(filteredProducts)) {
    return <></>;
  }

  return (
    <Container>
      <Title size="2xl" className="font-bold mb-8 md:mb-12">
        Tratamientos que también te{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>
          pueden interesar
        </Underlined>
      </Title>
      <ProductCarousel type="products" items={filteredProducts} />
    </Container>
  );
}
