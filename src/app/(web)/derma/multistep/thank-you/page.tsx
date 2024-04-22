'use client';

import CheckHydration from '@utils/CheckHydration';
import { DERMA_COLORS } from '@utils/colors';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheck, SvgInfoCircle } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const ITEMS = [
  {
    title: 'Información y fotos',
  },
  {
    title: 'Elige tu plan de tratamiento',
    text: 'Pago único para rutina de 3 meses o suscripción trimestral',
  },
  {
    title: 'Análisis y diagnóstico en 48h',
    text: 'Te asignamos tu médico para diseñar tu rutina de tratamiento',
  },
  {
    title: 'Receta de tu crema personalizada',
    text: 'Te la enviamos por WhatsaApp / Email tras el análisis de tu médico',
  },
  {
    title: 'Recibe las cremas en casa',
    text: 'Envío gratis. En 3-5 días recibirás los productos complementarios de tu crema personalizada',
  },
  {
    title: 'Primeros resultados',
    text: 'Tras 4 semanas de aplicación verás los primeros resultados',
  },
];

export default function ThankYouMultiStep() {
  const { user } = useGlobalPersistedStore(state => state);
  const { picturesUrls } = useDermaStore(state => state);
  return (
    <CheckHydration>
      <div className="bg-derma-secondary300 min-h-screen relative">
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-white hidden md:block" />
        <DermaLayout hideButton hideFooter>
          <Container className="px-0">
            <div className="md:flex gap-12 pt-8">
              <Container className="md:w-1/2 mb-8">
                <Flex
                  layout="col-center"
                  className="w-full gap-4 md:items-start"
                >
                  <Image
                    alt="Dra. Sonsoles Espi"
                    src="/images/derma/multistep/Sonsoles.png"
                    height={192}
                    width={192}
                    className="mx-auto w-24 mb-4 md:ml-0"
                  />
                  <Title size="xldr" className="text-derma-primary font-light">
                    Estás un paso más cerca, {user?.name}
                  </Title>
                  <Text className="text-sm text-center md:text-left">
                    Elige el tipo de tratamiento que quieres para empezar a
                    cuidar tu piel con lo que de verdad necesita.
                  </Text>
                  <Flex className="p-2 bg-white/50 gap-2 rounded-xl">
                    <SvgInfoCircle className="text-derma-primary500 h-6 w-6" />
                    <Text className="text-hg-black500 text-xs">
                      Nos pondremos en contacto contigo si necesitamos más
                      información para el diagnóstico.
                    </Text>
                  </Flex>
                </Flex>
              </Container>
              <Container className="px-0 md:px-4 md:w-1/2">
                <div className="px-4 bg-white py-4 rounded-3xl md:p-0">
                  <Flex className="gap-8 items-start">
                    <ul className="w-full">
                      {ITEMS.map((item, index) => (
                        <li
                          className={`flex items-start gap-4 ${
                            index + 1 === ITEMS.length ? '' : 'border-l-[2px]'
                          } ml-4 pb-8`}
                          style={{ borderColor: '#d3f7f1' }}
                          key={item.text}
                        >
                          {index === 0 ? (
                            <SvgCheck
                              className={`h-8 w-8 p-1 rounded-full shrink-0 -ml-[17px] `}
                              style={{
                                backgroundColor: DERMA_COLORS.primary500,
                                color: 'white',
                              }}
                            />
                          ) : (
                            <Flex
                              className={`h-8 w-8 p-1 rounded-full shrink-0 -ml-[17px] justify-center`}
                              style={{
                                backgroundColor: '#d3f7f1',
                                color: DERMA_COLORS.primary500,
                              }}
                            >
                              {index + 1}
                            </Flex>
                          )}
                          <Flex
                            layout="row-left"
                            className="md:flex-col w-full pt-1"
                          >
                            <Flex layout="col-left" className="gap-2 w-full">
                              <Text className="font-semibold">
                                {item.title}
                              </Text>
                              {item.title && (
                                <Text className="text-sm">{item.text}</Text>
                              )}
                              {index === 0 && (
                                <ul className="flex flex-col gap-4 w-full">
                                  <li className="border border-derma-secondary400 bg-derma-secondary100 p-3 w-full rounded-xl">
                                    <Flex layout="row-left" className="gap-4">
                                      <div className="relative aspect-square h-16 w-16">
                                        <Image
                                          src={picturesUrls[0]}
                                          alt="imagen frontal"
                                          fill
                                          objectFit="cover"
                                          className="rounded-2xl"
                                        />
                                      </div>
                                      <div>
                                        <Text className="font-semibold">
                                          Foto 1.
                                        </Text>
                                        <Text>Rostro frontal</Text>
                                      </div>
                                    </Flex>
                                  </li>
                                  <li className="border border-derma-secondary400 bg-derma-secondary100 p-3 w-full rounded-xl">
                                    <Flex layout="row-left" className="gap-4">
                                      <div className="relative aspect-square h-16 w-16">
                                        <Image
                                          src={picturesUrls[1]}
                                          alt="imagen frontal"
                                          fill
                                          objectFit="cover"
                                          className="rounded-2xl"
                                        />
                                      </div>
                                      <div>
                                        <Text className="font-semibold">
                                          Foto 2.
                                        </Text>
                                        <Text>Perfil derecho</Text>
                                      </div>
                                    </Flex>
                                  </li>
                                  <li className="border border-derma-secondary400 bg-derma-secondary100 p-3 w-full rounded-xl">
                                    <Flex layout="row-left" className="gap-4">
                                      <div className="relative aspect-square h-16 w-16">
                                        <Image
                                          src={picturesUrls[2]}
                                          alt="imagen frontal"
                                          fill
                                          objectFit="cover"
                                          className="rounded-2xl"
                                        />
                                      </div>
                                      <div>
                                        <Text className="font-semibold">
                                          Foto 3.
                                        </Text>
                                        <Text>Perfil izquierdo</Text>
                                      </div>
                                    </Flex>
                                  </li>
                                </ul>
                              )}
                            </Flex>
                          </Flex>
                        </li>
                      ))}
                    </ul>
                  </Flex>
                  <Button
                    type="derma"
                    size="xl"
                    className="w-full mb-8 md:mb-16"
                    href={ROUTES.derma.multistep.planes}
                  >
                    Elegir plan de tratamiento
                  </Button>
                </div>
              </Container>
            </div>
          </Container>
        </DermaLayout>
      </div>
    </CheckHydration>
  );
}
