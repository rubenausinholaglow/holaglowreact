import { Product } from '@interface/product';
import CheckHydration from '@utils/CheckHydration';
import { isMobileSSR } from '@utils/isMobileSSR';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('designSystem/Carousel/Carousel'), {
  ssr: false,
});

export default function ProductVideos({
  product,
  videos,
}: {
  product?: Product;
  videos?: { url: string; active: boolean }[];
}) {
  const genericVideo = { url: 'yoFtEyG3Lgc', active: true };

  const finalVideos = product?.videos || videos || [];

  if (!finalVideos.find(video => video.url === genericVideo.url)) {
    finalVideos.push(genericVideo as any);
  }

  console.log(videos);

  if (finalVideos.length < 0) {
    return <></>;
  }

  return (
    <Container className="px-0 md:px-4 py-12 md:py-16">
      <Flex
        layout="col-left"
        className={`w-full ${
          finalVideos.length <= 1 && !isMobileSSR() ? 'flex-row gap-16' : ''
        }`}
      >
        <div
          className={
            finalVideos.length <= 1 && !isMobileSSR() ? 'w-1/2 px-4' : 'px-4'
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
          className={
            finalVideos.length <= 1 && !isMobileSSR() ? 'w-1/3' : 'w-full'
          }
        >
          <CheckHydration>
            <Carousel
              hasControls={
                (isMobileSSR() && finalVideos.length > 1) ||
                (!isMobileSSR() && finalVideos.length > 3)
              }
              dragEnabled={
                (isMobileSSR() && finalVideos.length > 1) ||
                (!isMobileSSR() && finalVideos.length > 3)
              }
              touchEnabled={
                (isMobileSSR() && finalVideos.length > 1) ||
                (!isMobileSSR() && finalVideos.length > 3)
              }
              visibleSlides={
                finalVideos.length > 1 ? (isMobileSSR() ? 1.2 : 3) : 1
              }
              isIntrinsicHeight
              infinite={false}
              sliderStyles="md:gap-8"
              controlstyles="px-4"
            >
              {finalVideos.map(video => {
                if (video.active) {
                  const videoId = video.url.split('/').pop();

                  return (
                    <div key={video.url} className="px-4 w-full">
                      <iframe
                        width={
                          isMobileSSR() && finalVideos.length > 1
                            ? '100%'
                            : '315'
                        }
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
        </div>
      </Flex>
    </Container>
  );
}
