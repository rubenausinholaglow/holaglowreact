'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgCross, SvgPharmacy } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal, Modal2 } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { DERMA_PRODUCTS } from '../../planes/mockedData';
import GuaranteedResults from '../../precios/components/GuaranteedResults';
import OptionsPricesB from '../../precios/components/OptionsPricesB';
import PlanesBottomBar from './PlanesBottomBar';

export default function PlanesMultiStep() {
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(0);
  const [selectedOption, setSelectedOption] = useState('99');

  const { showModalBackground } = useGlobalStore(state => state);

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative w-full"
    >
      <Modal2
        isVisible={showModal}
        width={isMobile ? 'w-full' : 'max-w-[500px]'}
        className="shadow-none"
        type="right"
        hideModalBackground
      >
        {showModal && (
          <div className="bg-white relative min-h-screen">
            <SvgCross
              height={20}
              width={20}
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowModal(false)}
              id="tmevent_derma_plans_cosmetic_modal_close"
            />
            <Container className="pt-12 md:p-6">
              <Image
                src={DERMA_PRODUCTS[modalProduct].img}
                alt={DERMA_PRODUCTS[modalProduct].title}
                width={324}
                height={396}
                className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8"
              />
              <Text className="font-semibold mb-2">
                {DERMA_PRODUCTS[modalProduct].title}
              </Text>
              <Text className="text-sm mb-4">
                {DERMA_PRODUCTS[modalProduct].subTitle}
              </Text>
              <Text className="text-hg-black500 text-sm mb-4">
                {DERMA_PRODUCTS[modalProduct].text}
              </Text>
              {DERMA_PRODUCTS[modalProduct].info.length > 0 && (
                <Text className="p-4 bg-derma-primary300/20 rounded-xl text-sm text-hg-black500 mb-8">
                  <span className="font-semibold">Activos principales: </span>
                  {DERMA_PRODUCTS[modalProduct].info}
                </Text>
              )}

              <Button
                size="lg"
                type="dermaDark"
                onClick={() => setShowModal(false)}
                id="tmevent_derma_plans_cosmetic_modal_close"
              >
                Cerrar
              </Button>
            </Container>
          </div>
        )}
      </Modal2>

      <Container>
        <Flex layout="col-center" className="w-full gap-4 md:items-start mb-8">
          <Image
            alt="Dra. Sonsoles Espí"
            src="/images/derma/multistep/Sonsoles.png"
            height={192}
            width={192}
            className="mx-auto w-24 mb-4 md:ml-0"
          />
        </Flex>
      </Container>

      <Container className="px-4 md:p-6">
        <Title
          size="xldr"
          className="text-derma-primary font-light text-center md:text-left mb-4"
        >
          Elige tu plan
        </Title>
        <Text className="text-sm md:text-md text-center md:text-left mb-4">
          Selecciona el nivel de seguimiento médico y la frecuencia de entrega
          de tus cremas
        </Text>

        <OptionsPricesB
          isMultistep={true}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="mb-8">
          <Flex className="gap-4 w-full pt-8 text-hg-black500">
            <SvgPharmacy className="shrink-0" />
            <Text className="text-xs">
              Pide la crema personalizada en tu farmacia más cercana presentando
              la receta y abonando 25-40€ dependiendo de la composición.
            </Text>
          </Flex>
        </div>
      </Container>

      <div className="bg-derma-secondary300">
        <GuaranteedResults />
      </div>

      {isMobile && <PlanesBottomBar selectedOption={selectedOption} />}
    </DermaLayout>
  );
}
