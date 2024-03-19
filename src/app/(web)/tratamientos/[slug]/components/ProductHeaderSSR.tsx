import CategoryIcon from 'app/(web)/components/common/CategoryIcon';
import { Product } from 'app/types/product';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductHeaderSSR({ product }: { product: Product }) {
  const validTypes = [3, 6, 7, 8];

  return (
    <div className="pb-12">
      <Container className="p-0 md:px-4 md:gap-16 justify-between md:mb-16 flex flex-col md:flex-row">
        <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start mb-8">
          <Title size="2xl" className="text-left font-bold mb-4">
            {product.title}
          </Title>

          {validTypes.includes(product.type) ? (
            <p
              className="text-hg-black500 mb-4"
              dangerouslySetInnerHTML={{
                __html: product?.extraInformation?.resultDescription,
              }}
            />
          ) : (
            <Text className="text-hg-black500 mb-4">
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
        <div className="md:w-1/2">
          <Carousel
            hasControls={product.beforeAndAfterImages?.length > 1}
            dragEnabled={true}
            touchEnabled={true}
            hasCounter
            className="px-4 md:px-0 rounded-xl aspect-square"
          >
            {product.beforeAndAfterImages
              ?.sort((a, b) => (a.urlBefore! < b.urlBefore! ? -1 : 0))
              .map(item => (
                <div key={item.id} className="overflow-hidden relative">
                  <div className="relative aspect-square">
                    <div itemScope itemType="https://schema.org/ImageObject">
                      <Image
                        src={item.urlBefore || ''}
                        alt={'antes y despues' + product.title}
                        fill
                        className="object-cover rounded-3xl"
                      />
                      <span className="hidden" itemProp="license">
                        https://www.holaglow.com/aviso-legal
                      </span>
                      <span className="hidden" itemProp="contentUrl">
                        {item.urlBefore}
                      </span>
                      <span
                        className="hidden"
                        itemProp="creator"
                        itemType="https://schema.org/Organization"
                        itemScope
                      >
                        <meta itemProp="name" content="Holaglow" />
                      </span>
                      <span className="hidden" itemProp="creditText">
                        Holaglow
                      </span>
                      <span className="hidden" itemProp="copyrightNotice">
                        Glow Lab SL
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </Container>
      {product.type === 3 && (
        <Container>
          <p
            className="mb-16 text-hg-black500 mb-4 mt-8"
            dangerouslySetInnerHTML={{
              __html: product?.detail,
            }}
          />
        </Container>
      )}
    </div>
  );
}
