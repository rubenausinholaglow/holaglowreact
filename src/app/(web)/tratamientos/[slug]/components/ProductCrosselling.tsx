import { Product } from 'app/types/product';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

const FullWidthCarousel = dynamic(
  () => import('app/(web)/components/product/fullWidthCarousel')
);

export default function ProductCrosselling({ product }: { product: Product }) {
  const relatedProducts = product?.relatedProducts?.map(obj => ({
    ...obj.product,
    visibility: true,
  }));

  if (product.relatedProducts?.length === 0) {
    return <></>;
  }

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
