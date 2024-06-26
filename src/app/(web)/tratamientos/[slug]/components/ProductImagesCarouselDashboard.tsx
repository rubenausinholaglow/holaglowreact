import { isMobile } from 'react-device-detect';
import { Product } from '@interface/product';
import Carousel from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductImagesCarouselDashboard({
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
        visibleSlides={2}
        hasCounter={isMobile && product.beforeAndAfterImages?.length > 1}
        className={`md:px-0 rounded-xl aspect-[2/1] md:aspect-auto ${
          product.beforeAndAfterImages?.length < 2 && !isMobile ? 'w-1/2' : ''
        }
        `}
      >
        {product.beforeAndAfterImages
          ?.sort((a, b) => (a.urlBefore! < b.urlBefore! ? -1 : 0))
          .map(item => (
            <div className="px-4" key={item.id}>
              <div className="overflow-hidden relative aspect-[3/2.5]">
                <div className="relative aspect-[3/2.5]">
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
      {product.beforeAndAfterImages?.length <= 1 && !isMobile && (
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
