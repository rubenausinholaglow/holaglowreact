import { Product } from '@interface/product';
import CheckHydration from '@utils/CheckHydration';
import { isMobileSSR } from '@utils/isMobileSSR';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

import ProductVideo from './ProductVideo';

const Carousel = dynamic(() => import('designSystem/Carousel/Carousel'), {
  ssr: false,
});

export default function ProductVideos({ product }: { product: Product }) {
  const defaultVideos = [
    {
      url: '/videos/pdp.mp4',
      active: true,
    },
  ];

  const videos = product?.videos ? product.videos : defaultVideos;

  if (videos.length < 0) {
    return <></>;
  }

  console.log(videos);

  return (
    <Container className="px-0 md:px-4 py-12 md:py-16">
      <Flex
        layout="col-left"
        className={`w-full ${
          videos.length <= 1 && !isMobileSSR() ? 'flex-row gap-16' : ''
        }`}
      >
        <div
          className={
            videos.length <= 1 && !isMobileSSR() ? 'w-1/2 px-4' : 'px-4'
          }
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
          className={videos.length <= 1 && !isMobileSSR() ? 'w-1/3' : 'w-full'}
        >
          <CheckHydration>
            <Carousel
              hasDots={
                (isMobileSSR() && videos.length > 1) ||
                (!isMobileSSR() && videos.length > 3)
              }
              dragEnabled={
                (isMobileSSR() && videos.length > 1) ||
                (!isMobileSSR() && videos.length > 3)
              }
              touchEnabled={
                (isMobileSSR() && videos.length > 1) ||
                (!isMobileSSR() && videos.length > 3)
              }
              visibleSlides={videos.length > 1 ? (isMobileSSR() ? 1 : 3) : 1}
              isIntrinsicHeight
              infinite={false}
              sliderStyles="md:gap-8"
            >
              {videos.map(video => {
                if (video.active) {
                  const videoId = video.url.split('/').pop();

                  return (
                    <div key={video.url} className="px-4 w-full">
                      <iframe
                        width="100%"
                        height="560"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="rounded-3xl overflow-hidden"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </Carousel>
          </CheckHydration>
          {videos.length == 0 && (
            <iframe
              width="315"
              height="560"
              src="https://www.youtube.com/embed/yoFtEyG3Lgc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-3xl overflow-hidden"
            />
          )}
        </div>
      </Flex>
    </Container>
  );
}
