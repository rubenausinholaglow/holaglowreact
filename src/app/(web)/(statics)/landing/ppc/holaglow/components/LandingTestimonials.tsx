'use client';

import { ClinicReview } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import TestimonialCard from 'app/(web)/components/common/TestimonialCard';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { Testimonial } from 'app/types/testimonial';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

export default async function LandingTestimonials() {
  const reviews = await clinicService.getReviews();
  return (
    <>
      <Container>
        <Title isAnimated size="2xl" className="font-bold mb-4">
          ¿Qué dicen de{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>nosotros</Underlined>?
        </Title>
      </Container>
      <AnimateOnViewport>
        <FullWidthCarousel className="pb-8">
          {reviews.map((review: ClinicReview | any) => {
            return (
              <TestimonialCard
                key={review.name}
                review={review}
                className="h-full flex flex-col mr-4"
              />
            );
          })}
        </FullWidthCarousel>
      </AnimateOnViewport>
    </>
  );
}
