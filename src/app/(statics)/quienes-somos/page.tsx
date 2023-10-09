'use client';

import Professionals from 'app/components/common/Professionals';
import MainLayout from 'app/components/layout/MainLayout';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function StaticClinics() {
  return (
    <MainLayout>
      <div
        className="bg-gradient from-hg-secondary500 to-hg-primary300 py-12 md:py-20"
        id="prices"
      >
        <Container>
          <div className="md:flex md:flex-row gap-12 items-center">
            <Flex layout="col-left" className="md:w-1/2 mb-4 md:mb-0">
              <Title size="2xl" className="font-bold mb-4">
                My glow, my rules
              </Title>
              <Text size="xl" className="">
                Holaglow es la nueva cara de la medicina estética que dice adiós
                a los prejuicios y reafirma que la belleza es lo que a ti te dé
                la gana
              </Text>
            </Flex>
            <div className="md:w-1/2 aspect-square relative">
              <Image
                alt="Sobre nosotros"
                src="/images/statics/aboutUs.webp"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Professionals className="py-12 md:py-16" />

        <Flex className="py-12 md:py-16">
          <ul className="flex flex-col gap-12">
            <li className="flex flex-row gap-8 items-center">
              <div className="w-1/5 aspect-square relative shrink-0">
                <Image
                  alt="Sobre nosotros"
                  src="/images/statics/myGlowMyRules.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Title className="mb-4">Tú pones las reglas</Title>
                <Text className="text-hg-black500">
                  Hacemos fácil la medicina estética. La información y la
                  transparencia forman parte de nuestra esencia. Nosotros te
                  contamos sin tabúes todo lo que debes saber para que pongas
                  tus propias reglas. Creemos que la belleza real se basa en la
                  autenticidad.
                </Text>
              </div>
            </li>

            <li className="flex flex-row gap-8 items-center">
              <div>
                <Title className="mb-4">Conviértete en el centro</Title>
                <Text className="text-hg-black500">
                  Es tu momento. Ponemos el foco en ti. Disfruta de una
                  experiencia hecha a la medida de todas las personas que ven en
                  la medicina estética el mejor aliado para deslumbrar en su día
                  a día.
                </Text>
              </div>
              <div className="w-1/5 aspect-square relative shrink-0">
                <Image
                  alt="Conviértete en el centro"
                  src="/images/statics/centro.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </li>

            <li className="flex flex-row gap-8 items-center">
              <div className="w-1/5 aspect-square relative shrink-0">
                <Image
                  alt="Resultados reales"
                  src="/images/statics/resultadosReales.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Title className="mb-4">Resultados reales</Title>
                <Text className="text-hg-black500">
                  Tus objetivos son los nuestros. Nuestro equipo médico experto
                  selecciona cada producto especialmente para ti, ajustándose a
                  tus necesidades y deseos. Queremos que disfrutes de tu glow.
                </Text>
              </div>
            </li>
          </ul>
        </Flex>
      </Container>
    </MainLayout>
  );
}
