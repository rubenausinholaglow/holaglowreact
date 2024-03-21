'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import ClinicsSelector from './ClinicsSelector';

export default function Clinics({ className = '' }: { className?: string }) {
  const { clinics } = useGlobalPersistedStore(state => state);

  return (
    <div className={className}>
      <div className="relative bg-white">
        <Container className="py-12 md:py-16">
          <Title isAnimated size="2xl" className="font-bold mb-8 md:w-1/2">
            Nuestras <br className="hidden md:block" />
            <Underlined color={HOLAGLOW_COLORS['primary']}>clínicas</Underlined>
          </Title>

          {clinics && <ClinicsSelector clinics={clinics} />}
        </Container>
      </div>
    </div>
  );
}
