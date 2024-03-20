'use client';

import { Product } from '@interface/product';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import Carousel from 'designSystem/Carousel/Carousel';
import Image from 'next/image';

export default function ProductImagesCarousel({
  product,
}: {
  product: Product;
}) {
  return (
    <Carousel
      hasControls={product.beforeAndAfterImages?.length > 1}
      dragEnabled={true}
      touchEnabled={true}
      visibleSlides={isMobile() ? 1 : 3}
      hasCounter={isMobile()}
      className="px-4 md:px-0 rounded-xl aspect-square md:aspect-auto "
      sliderStyles="md:gap-8"
    >
      {product.beforeAndAfterImages
        ?.sort((a, b) => (a.urlBefore! < b.urlBefore! ? -1 : 0))
        .map((item, index) => (
          <div key={item.id} className="overflow-hidden relative aspect-square">
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
  );
}
