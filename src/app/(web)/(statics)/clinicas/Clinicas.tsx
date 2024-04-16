import { ReactNode } from 'react';
import ClinicsDerma from 'app/(web)/components/common/ClinicsDerma';
import ClinicsSSR from 'app/(web)/components/common/ClinicsSSR';
import App from 'app/(web)/components/layout/App';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { DERMA_COLORS, HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Clinicas({ isDerma = false }: { isDerma?: boolean }) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (isDerma) {
      return <DermaLayout>{children}</DermaLayout>;
    } else {
      return (
        <App>
          <MainLayout>{children}</MainLayout>
        </App>
      );
    }
  };

  return (
    <Wrapper>
      <div className="bg-hg-cream py-12 md:py-20" id="clinics">
        <Container className={'max-w-[1300px]'}>
          <div className="md:flex md:flex-row gap-12 items-center">
            <Flex layout="col-left" className="md:w-1/2 mb-4 md:mb-0">
              <Title
                isAnimated
                size="2xl"
                className={`font-bold mb-4 ${
                  isDerma ? 'text-derma-primary' : ''
                }`}
              >
                Las ciudades donde{' '}
                <Underlined
                  color={isDerma ? 'transparent' : HOLAGLOW_COLORS['primary']}
                >
                  te subimos el glow
                </Underlined>
              </Title>
              <Text isAnimated size="xl" className="">
                Vive una experiencia a medida, desde el probador virtual hasta
                tratamientos personalizados. Encuentra la clínica Holaglow más
                cercana a ti y ven a conocernos.
              </Text>
            </Flex>
            <div className="md:w-1/2 aspect-square relative">
              <Image
                alt="Nuestras clínicas"
                src="/images/statics/clinics.jpg"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </Container>
      </div>
      {isDerma ? <ClinicsDerma /> : <ClinicsSSR className="mb-12" />}
    </Wrapper>
  );
}
