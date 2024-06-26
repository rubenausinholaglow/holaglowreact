import CheckHydration from '@utils/CheckHydration';
import BlogShareBar from 'app/(web)/blog/components/BlogShareBar';
import { Product } from 'app/types/product';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

const ProductPriceCard = dynamic(() => import('./ProductPriceCard'), {
  ssr: false,
});

const PVCard = dynamic(() => import('./PVCard'), { ssr: false });

const ProductSessionPriceCard = dynamic(
  () => import('./ProductSessionPriceCard'),
  { ssr: false }
);

export default function ProductPricesSSR({ product }: { product: Product }) {
  const headersList = headers();

  function groupProductsByTitle(arr: Product[]) {
    const groupedArray: { [key: string]: Product[] } = {};

    productItems.forEach((product: Product) => {
      const title = product.title
        .replace(/ x[36]$/, '')
        .replace(' básico', '')
        .toLowerCase();

      if (!groupedArray[title]) {
        groupedArray[title] = [];
      }

      groupedArray[title].push(product);
    });

    return Object.values(groupedArray);
  }

  let productItems: Product[] = [];
  let isSessionProduct = false;
  let groupedSessionProducts: Product[][] | null = [];

  if (product.upgrades) {
    product.upgrades = product.upgrades.sort((x, y) => x.order - y.order);
    const allProducts = product.upgrades.map(item => item.product);
    productItems = allProducts;
  }

  if (productItems.length > 1) {
    isSessionProduct = productItems
      .map((item: Product) => item.title)
      .every(
        (item: string) =>
          item.toLowerCase().includes(product.title.toLowerCase()) &&
          product.title.indexOf('Pack Wellaging') < 0 &&
          product.title.indexOf('Armonización facial') < 0 &&
          product.title.indexOf('Pack Lifting') < 0
      );
  }

  if (isSessionProduct) {
    const groupedArrays: Product[][] = groupProductsByTitle(productItems);

    if (groupedArrays.length !== productItems.length) {
      groupedSessionProducts = groupedArrays;
    }
  }

  return (
    <div
      className="bg-gradient from-derma-secondary500 to-derma-secondary100"
      id="prices"
    >
      <Container className="py-12">
        {product.isPack && productItems.length > 1 && (
          <Title size="2xl" className="font-bold mb-6 md:mb-12">
            Elige tu pack
          </Title>
        )}
        {!(product.isPack && productItems.length > 1) && (
          <Title size="2xl" className="font-bold mb-6 md:mb-12">
            Elige tu experiencia
          </Title>
        )}

        <CheckHydration>
          <Flex
            layout="col-left"
            className="md:flex-row gap-8 md:items-stretch"
          >
            {!isSessionProduct &&
              (product.isPack && productItems.length > 1 ? (
                productItems.map((item: Product, index: number) => (
                  <ProductPriceCard
                    key={item.title}
                    product={item}
                    parentProduct={product}
                  />
                ))
              ) : (
                <>
                  <ProductPriceCard
                    product={productItems[0]}
                    parentProduct={product}
                  />
                  <PVCard />
                </>
              ))}

            {isSessionProduct && isEmpty(groupedSessionProducts) && (
              <ProductSessionPriceCard productItems={productItems} />
            )}

            {isSessionProduct && !isEmpty(groupedSessionProducts) && (
              <Flex
                layout="col-left"
                className="w-full gap-4 md:gap-8 md:flex-row"
              >
                {groupedSessionProducts?.map((products, productIndex) => (
                  <ProductSessionPriceCard
                    isGroupedSessionProduct
                    key={productIndex}
                    productItems={products}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        </CheckHydration>

        {/* {isSessionProduct && isEmpty(groupedSessionProducts) && (
          <Flex layout="col-left" className="md:flex-row md:gap-8">
            <Flex
              layout="col-left"
              className="bg-white p-3 md:p-0 rounded-2xl w-full shadow-centered-secondary md:bg-transparent md:shadow-none"
            >
              <Text className="p-3 font-semibold md:hidden">
                {product.title}
              </Text>

              <Flex
                layout="col-left"
                className="gap-4 p-3 w-full md:flex-row md:gap-12"
              >
                {productItems.map((item: Product, index: number) => {
                  if (item.price > 0) {
                    return (
                      <ProductSessionPriceCard
                        key={item.title}
                        product={item}
                        index={index}
                      />
                    );
                  }
                })}
              </Flex>
            </Flex>
          </Flex>
        )}

        {isSessionProduct && !isEmpty(groupedSessionProducts) && (
          <Flex
            layout="col-left"
            className="w-full gap-4 md:gap-12 md:flex-row"
          >
            {groupedSessionProducts?.map((products, productIndex) => (
              <Flex
                layout="col-left"
                className="w-full md:flex-row md:gap-8"
                key={`productGroup-${productIndex}`}
              >
                <Flex
                  layout="col-left"
                  className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary "
                >
                  <Text className="p-3 font-semibold md:text-lg">
                    {products[0].title}
                  </Text>

                  <Flex layout="col-left" className="gap-4 w-full">
                    {products.map((item: Product, index: number) => {
                      if (item.price > 0) {
                        return (
                          <ProductSessionGroupedPriceCard
                            key={`product-card-${index}`}
                            product={item}
                          />
                        );
                      }
                      return null;
                    })}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        )} */}
        <Flex layout="row-center" className="pt-4">
          <BlogShareBar
            title={product.title}
            text={product.description}
            url={`http://www.holaglow.com/${headersList.get('next-url') || ''}`}
          />
        </Flex>
      </Container>
    </div>
  );
}
