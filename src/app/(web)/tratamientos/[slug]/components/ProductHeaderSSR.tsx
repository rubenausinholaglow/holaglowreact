import CategoryIcon from 'app/(web)/components/common/CategoryIcon';
import { Product } from 'app/types/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import ProductInfoSSR from './ProductInfoSSR';

const ProductImagesCarousel = dynamic(() => import('./ProductImagesCarousel'), {
  ssr: false,
});

export default function ProductHeaderSSR({ product }: { product: Product }) {
  const validTypes = [3, 6, 7, 8];

  return (
    <div className="md:pt-4 md:pb-12">
      <Container className="p-0 md:px-4 md:gap-16 justify-between grid md:grid-cols-2">
        <Container className="pb-6 md:pb-0 md:px-0 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2">
          <Title size="2xl" className="text-left font-bold mb-4">
            {product.title}
          </Title>

          {validTypes.includes(product.type) ? (
            <p
              className="text-hg-black500 md:text-lg md: mb-8"
              dangerouslySetInnerHTML={{
                __html: product?.extraInformation?.resultDescription,
              }}
            />
          ) : (
            <Text className="text-hg-black500 md:text-lg md: mb-8">
              {product.extraInformation?.resultDescription}
            </Text>
          )}

          <Flex className="gap-2">
            {product.category?.map(category => {
              return (
                <Button
                  key={category.name}
                  type="white"
                  customStyles="border-none pl-1"
                >
                  <CategoryIcon category={category.name} className="mr-2" />
                  <Text className="text-xs">{category.name}</Text>
                </Button>
              );
            })}
          </Flex>
        </Container>
        {product.beforeAndAfterImages.length > 0 && (
          <div className="mb-6 md:mb-0 md:row-start-2 md:col-start-1 md:col-end-3">
            <ProductImagesCarousel product={product} />
          </div>
        )}
        <ProductInfoSSR product={product} />
      </Container>

      {product.type === 3 && (
        <Container>
          <p
            className="text-hg-black500 mb-4 mt-8"
            dangerouslySetInnerHTML={{
              __html: product?.detail,
            }}
          />
        </Container>
      )}
    </div>
  );
}
