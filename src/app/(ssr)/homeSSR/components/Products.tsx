import { fetchProducts } from '@utils/fetch';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import ProductList from './ProductList';

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

export default async function HomeProducts() {
  const products = await getProducts();

  return (
    <div className="bg-hg-cream500 overflow-hidden py-12">
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-12">
          Tratamientos para conseguir resultados{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            irresistibles
          </Underlined>
        </Title>
      </Container>

      <ProductList products={products} />
    </div>
  );
}
