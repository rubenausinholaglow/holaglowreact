'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DERMA_PRODUCTS } from 'app/(web)/derma/planes/mockedData';
import { SvgArrow, SvgCross } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BenefitsApplicationResultsDerma({
  className = '',
}: {
  className?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(0);

  const { showModalBackground } = useGlobalStore(state => state);

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  return (
    <>
      <Modal
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
              >
                Cerrar
              </Button>
            </Container>
          </div>
        )}
      </Modal>

      <div className={`py-12 bg-derma-primary100 ${className}`}>
        <Container>
          <Title
            isAnimated
            size="2xl"
            className="mb-6 md:mb-8 text-derma-primary"
          >
            Una rutina minimalista
          </Title>
          <Text className="text-hg-black500 mb-8 md:text-lg">
            Lo que tu piel necesita. Nada más. Nada menos.
          </Text>

          <ul className="flex flex-col gap-8 w-full md:grid md:grid-cols-2">
            {DERMA_PRODUCTS.sort((a, b) => a.order - b.order).map(
              (item, index) => (
                <li
                  className="flex items-center gap-4 border border-hg-black200 bg-white/70 p-3 w-full rounded-xl text-sm cursor-pointer"
                  key={item.title}
                  onClick={() => {
                    setModalProduct(index);
                    setShowModal(true);
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    height={192}
                    width={164}
                    className="w-[82px]"
                  />
                  <div className="mr-auto">
                    <Text className="font-semibold">{item.title}</Text>
                    <Text>{item.toggle}</Text>
                  </div>
                  <SvgArrow className=" h-5 w-5 shrink-0" />
                </li>
              )
            )}
          </ul>
        </Container>
      </div>
    </>
  );
}
