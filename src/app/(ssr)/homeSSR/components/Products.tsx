import { fetchProducts } from '@utils/fetch';
import { SvgArrow } from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import ProductList from './ProductList';

/* async function getProducts() {
  console.log()

  const products = await fetchProducts();

  return products;
} */

async function getProducts() {
  const products = await fetch(
    'https://holaglowproductsapidev.azurewebsites.net/Product'
  );

  return products.json();
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
          <span className="inline-block ml-2 lg:ml-4 translate-y-1">
            <span className="inline-block bg-hg-black rounded-full h-[30px] w-[30px] lg:h-[44px] lg:w-[44px] p-[6px] lg:p-[10px]">
              <SvgArrow
                height={24}
                width={24}
                className="rotate-45 text-hg-primary h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]"
              />
            </span>
          </span>
        </Title>
      </Container>

      <ProductList products={products} />
    </div>
  );
}
