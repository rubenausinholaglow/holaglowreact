import Clinics from 'app/components/common/Clinics';
import MainLayout from 'app/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function StaticClinics() {
  return (
    <MainLayout>
      <div
        className="bg-gradient from-hg-secondary500 to-hg-primary300"
        id="prices"
      >
        <Container className="py-12 md:py-20">
          <Flex layout="col-left" className="md:flex-row gap-12 items-stretch">
            <Title className="font-semibold md:w-1/2 py-20">
              Holaglow es la nueva cara de la medicina estética que dice adiós a
              los prejuicios y reafirma que la belleza es lo que a ti te dé la
              gana
            </Title>
            <div className="md:w-1/2">
              <div className="relative h-full">
                <Image
                  alt="Nuestras clínicas"
                  src="/images/statics/clinics.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </Flex>
        </Container>
      </div>
      <Clinics className="mb-12" />
    </MainLayout>
  );
}
