'use client';

import { useEffect, useState } from 'react';
import { Professional } from '@interface/clinic';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCheckCircle } from 'icons/IconsDs';
import Image from 'next/image';

import BlogAuthor from '../components/BlogAuthor';
import BlogBreadcrumb from '../components/BlogBreadcrumb';
import BlogCategories from '../components/BlogCategories';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { clinics } = useGlobalPersistedStore(state => state);

  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  useEffect(() => {
    const professionalsWithCity = clinics.flatMap(clinic =>
      clinic.professionals.filter(professional => {
        if (professional.professionalType === 1) {
          return {
            ...professional,
            city: clinic.city,
          };
        }
      })
    );

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  console.log(professionals);

  return (
    <MainLayout>
      <div className="rounded-t-3xl shadow-centered-black-lg ">
        <Container className="mb-8 py-6 md:py-12">
          <BlogBreadcrumb />

          <Image
            src="/images/blog/post1.png"
            alt="placeholder"
            height={400}
            width={600}
            className="w-full rounded-3xl mb-8"
          />
          <BlogCategories
            className="mb-8"
            categories={['Arrugas', 'Relleno']}
          />

          <Text size="2xl" className="font-bold mb-">
            Mesoterapia facial: Tu nuevo aliado para tu rutina de skincare
          </Text>
          <Text size="xs" className="mb-8">
            Por Dr. Sonsoles Espí.{' '}
            <span className="text-hg-black500">Mar 15, 2023</span>
          </Text>

          <p className="font-medium mb-6">
            El tratamiento de mesoterapia facial consiste en administrar un
            cóctel de nutrientes muy completo mediante inyección subcutánea para
            que actúe directamente desde el interior.
          </p>
          <p className="font-medium border-b border-hg-black pb-6 mb-6">
            De esta manera conseguimos estimular los tejidos cutáneos mediante
            ingredientes que se encuentran de forma natural en nuestra piel.
            Estos ingredientes incluyen ácido hialurónico, antioxidantes,
            aminoácidos, vitaminas (A,B,C,E,K), minerales y coenzimas.
          </p>

          <Text className="text-xl font-semibold mb-6">
            ¿Qué es la mesoterapia facial?
          </Text>

          <p className="mb-6">
            El tratamiento de mesoterapia facial consiste en administrar un
            cóctel de nutrientes muy completo mediante inyección subcutánea para
            que actúe directamente desde el interior.
          </p>
          <p className="mb-6">
            De esta manera conseguimos estimular los tejidos cutáneos mediante
            ingredientes que se encuentran de forma natural en nuestra piel.
            Estos ingredientes incluyen ácido hialurónico, antioxidantes,
            aminoácidos, vitaminas (A,B,C,E,K), minerales y coenzimas.
          </p>
          <p className="mb-6">
            Es un aliado perfecto para mejorar el aspecto de la piel, alisar las
            arrugas, reducir la flacidez, restaurar la hidratación y conseguir
            un cutis más radiante y luminoso. También consigue revertir los
            signos visibles derivados de factores externos como la
            contaminación, la exposición al sol, el estilo de vida y el estrés.
          </p>

          <Text className="text-xl font-semibold mb-6">
            ¿Por qué nos encanta la mesoterapia facial?
          </Text>

          <p className="mb-6">
            La Mesoterapia Facial tiene numerosos beneficios, de ahí que sea uno
            de los tratamientos estéticos faciales más populares del mercado.
          </p>

          <ul>
            <li className="flex items-start mb-6">
              <span className="border border-hg-secondary text-hg-secondary p-2 rounded-full shrink-0 w-10 h-10 text-center mr-4">
                1
              </span>
              <p>
                Su piel recibe una alta concentración de vitaminas y otros
                ingredientes altamente nutritivos que hacen que nuestra piel se
                sienta hidratada y rejuvenecida.
              </p>
            </li>
            <li className="flex items-start mb-6">
              <span className="border border-hg-secondary text-hg-secondary p-2 rounded-full shrink-0 w-10 h-10 text-center mr-4">
                2
              </span>
              <p>
                Su aplicación se lleva a cabo de forma sutil y paulatina para
                poder valorar el resultado.
              </p>
            </li>
            <li className="flex items-start mb-6">
              <span className="border border-hg-secondary text-hg-secondary p-2 rounded-full shrink-0 w-10 h-10 text-center mr-4">
                3
              </span>
              <div>
                <p className="mb-6">
                  Muy versátil, trata múltiples necesidades de tu piel:
                </p>

                <ul>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Hidratación profunda
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Tratamiento de arrugas finas
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Prevención de la formación de nuevas arrugas
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Eliminación de puntos negros
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Tratamientos de los surcos lagrimales
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Luminosidad y aspecto saludable de la piel
                  </li>
                  <li className="flex items-center gap-2 mb-6">
                    <SvgCheckCircle
                      height={24}
                      width={24}
                      className="text-hg-secondary shrink-0"
                    />
                    Tensado de la piel
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <Image
            src="/images/blog/post1.png"
            alt="placeholder"
            height={400}
            width={600}
            className="w-full rounded-3xl mb-8"
          />

          <Text className="text-xl font-semibold mb-6">
            ¿Cuándo podré ver los resultados? ¿Cuál es su duración?
          </Text>

          <p className="mb-6">
            Los resultados de la Mesoterapia Facial se pueden observar después
            de la primera sesión, mejorando la textura y el aspecto de la piel.
            El resultado estético cúspide se consigue de forma acumulativa tras
            3 - 5 sesiones con un intervalo de 15-20 días.
          </p>

          <p className="mb-6">
            Después de los 3 primeros meses, se sugiere repetir el tratamiento
            cada 2-6 meses, dependiendo de las necesidades personales de cada
            paciente.
          </p>
        </Container>

        {/* <BlogAuthor /> */}
      </div>
    </MainLayout>
  );
}
