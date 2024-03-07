'use client';

import { useEffect, useState } from 'react';
import { DERMA_PRODUCTS } from 'app/(web)/derma/planes/mockedData';
import { SvgArrow, SvgCheckCircle, SvgCross } from 'app/icons/IconsDs';
import { useGlobalStore, useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

const RUTINE_DATA = {
  imgSrc: '/images/derma/upselling/packDerma.png',
  modalImgSrc: '/images/derma/upselling/packDermaModal.png',
  name: 'Programa completo: Rutina facial + Revisión online',
  price: '99€',
  discountedPrice: '129€',
  cta: 'Lo quiero todo',
  bullets: [
    'Cremas seleccionadas para ti por tu médico',
    'Receta de tu crema facial formulada',
  ],
  id: 3,
};

export default function WhatsIncludedDerma() {
  const { showModalBackground } = useGlobalStore(state => state);
  const { deviceSize } = useSessionStore(state => state);

  const [showModal, setShowModal] = useState(false);

  const modalBottomBarHeight = '97px';

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  return (
    <>
      <Modal
        isVisible={showModal}
        width={deviceSize.isMobile ? 'w-full' : 'max-w-[500px]'}
        className="shadow-none"
        type="right"
        hideModalBackground
      >
        {showModal && (
          <div className="bg-derma-secondary100 border-b border-hg-black relative min-h-screen">
            <SvgCross
              height={20}
              width={20}
              className="absolute top-4 right-4"
              onClick={() => setShowModal(false)}
            />
            <div
              style={{ minHeight: `calc(100dvh - ${modalBottomBarHeight})` }}
            >
              <Container className="pt-12 md:p-6">
                <Image
                  src={RUTINE_DATA.modalImgSrc}
                  alt={RUTINE_DATA.name}
                  width={324}
                  height={396}
                  className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8"
                />
                <Title className="text-derma-primary mb-4">
                  Tu rutina facial personalizada
                </Title>
                <Flex
                  layout="col-left"
                  className="rounded-2xl bg-derma-secondary400 p-4 md:p-6 w-full gap-4 mb-8"
                >
                  {RUTINE_DATA.bullets.map((item, index) => {
                    return (
                      <Flex className="w-full gap-4 items-start" key={index}>
                        <SvgCheckCircle className="text-derma-primary500 shrink-0 w-5 h-5" />
                        <p
                          className="text-hg-black500 text-sm md:text-md"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
                <Flex layout="col-left" className="w-full">
                  {DERMA_PRODUCTS.map((item, index) => {
                    return (
                      <Flex
                        layout="col-left"
                        className="w-full text-derma-tertiary mb-6 pb-8 border-b border-hg-black300"
                        key={index}
                      >
                        <Text className="text-derma-tertiary mb-2 font-semibold text-lg">
                          {item.title}
                        </Text>
                        {item.subTitle && (
                          <Text className="text-sm mb-4">{item.subTitle}</Text>
                        )}
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
            </div>
            <Flex
              className={`bg-derma-tertiary justify-between sticky bottom-0 py-4 px-6 text-white w-full h-[${modalBottomBarHeight}]`}
            >
              <div>
                <Text className="text-3xl font-bold">{RUTINE_DATA.price}</Text>
                {RUTINE_DATA.price !== RUTINE_DATA.discountedPrice && (
                  <Text className="text-sm text-hg-error font-medium line-through">
                    PVP {RUTINE_DATA.discountedPrice}
                  </Text>
                )}
              </div>
              <Button
                size="xl"
                type="derma"
                href="/multistep/start"
                id="tmevent_derma_multistep_start_modal"
              >
                {RUTINE_DATA.cta}
              </Button>
            </Flex>
          </div>
        )}
      </Modal>

      <div className="bg-derma-primary500 rounded-3xl -mt-4 -mb-4 md:mt-0 md:mb-0 md:pb-16 relative md:bg-transparent">
        <Container className="py-4 overflow-hidden md:bg-derma-primary500 md:rounded-3xl md:p-6">
          <Flex
            layout="col-left"
            className="items-center relative md:justify-center md:flex-row md:gap-12 md:items-start"
          >
            <Flex layout="col-left" className="relative z-10 md:w-[55%]">
              <Title isAnimated size="2xl" className="text-white mb-4 md:mb-6">
                Qué incluye el precio
              </Title>
              <Text className="text-hg-black500 md:w-full md:text-lg mb-6 md:text-white">
                Tu piel merece un cuidado experto y personalizado
              </Text>

              <Flex
                layout="row-between"
                className="p-6 bg-derma-primary300 rounded-full w-full hidden md:flex"
              >
                <Button
                  size="xl"
                  type="derma"
                  href="/multistep/start"
                  id="tmevent_derma_multistep_start_middle"
                >
                  Descubre tu rutina
                </Button>

                <SvgArrow className="h-12 w-12 text-derma-primary" />
              </Flex>
            </Flex>

            <Flex layout="col-left" className="relative z-10 w-full md:w-[45%]">
              <Flex
                layout="col-left"
                className="bg-derma-secondary300 rounded-2xl p-4 md:p-6 shadow-centered-black w-full"
              >
                <Image
                  src={RUTINE_DATA.modalImgSrc}
                  alt={RUTINE_DATA.name}
                  width={324}
                  height={396}
                  className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8 mt-4"
                />
                <Title size="xl" className="mb-2 font-gtUltra">
                  Cesta con productos personalizados y validados por el médico
                </Title>
                <div>
                  <Text className="text-3xl font-bold">
                    {RUTINE_DATA.price}{' '}
                    <Text className="text-sm">(o 33€/mes en 3 meses)</Text>
                  </Text>
                  {RUTINE_DATA.price !== RUTINE_DATA.discountedPrice && (
                    <Text className="text-sm text-hg-error font-medium line-through">
                      PVP {RUTINE_DATA.discountedPrice}
                    </Text>
                  )}
                </div>
                <Flex className="w-full gap-4 md:gap-0 justify-between mt-8">
                  <Button
                    size={deviceSize.isMobile ? 'md' : 'xl'}
                    type="tertiary"
                    customStyles="border-none text-derma-tertiary bg-derma-secondary100 "
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Saber más
                  </Button>
                  <Button
                    type="derma"
                    size={deviceSize.isMobile ? 'lg' : 'xl'}
                    href="/multistep/start"
                    id="tmevent_derma_multistep_start_middle_card"
                  >
                    Descubre tu rutina
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </div>
    </>
  );
}
