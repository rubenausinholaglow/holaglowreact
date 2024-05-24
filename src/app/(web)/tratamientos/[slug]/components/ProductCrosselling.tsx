import { fetchProducts } from '@utils/fetch';
import { Product } from 'app/types/product';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

const FullWidthCarousel = dynamic(
  () => import('app/(web)/components/product/fullWidthCarousel')
);

export default async function ProductCrosselling({
  product,
}: {
  product: Product;
}) {
  async function getProducts() {
    const products = await fetchProducts({ isDerma: false });

    return products;
  }
  let relatedProducts = await getProducts();
  relatedProducts = relatedProducts.filter(x => x.id != product.id);
  return (
    <>
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-2">
          Tratamientos que también te pueden interesar
        </Title>
      </Container>
      <FullWidthCarousel type="products" items={relatedProducts} />
    </>
  );
}
