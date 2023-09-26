import { useEffect, useState } from 'react';
import { Professional } from '@interface/clinic';
import ProductCarousel from 'app/components/product/ProductCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function Professionals() {
  const { clinics } = useGlobalPersistedStore(state => state);

  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  useEffect(() => {
    const professionalsWithCity = clinics.flatMap(clinic =>
      clinic.professionals.map(professional => ({
        ...professional,
        city: clinic.city,
      }))
    );

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  if (isEmpty(clinics)) {
    return <></>;
  }

  return (
    <Container className="p-0 md:px-4 md:flex gap-16 justify-between md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
        <Title size="2xl" className="font-bold mb-6 md:mb-8">
          Nuestros{' '}
          <Underlined color={HOLAGLOW_COLORS['secondary']}>doctores</Underlined>
        </Title>
        <Text className="text-hg-black500 mb-8 md:text-lg">
          En Holaglow defendemos una medicina estética que cuida y, para ello,
          la profesionalidad y la empatía son fundamentales. Todos nuestros
          doctores comparten el mismo compromiso: ponerse en tu piel, de manera
          literal y metafóricamente.
        </Text>
      </Container>
      <div className="px-4 md:w-1/2">
        <ProductCarousel type="professionals" items={professionals} />
      </div>
    </Container>
  );
}
