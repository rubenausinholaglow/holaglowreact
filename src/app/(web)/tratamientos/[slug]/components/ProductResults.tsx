'use client';

import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Product } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

const Carousel = dynamic(() => import('designSystem/Carousel/Carousel'), {
  ssr: false,
});

export default function ProductResults({ product }: { product: Product }) {
  if (product.beforeAndAfterImages?.length === 0) {
    return <></>;
  }
  const metaData: {
    contentUrl: string | undefined;
    creator: string;
    creditText: string;
    copyrightNotice: string;
    license: string;
  }[] = [];
  product.beforeAndAfterImages.forEach(x => {
    metaData.push({
      contentUrl: x.urlBefore,
      creator: 'Holaglow',
      creditText: 'Holaglow',
      copyrightNotice: 'Glow Lab SL',
      license: 'https://www.holaglow.com/aviso-legal',
    });
  });

  return (
    <Container className="p-0 pt-8 md:px-4 md:flex gap-16 justify-between mb-12 md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <div className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6 mt-8">
            Consigue el{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              resultado
            </Underlined>{' '}
            que deseas
          </Title>
          <Text className="text-hg-black500 mb-4 md:text-lg">
            Podrás presumir del cambio el mismo día y observarás el resultado
            óptimo a las dos semanas.
          </Text>
        </div>
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
  );
}
