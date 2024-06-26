'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ProductCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Professional, ProfessionalType } from 'app/types/clinic';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
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
  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  useEffect(() => {
    const professionalsWithCity: Professional[] = [
      {
        authorDescription: '',
        collegiateNumber: '505015795',
        description: '',
        flowwwId: '',
        id: '',
        name: 'Sonsoles Espi Montoya',
        professionalType: ProfessionalType.Medical,
        title: 'Médico estético especialista en dermocosmética',
        tittleAbbreviation: 'Dra',
        urlPhoto: '/images/derma/home/professionals/Sonsoles.png',
        active: true,
      },
    ];

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  if (isEmpty(professionals)) {
    return <></>;
  }

  return (
    <Container
      className={`p-0 md:px-4 gap-16 pb-12 ${
        isDashboard ? '' : 'md:flex'
      } justify-between ${className}`}
    >
      <Container
        className={`${
          isDashboard ? '' : 'md:w-1/2'
        } md:px-0 md:flex md:flex-col md:justify-center md:items-start md:order-2`}
      >
        <Title
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Nuestros dermatólogos estéticos
        </Title>
        <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
          Nuestros médicos analizarán tu piel para acompañarte en el cuidado
          óptimo de tu piel y ayudarte a lograr tus objetivos con tratamientos
          eficaces y clínicamente testados.
        </Text>
      </Container>
      <div className={`${isDashboard ? '' : 'md:w-1/2'}`}>
        <Carousel
          hasControls
          className="relative"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
          isDerma
          controlstyles="px-4 mt-4"
        >
          {professionals?.map(professional => (
            <ProfessionalCard
              isDerma
              key={professional.name}
              professional={professional}
              className="h-full flex flex-col"
            />
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
