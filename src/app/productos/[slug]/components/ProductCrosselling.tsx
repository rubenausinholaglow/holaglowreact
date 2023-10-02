import { Product } from '@interface/product';
import FullWidthCarousel from 'app/components/product/fullWidthCarousel';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

export default function ProductCrosselling({ product }: { product: Product }) {
  const relatedProducts = product?.relatedProducts.map(obj => ({
    ...obj.product,
    visibility: true,
  }));

  return (
    <>
      <Container>
        <Title size="2xl" className="font-bold mb-8 md:mb-12">
          Tratamientos que también te{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            pueden interesar
          </Underlined>
        </Title>
      </Container>
      <FullWidthCarousel type="products" items={relatedProducts} />
    </>
  );
}
