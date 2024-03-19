import { fetchClinics } from '@utils/fetch';
import ProfessionalCard from 'app/(web)/components/common/ProfessionalCard';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

async function getClinics() {
  const clinics = await fetchClinics();

  return clinics;
}

export default async function ProfessionalsSSR({
  className = '',
  isDashboard = false,
}: {
  className?: string;
  isDashboard?: boolean;
}) {
  const clinics = await getClinics();

  const professionals = clinics.flatMap(clinic =>
    clinic.professionals.filter(professional => {
      if (professional.professionalType === 1) {
        return {
          ...professional,
          city: clinic.city,
        };
      }
    })
  );

  return (
    <Container
      className={`p-0 md:px-4 gap-16   ${
        isDashboard ? '' : 'md:flex'
      } justify-between md:mb-16 ${className}`}
    >
      <Container
        className={`${
          isDashboard ? '' : 'md:w-1/2'
        } md:px-0 md:flex md:flex-col md:justify-center md:items-start`}
      >
        <Title size="2xl" className="mb-4">
          Nuestras doctoras
        </Title>
        <Text className="text-hg-black500 mb-8 md:text-lg">
          En Holaglow defendemos una medicina estética que cuida y, para ello,
          la profesionalidad y la empatía son fundamentales. Todos nuestros
          doctores comparten el mismo compromiso: ponerse en tu piel, de manera
          literal y metafóricamente.
        </Text>
      </Container>
      <div className={`${isDashboard ? '' : 'md:w-1/2'}`}>
        <Carousel
          hasDots
          hasControls={professionals?.map && professionals?.map.length > 2}
          className="relative"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
        >
          {professionals?.map(professional => (
            <ProfessionalCard
              key={professional.name}
              professional={professional}
            />
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
