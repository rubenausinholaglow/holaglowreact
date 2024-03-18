import { fetchProducts } from '@utils/fetch';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

import ProductList from './ProductList';

async function getProducts() {
  const products = await fetchProducts({ isDerma: false });

  return products;
}

export default async function ProductsSSR() {
  const products = await getProducts();

  return (
    <div className="bg-hg-cream500 overflow-hidden pt-12 pb-4">
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-12">
          Tratamientos para conseguir resultados naturales
        </Title>
      </Container>

      <ProductList products={products} />
    </div>
  );
}
