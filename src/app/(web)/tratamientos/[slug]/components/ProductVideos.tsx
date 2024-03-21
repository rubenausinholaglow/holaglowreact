'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import CheckHydration from '@utils/CheckHydration';
import { useDeviceSizeSSR } from 'app/(web)/components/layout/Breakpoint';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

import ProductVideo from './ProductVideo';

const Carousel = dynamic(() => import('designSystem/Carousel/Carousel'), {
  ssr: false,
});

export default function ProductVideos({ product }: { product: Product }) {
  const [videos, setVideos] = useState(product.videos);
  const deviceSize = useDeviceSizeSSR();

  useEffect(() => {
    if (product.videos.length < 1) {
      setVideos([
        {
          url: '/videos/pdp.mp4',
          active: true,
        },
      ]);
    }
  }, []);

  if (videos.length < 1) {
    return <></>;
  }

  return (
    <Container className="py-12 md:pt-16 md:pb-20">
      <Flex
        layout="col-left"
        className={`w-full ${
          videos.length === 1 && !deviceSize.isMobile ? 'flex-row gap-16' : ''
        }`}
      >
        <div
          className={videos.length === 1 && !deviceSize.isMobile ? 'w-1/2' : ''}
        >
          <Title size="2xl" className="font-bold mb-6">
            Holaglow lovers
          </Title>
          <Text className="hidden md:block text-hg-black500 text-lg mb-8">
            Descubre la experiencia en primera persona de pacientes que ya han
            confiado en Holaglow.
          </Text>
        </div>
        <div
          className={
            videos.length === 1 && !deviceSize.isMobile
              ? 'w-1/2 aspect-square'
              : ''
          }
        >
          <CheckHydration>
            <Carousel
              hasDots={videos.length > 1}
              dragEnabled={videos.length > 1}
              touchEnabled={videos.length > 1}
              visibleSlides={
                videos.length > 1 ? (deviceSize.isMobile ? 1 : 3) : 1
              }
              isIntrinsicHeight
              infinite={false}
              sliderStyles="md:gap-8"
            >
              {videos.map(video => {
                if (video.active) {
                  return (
                    <div
                      key={video.url}
                      className="rounded-2xl overflow-hidden"
                    >
                      <ProductVideo src={video.url} />
                    </div>
                  );
                }

                return null;
              })}
            </Carousel>
          </CheckHydration>
        </div>
      </Flex>
    </Container>
  );
}
