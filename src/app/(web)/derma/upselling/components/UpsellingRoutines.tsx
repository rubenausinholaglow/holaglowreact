'use client';

import { useEffect, useState } from 'react';
import { UpsellingData } from '@interface/upselling';
import { SvgCheckCircle, SvgCross, SvgWarning } from 'app/icons/IconsDs';
import { useGlobalStore, useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { DERMA_PRODUCTS, DERMA_ROUTINES, DERMA_TYPES } from '../mockedData';

export default function UpsellingRoutines({ data }: { data: UpsellingData }) {
  const { showModalBackground } = useGlobalStore(state => state);
  const { deviceSize } = useSessionStore(state => state);

  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(0);

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  const filteredProducts = DERMA_PRODUCTS.filter(product =>
    product.type.includes(data.rutineType)
  );

  return (
    <>
      <Modal
        isVisible={showModal}
        width={deviceSize.isMobile ? 'w-full' : 'max-w-[550px]'}
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
              src={DERMA_ROUTINES[selectedRoutine].imgSrc}
              alt={DERMA_ROUTINES[selectedRoutine].name}
              height={516}
              width={360}
              className="w-1/2 shrink-0 mx-auto mb-8"
            />
            {selectedRoutine !== 0 && (
              <Text className="mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block">
                {DERMA_TYPES[data.rutineType]}
              </Text>
            )}
            <TitleDerma className="text-derma-primary mb-4">
              {DERMA_ROUTINES[selectedRoutine].name}
            </TitleDerma>
            <Flex
              layout="col-left"
              className="rounded-2xl bg-derma-secondary400 p-4 py-6 w-full gap-4 mb-8"
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
              {filteredProducts.map((item, index) => {
                return (
                  <Flex
                    layout="col-left"
                    className={`w-full text-derma-tertiary mb-6 pb-8 ${
                      filteredProducts.length !== index + 1
                        ? 'border-b border-hg-black300'
                        : ''
                    }`}
                    key={index}
                  >
                    <Text className="text-derma-tertiary mb-2 font-semibold text-lg">
                      {item.title}
                    </Text>
                    <Text className="text-sm mb-4">{item.subTitle}</Text>
                    <Text className="text-sm text-hg-black400">
                      {item.text}
                    </Text>
                    {!isEmpty(item.info) && (
                      <Text
                        size="sm"
                        className="mt-4 bg-white text-hg-black400 p-2"
                      >
                        {item.info}
                      </Text>
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Container>
          <Flex className="bg-derma-tertiary justify-between rounded-t-2xl sticky bottom-0 py-4 px-6 text-white w-full">
            <div>
              <Text className="text-3xl font-bold">
                {DERMA_ROUTINES[selectedRoutine].price}
              </Text>
              {DERMA_ROUTINES[selectedRoutine].price !==
                DERMA_ROUTINES[selectedRoutine].discountedPrice && (
                <Text className="text-sm text-hg-error font-medium line-through">
                  PVP {DERMA_ROUTINES[selectedRoutine].discountedPrice}
                </Text>
              )}
            </div>
            <Button size="lg" type="derma">
              Quiero el pack
            </Button>
          </Flex>
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
                Esta receta tiene una validez de 10 días desde la fecha de
                prescripción
              </Text>
            </Flex>
          </Container>
        </div>

        <Container className="bg-derma-primary500 rounded-3xl py-6 -mt-5 md:mt-0 md:mb-8">
          <TitleDerma size="2xl" className="text-white mb-4">
            Completa tu plan de cuidado facial
          </TitleDerma>
          <Text className="mb-8">
            Según tu consulta, estas opciones pueden ayudarte a mejorar la salud
            de tu piel
          </Text>

          <Flex
            layout="col-left"
            className="w-full gap-6 md:grid md:grid-flow-col md:auto-cols-auto"
          >
            {DERMA_ROUTINES.map((routine, index) => (
              <Flex
                key={index}
                layout="col-left"
                className={` py-6 px-4 md:px-6 rounded-3xl h-full w-full ${
                  index === 2
                    ? 'bg-derma-tertiary text-white'
                    : 'bg-derma-secondary400'
                }`}
              >
                <Flex className="gap-6 mb-4 md:mb-8 md:flex-col h-full w-full">
                  <div className="relative aspect-square w-1/2 shrink-0 md:w-full">
                    <Image
                      src={routine.imgSrc}
                      alt="Seguimiento online con tu dermatólogo"
                      fill
                      className={`object-contain ${
                        index === 0 ? 'scale-[120%] md:scale-100' : ''
                      }`}
                    />
                  </div>

                  <Flex layout="col-left" className="w-full">
                    <p
                      className={`mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block ${
                        index !== 0
                          ? 'bg-hg-secondary300 text-hg-secondary'
                          : 'bg-transparent text-transparent h-6'
                      }`}
                    >
                      {index !== 0 && DERMA_TYPES[data.rutineType]}
                    </p>
                    <Text className="text-md mb-3 md:text-lg md:font-semibold">
                      {routine.name}
                    </Text>
                    <Text className="text-3xl font-bold">{routine.price}</Text>
                    {routine.price !== routine.discountedPrice && (
                      <Text className="text-sm text-hg-error font-medium line-through">
                        PVP {routine.discountedPrice}
                      </Text>
                    )}
                  </Flex>
                </Flex>

                <Flex layout="row-center" className="justify-between w-full">
                  <Button
                    size="sm"
                    type="tertiary"
                    customStyles={`border-none text-derma-tertiary ${
                      index !== 2
                        ? 'bg-derma-secondary100'
                        : 'bg-white/10 text-white'
                    }`}
                    onClick={() => {
                      setSelectedRoutine(index);
                      setTimeout(() => {
                        setShowModal(true);
                      }, 100);
                    }}
                  >
                    Saber más
                  </Button>
                  <Button type="derma" size={deviceSize.isMobile ? 'lg' : 'xl'}>
                    {routine.cta}
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Container>
      </div>
    </>
  );
}
