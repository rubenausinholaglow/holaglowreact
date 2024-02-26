'use client';

import CheckHydration from '@utils/CheckHydration';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

import TestimonialsCarousel from './TestimonialsCarousel';

export default function Testimonials() {
  return (
    <CheckHydration>
      <Container className="py-12">
        <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-8">
          Si tú estás{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>feliz</Underlined>,
          nosotros también
        </Title>
        <Text className="text-hg-black500 mb-6 md:mb-12">
          Sabemos que nada transmite más confianza que una historia real. Te
          presentamos a las personas que ya han confiado en Holaglow.
        </Text>

        <TestimonialsCarousel />
      </Container>
    </CheckHydration>
  );
}
