'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Professional } from 'app/types/clinic';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function Professionals({
  className = '',
  isDashboard = false,
}: {
  className?: string;
  isDashboard?: boolean;
}) {
  const { clinics } = useGlobalPersistedStore(state => state);
  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  useEffect(() => {
    const professionalsWithCity = clinics.flatMap(clinic =>
      clinic.professionals.filter(professional => {
        if (professional.professionalType === 1) {
          return {
            ...professional,
            city: clinic.city,
          };
        }
      })
    );

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  if (isEmpty(professionals)) {
    return <></>;
  }

  return (
    <Container
      className={`p-0 md:px-4 gap-16   ${
        isDashboard ? '' : 'lg:flex'
      } justify-between md:mb-16 ${className}`}
    >
      <Container className="md:px-0 md:flex md:flex-col md:justify-center md:items-start">
        <Title
          isAnimated
          size="2xl"
          className="text-left font-bold mb-6 md:mb-8"
        >
          Nuestros{' '}
          <Underlined color={HOLAGLOW_COLORS['secondary']}>doctores</Underlined>
        </Title>
        <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
          En Holaglow defendemos una medicina estética que cuida y, para ello,
          la profesionalidad y la empatía son fundamentales. Todos nuestros
          doctores comparten el mismo compromiso: ponerse en tu piel, de manera
          literal y metafóricamente.
        </Text>
      </Container>
      <ProductCarousel
        visibleSlides={1}
        className="w-full"
        type="professionals"
        items={professionals}
      />
    </Container>
  );
}
