import { Product } from '@interface/product';
import { isMobileSSR } from '@utils/isMobileSSR';
import Carousel from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductImagesCarousel({
  product,
}: {
  product: Product;
}) {
  return (
    <Flex className="w-full md:gap-16 items-start">
      <Carousel
        controlstyles="px-4"
        hasControls={product.beforeAndAfterImages?.length > 1}
        dragEnabled={product.beforeAndAfterImages?.length > 1}
        touchEnabled={product.beforeAndAfterImages?.length > 1}
        visibleSlides={
          product.beforeAndAfterImages?.length > 1 ? (isMobileSSR() ? 1 : 3) : 1
        }
        hasCounter={isMobileSSR() && product.beforeAndAfterImages?.length > 1}
        className={`md:px-0 rounded-xl aspect-square md:aspect-auto ${
          product.beforeAndAfterImages?.length < 2 && !isMobileSSR()
            ? 'w-1/2'
            : ''
        }
        `}
      >
        {product.beforeAndAfterImages
          ?.sort(function x(a, b) {
            return a.urlBefore!.localeCompare(b.urlBefore!, undefined, {
              numeric: true,
              sensitivity: 'base',
            });
          })
          .map(item => (
            <div className="px-4" key={item.id}>
              <div className="overflow-hidden relative aspect-square">
                <div className="relative aspect-square">
                  <div itemScope itemType="https://schema.org/ImageObject">
                    <Image
                      src={item.urlBefore || ''}
                      alt={'antes y despues ' + product.title}
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
            </div>
          ))}
      </Carousel>
      {product.beforeAndAfterImages?.length <= 1 && !isMobileSSR() && (
        <div className="w-1/2">
          <Title size="2xl" className="text-left font-bold mb-4">
            Consigue el resultado que deseas
          </Title>
          <Text className="text-hg-black500 md:text-lg mb-8">
            Podrás presumir del cambio el mismo día y observarás el resultado
            óptimo a las dos semanas.
          </Text>
        </div>
      )}
    </Flex>
  );
}
