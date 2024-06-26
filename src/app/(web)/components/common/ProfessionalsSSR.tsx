import { Professional } from '@interface/clinic';
import { fetchClinics } from '@utils/fetch';
import { isMobileSSR } from '@utils/isMobileSSR';
import ProfessionalCard from 'app/(web)/components/common/ProfessionalCard';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import FullWidthCarousel from '../product/fullWidthCarousel';

async function getClinics() {
  const clinics = await fetchClinics();

  return clinics;
}

export default async function ProfessionalsSSR({
  className = '',
}: {
  className?: string;
}) {
  const clinics = await getClinics();
  const professionals = clinics
    .flatMap(clinic =>
      clinic.professionals.map(professional => {
        if (professional.professionalType === 1) {
          return {
            ...professional,
            city: clinic.city,
          };
        }
        return null;
      })
    )
    .filter(
      professional => professional !== null && professional.urlPhoto !== ''
    ) as Professional[];

  if (professionals.length === 0) {
    return <></>;
  }

  return (
    <>
      <Container
        className={`p-0 md:px-4 gap-16 justify-between md:mb-8 ${className}`}
      >
        <Container className="md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <Title size="2xl" className="mb-4">
            Nuestras doctoras
          </Title>
          <Text className="text-hg-black500 mb-8 md:text-lg">
            En Holaglow defendemos una medicina estética que cuida y, para ello,
            la profesionalidad y la empatía son fundamentales. Todos nuestros
            doctores comparten el mismo compromiso: ponerse en tu piel, de
            manera literal y metafóricamente.
          </Text>
        </Container>

        {professionals.length < 3 && (
          <Carousel
            hasDots={isMobileSSR()}
            className="relative"
            visibleSlides={isMobileSSR() ? 1 : 2}
            dragEnabled={isMobileSSR()}
          >
            {professionals.map(professional => {
              if (professional.urlPhoto) {
                return (
                  <ProfessionalCard
                    key={professional.name}
                    professional={professional}
                    className="h-full flex flex-col"
                  />
                );
              }
            })}
          </Carousel>
        )}
      </Container>

      {professionals.length > 2 && (
        <FullWidthCarousel
          hasDots={isMobileSSR()}
          hasControls={!isMobileSSR()}
          className="relative"
          visibleSlides={isMobileSSR() ? 1 : 2.66}
          dragEnabled={isMobileSSR()}
        >
          {professionals.map(professional => {
            if (professional.urlPhoto) {
              return (
                <ProfessionalCard
                  key={professional.name}
                  professional={professional}
                  className="h-full flex flex-col pl-0"
                />
              );
            }
          })}
        </FullWidthCarousel>
      )}
    </>
  );
}
