import { Testimonial } from '@interface/testimonial';
import { isMobileSSR } from '@utils/isMobileSSR';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgByGoogle, SvgStar } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import TestimonialCard from '../common/TestimonialCard';
import FullWidthCarousel from '../product/fullWidthCarousel';
import clinicService from '@services/ClinicService';
import { ClinicReview } from '@interface/clinic';

export default async function Testimonials() {
  const reviews = await clinicService.getReviews();
  return (
    <>
      <Container className="py-12">
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-8">
          Si tú estás feliz nosotros también
        </Title>
        <Text className="text-hg-black500 mb-6 md:mb-12 md:text-lg">
          Sabemos que nada transmite más confianza que una historia real. Te
          presentamos a las personas que ya han confiado en Holaglow.
        </Text>

        <Flex className="gap-4">
          <SvgHolaglowHand className="h-[72px] w-[72px] p-4 bg-hg-secondary text-hg-primary rounded-full" />
          <Flex layout="col-left" className="gap-1">
            <Text className="font-semibold">Holaglow clinics</Text>
            <Text className="text-xs text-hg-black400">
              Basado en 83 comentarios
            </Text>
            <Flex className="gap-2 text-hg-secondary">
              <Text className="font-semibold text-lg -mb-1">4.9</Text>
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgByGoogle className="ml-8 -mb-1" />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <FullWidthCarousel
        hasDots={isMobileSSR()}
        hasControls={!isMobileSSR()}
        className="pb-12"
        visibleSlides={isMobileSSR() ? 1.2 : 3.5}
      >
        {reviews.map((review: ClinicReview | any) => {
          return (
            <TestimonialCard
              key={review.name}
              review={review}
              className="h-full flex flex-col mr-8 bg-derma-secondary300"
            />
          );
        })}
      </FullWidthCarousel>
    </>
  );
}
