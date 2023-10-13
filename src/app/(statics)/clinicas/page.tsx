import Clinics from 'app/components/common/Clinics';
import MainLayout from 'app/components/layout/MainLayout';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export const metadata = {
  title: 'Clínicas de medicina estética Holaglow',
  description:
    'Ven a visitar las clínicas Holaglow, un espacio de confianza, profesionalidad e innovación donde podrás expresar tu belleza libremente.',
};
export default function StaticClinics() {
  return (
    <MainLayout>
      <div
        className="bg-gradient from-hg-secondary500 to-hg-primary300 py-12 md:py-20"
        id="prices"
      >
        <Container>
          <div className="md:flex md:flex-row gap-12 items-center">
            <Title className="font-semibold md:w-1/2 mb-4 md:mb-0">
              Holaglow es la nueva cara de la medicina estética que dice adiós a
              los prejuicios y reafirma que la belleza es lo que a ti te dé la
              gana
            </Title>
            <div className="md:w-1/2 aspect-square relative">
              <Image
                alt="Nuestras clínicas"
                src="/images/statics/clinics.webp"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </Container>
      </div>
      <Clinics className="mb-12" />
    </MainLayout>
  );
}
