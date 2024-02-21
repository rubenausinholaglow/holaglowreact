import Clinics from 'app/(web)/components/common/Clinics';
import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Las ciudades donde te subimos el glow',
  description:
    'Ven a visitar las clínicas Holaglow, un espacio de confianza, profesionalidad e innovación donde podrás expresar tu belleza libremente.',
  openGraph: {
    url: 'https://holaglowreact-git-dev-966-hola-glow.vercel.app/',
    type: 'website',
    title: 'Las ciudades donde te subimos el glow',
    description:
      'Ven a visitar las clínicas Holaglow, un espacio de confianza, profesionalidad e innovación donde podrás expresar tu belleza libremente.',
    images: ['/images/home/OGimagen_Holaglow.jpg'],
  },
};

export default function StaticClinics() {
  return (
    <AppWrapper>
      <MainLayout>
        <div className="bg-hg-cream py-12 md:py-20" id="clinics">
          <Container className={'max-w-[1300px]'}>
            <div className="md:flex md:flex-row gap-12 items-center">
              <Flex layout="col-left" className="md:w-1/2 mb-4 md:mb-0">
                <Title isAnimated size="2xl" className="font-bold mb-4">
                  Las ciudades donde{' '}
                  <Underlined color={HOLAGLOW_COLORS['primary']}>
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
        <Clinics className="mb-12" />
      </MainLayout>
    </AppWrapper>
  );
}
