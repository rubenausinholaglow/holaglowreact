import CategoryIcon from 'app/(web)/components/common/CategoryIcon';
import { Product } from 'app/types/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import ProductHeaderImage from './ProductHeaderImage';

export default function ProductHeaderSSR({ product }: { product: Product }) {
  console.log(product);

  const validTypes = [3, 6, 7, 8];

  return (
    <>
      <Container className="p-0 md:px-4 gap-4 md:gap-16 justify-between md:mb-16 flex flex-col md:flex-row">
        <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <Title size="2xl" className="text-left font-bold mb-4">
            {product.title}
          </Title>

          {validTypes.includes(product.type) ? (
            <Text className="text-hg-black500 mb-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.extraInformation?.resultDescription,
                }}
              />
            </Text>
          ) : (
            <Text className="text-hg-black500 mb-4">
              {product.extraInformation?.resultDescription}
            </Text>
          )}

          <Flex className="gap-2">
            {product.category.map(category => {
              return (
                <Button
                  key={category.name}
                  type="white"
                  customStyles="border-none pl-1 mb-8"
                >
                  <CategoryIcon category={category.name} className="mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </Flex>
        </Container>
        <div className="md:w-1/2">
          <ProductHeaderImage product={product} />
        </div>
      </Container>
      {product.type === 3 && (
        <Container>
          <Text isAnimated className="text-hg-black500 mb-4 mt-8">
            <p
              className="mb-16"
              dangerouslySetInnerHTML={{
                __html: product?.detail,
              }}
            />
          </Text>
        </Container>
      )}
    </>
  );
}
