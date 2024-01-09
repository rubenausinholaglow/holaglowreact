'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Professional } from 'app/types/clinic';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import ProfessionalCard from './ProfessionalCard';

export default function ProfessionalsDerma({
  className = '',
  isDashboard = false,
}: {
  className?: string;
  isDashboard?: boolean;
}) {
  const { clinics } = useGlobalPersistedStore(state => state);
  const { deviceSize } = useSessionStore(state => state);
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
      className={`p-0 md:px-4 gap-16 ${
        isDashboard ? '' : 'md:flex'
      } justify-between md:mb-16 ${className}`}
    >
      <Container
        className={`${
          isDashboard ? '' : 'md:w-1/2'
        } md:px-0 md:flex md:flex-col md:justify-center md:items-start`}
      >
        <Title
          isAnimated
          size="2xl"
          className="font-gtUltraBold mb-6 md:mb-8 text-hg-secondary"
        >
          Nuestros expertos en dermatología estética
        </Title>
        <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
          En Holaglow defendemos una medicina estética que cuida y, para ello,
          la profesionalidad y la empatía son fundamentales. Todos nuestros
          doctores comparten el mismo compromiso: ponerse en tu piel, de manera
          literal y metafóricamente.
        </Text>
      </Container>
      <div className={`${isDashboard ? '' : 'md:w-1/2'}`}>
        {deviceSize.isMobile && (
          <ProductCarousel type="professionals" items={professionals} />
        )}
        {!deviceSize.isMobile && (
          <Carousel
            hasControls={professionals?.map && professionals?.map.length > 2}
            className="relative"
            isIntrinsicHeight
            visibleSlides={2}
            infinite={false}
            sliderStyles="gap-8"
          >
            {professionals?.map(professional => (
              <ProfessionalCard
                key={professional.name}
                professional={professional}
                className="h-full flex flex-col"
              />
            ))}
          </Carousel>
        )}
      </div>
    </Container>
  );
}
