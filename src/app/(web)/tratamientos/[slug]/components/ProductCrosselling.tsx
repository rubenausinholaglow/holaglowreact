import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { Product } from 'app/types/product';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function ProductCrosselling({ product }: { product: Product }) {
  const relatedProducts = product?.relatedProducts?.map(obj => ({
    ...obj.product,
    visibility: true,
  }));

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
