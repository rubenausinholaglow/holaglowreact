import { fetchClinics } from '@utils/fetch';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

import ClinicsSelector from './ClinicsSelector';

async function getClinics() {
  const clinics = await fetchClinics();

  return clinics;
}

export default async function ClinicsSSR({
  className = '',
}: {
  className?: string;
}) {
  const clinics = await getClinics();

  return (
    <div className={`relative bg-derma-secondary100 ${className}`}>
      <Container className="py-12 md:py-16">
        <Title isAnimated size="2xl" className="font-bold mb-8 md:w-1/2">
          Nuestras clínicas
        </Title>

        {clinics && <ClinicsSelector clinics={clinics} />}
      </Container>
    </div>
  );
}
