'use client';

import { useEffect, useState } from 'react';
import { SvgCheckCircle, SvgCross, SvgWarning } from 'app/icons/IconsDs';
import { useGlobalStore, useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function UpsellingRoutines() {
  const { showModalBackground } = useGlobalStore(state => state);

  const { deviceSize } = useSessionStore(state => state);
  const [showModal, setShowModal] = useState(false);

  console.log(showModalBackground, showModal);

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  return (
    <>
      <Modal
        isVisible={showModal}
        width={deviceSize.isMobile ? 'w-full' : 'w-[400px]'}
        className="shadow-none"
        type="right"
        hideModalBackground
      >
        <div className="bg-derma-secondary100 border-b border-hg-black pt-12 relative">
          <SvgCross
            height={20}
            width={20}
            className="absolute top-4 right-4"
            onClick={() => setShowModal(false)}
          />

          <Container>
            <Image
              src="/images/derma/upselling/seguimiento.png"
              alt="Seguimiento online con tu dermatólogo"
              height={516}
              width={360}
              className="w-1/2 shrink-0 mx-auto"
            />
            <Text className="mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block">
              Rutina personalizada antiaging
            </Text>
            <TitleDerma className="text-derma-primary mb-4">
              Tu rutina facial completa
            </TitleDerma>

            <Flex
              layout="col-left"
              className="rounded-2xl bg-derma-secondary400 p-4 py-6 w-full gap-2 mb-8"
            >
              {[
                '<span class="font-semibold text-derma-tertiary">Revisión online</span> con tu dermatólogo tras aplicar la formula magistral, para de aquí 3 meses.',
                'Nueva receta de la <span class="font-semibold text-derma-tertiary">crema formulada</span> exclusivamente para ti',
                'Recomendación de rutina <span class="font-semibold text-derma-tertiary">facial complementaria</span>',
                '<span class="font-semibold text-derma-tertiary">Envío gratis</span> (de 3 a 5 días hábiles)',
              ].map((item, index) => {
                return (
                  <Flex className="w-full gap-4 items-start" key={index}>
                    <SvgCheckCircle className="text-derma-primary500 shrink-0 w-5 h-5" />
                    <p
                      className="text-hg-black500 text-sm"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </Flex>
                );
              })}
            </Flex>

            <Flex layout="col-left" className="w-full">
              {[
                {
                  title: 'Espuma limpiadora',
                  subTitle: '150ml',
                  text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
                },
                {
                  title: 'Crema contorno de ojos',
                  subTitle: '30ml',
                  text: 'La zona periocular es especialmente vulnerable, por eso, el objetivo principal de este contorno con ácido hialurónico es regular la hidratación y redensificar la piel mejorando su firmeza.',
                },
                {
                  title: 'Protector solar 50+',
                  subTitle: '50ml',
                  text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
                },
                {
                  title: 'Crema antiaging Plus day',
                  subTitle: '50ml',
                  text: 'Esta crema es un tratamiento diurno específico para atenuar el envejecimiento de la piel y lograr la redensificación cutánea suavizando las arrugas y mejorando la textura.',
                },
              ].map((item, index) => {
                return (
                  <Flex
                    layout="col-left"
                    className="w-full text-derma-tertiary mb-6 pb-8 border-b border-hg-black300"
                    key={index}
                  >
                    <Text className="text-derma-tertiary mb-2 font-semibold text-lg">
                      {item.title}
                    </Text>
                    <Text className="text-sm mb-4">{item.subTitle}</Text>
                    <Text className="text-sm text-hg-black400">
                      {item.text}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Container>
        </div>
      </Modal>

      <div className="bg-derma-secondary300 pb-12">
        <div className="bg-derma-tertiary text-white pt-6 pb-12 md:py-4 md:mb-12">
          <Container>
            <Flex className="gap-2 text-sm items-start">
              <SvgWarning className="shrink-0 -mt-0.5" />
              <Text>
                <span className="font-semibold">Recuerda:</span>{' '}
                <br className="md:hidden" />
                Las recetas tienen una validez de 10 días desde la fecha de
                prescripción
              </Text>
            </Flex>
          </Container>
        </div>

        <Container className="bg-derma-primary500 rounded-3xl py-6 -mt-5 md:mt-0 md:mb-8">
          <TitleDerma size="2xl" className="text-white mb-4">
            Selecciona tu rutina
          </TitleDerma>
          <Text className="mb-8">
            Según tu consulta con el Dr. Pepito, estos productos pueden ayudarte
          </Text>

          <Flex
            layout="col-left"
            className="w-full gap-6 md:grid md:grid-flow-col md:auto-cols-auto"
          >
            <Flex
              layout="col-left"
              className="bg-derma-secondary400 py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-6 mb-4 md:mb-8 md:flex-col h-full">
                <Image
                  src="/images/derma/upselling/seguimiento.png"
                  alt="Seguimiento online con tu dermatólogo"
                  height={516}
                  width={360}
                  className="w-1/2 shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Seguimiento online con tu dermatólogo
                  </Text>
                  <Text className="text-3xl font-bold">49€</Text>
                  <Text className="text-sm text-hg-error font-medium line-through">
                    PVP 59 €
                  </Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  size="sm"
                  type="tertiary"
                  customStyles="border-none bg-derma-secondary100 text-derma-tertiary"
                  onClick={() => setShowModal(true)}
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Reservar cita
                </Button>
              </Flex>
            </Flex>

            <Flex
              layout="col-left"
              className="bg-derma-secondary400 py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-6 mb-4 md:mb-8 md:flex-col h-full">
                <Image
                  src="/images/derma/upselling/rutinaFacial.png"
                  alt="Rutina Facial Derma by Holaglow"
                  height={448}
                  width={392}
                  className="w-1/2 shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="mb-4 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs">
                    Rutina{' '}
                    <span className="hidden md:inline">personalizada</span>{' '}
                    antiaging
                  </Text>
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Tu rutina facial completa
                  </Text>
                  <Text className="text-3xl font-bold">129€</Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  size="sm"
                  type="tertiary"
                  customStyles="border-none bg-derma-secondary100 text-derma-tertiary"
                  onClick={() => setShowModal(true)}
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Comprar rutina
                </Button>
              </Flex>
            </Flex>

            <Flex
              layout="col-left"
              className="bg-derma-tertiary text-white py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-2 mb-4 md:mb-8 md:flex-col">
                <Image
                  src="/images/derma/upselling/packDerma.png?1"
                  alt="Solución completa. Rutina facial y revisión médica."
                  height={482}
                  width={426}
                  className="w-[60%] shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="mb-4 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs">
                    Rutina{' '}
                    <span className="hidden md:inline">personalizada</span>{' '}
                    antiaging
                  </Text>
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Solución completa. Tu rutina facial más revisión médica
                  </Text>
                  <Text className="text-3xl font-bold">139€</Text>
                  <Text className="text-sm text-hg-error font-medium line-through">
                    PVP 198 €
                  </Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  size="sm"
                  type="tertiary"
                  customStyles="border-none bg-white/10 text-white"
                  onClick={() => setShowModal(true)}
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Comprar rutina
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </div>
    </>
  );
}
