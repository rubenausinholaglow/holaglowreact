'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from 'app/(web)/components/product/fullWidthCarousel';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Professional, ProfessionalType } from 'app/types/clinic';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
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
    const professionalsWithCity: Professional[] = [
      {
        authorDescription: '',
        collegiateNumber: '282857497',
        description: '',
        flowwwId: '',
        id: '',
        name: 'Dra. Ana Salido',
        professionalType: ProfessionalType.Medical,
        title: 'Médico estético especialista en dermocosmética',
        tittleAbbreviation: '',
        urlPhoto:
          'https://budgetimages.blob.core.windows.net/derma/medicos/1.jpg',
      },
      {
        authorDescription: '',
        collegiateNumber: '282886988',
        description: '',
        flowwwId: '',
        id: '',
        name: 'Dra. Pérez Badillo',
        professionalType: ProfessionalType.Medical,
        title:
          'Médico especialista en dermatología con Master en medicina estética',
        tittleAbbreviation: '',
        urlPhoto:
          'https://budgetimages.blob.core.windows.net/derma/medicos/2.jpg',
      },
    ];

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  if (isEmpty(professionals)) {
    return <></>;
  }

  return (
    <Container
      className={`p-0 md:px-4 gap-16 ${
        isDashboard ? '' : 'md:flex'
      } justify-between md:mb-4 ${className}`}
    >
      <Container
        className={`${
          isDashboard ? '' : 'md:w-[55%]'
        } md:px-0 md:flex md:flex-col md:justify-center md:items-start md:order-2`}
      >
        <TitleDerma
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Nuestra red de dermatólogos estéticos
        </TitleDerma>
        <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
          Dermatólogos experimentados escucharán todas tus inquietudes estéticas
          para acompañarte en el cuidado óptimo de tu piel y ayudarte a lograr
          tus objetivos con tratamientos eficaces clínicamente testados.
        </Text>
      </Container>
      <div className={`${isDashboard ? '' : 'md:w-[45%]'}`}>
        {deviceSize.isMobile && (
          <ProductCarousel
            hasControls={false}
            type="professionals"
            items={professionals}
          />
        )}
        {!deviceSize.isMobile && (
          <Carousel
            hasControls={false}
            className="relative"
            isIntrinsicHeight
            visibleSlides={2}
            infinite={false}
            sliderStyles="gap-8"
            isDerma
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
