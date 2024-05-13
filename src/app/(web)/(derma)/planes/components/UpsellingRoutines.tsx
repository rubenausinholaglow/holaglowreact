'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AnalyticsMetrics } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import { UpsellingData } from '@interface/upselling';
import { INITIAL_STATE } from '@utils/constants';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgCheckCircle, SvgCross, SvgWarning } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useGlobalStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { DERMA_PRODUCTS, DERMA_ROUTINES, DERMA_TYPES } from '../mockedData';

export default function UpsellingRoutines({
  data,
}: {
  data: UpsellingData | null;
}) {
  const { showModalBackground } = useGlobalStore(state => state);

  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(0);

  const { resetCart } = useCartStore(state => state);
  const {
    setSelectedClinic,
    setSelectedTreatments,
    setTypeOfPayment,
    setAnalyticsMetrics,
    setSelectedDay,
    setSelectedSlot,
    setPayment,
  } = useSessionStore(state => state);
  const { setActivePayment, setCurrentUser } = useGlobalPersistedStore(
    state => state
  );
  const modalBottomBarHeight = '97px';

  useEffect(() => {
    setActivePayment(PaymentBank.None);
    useCartStore.setState(INITIAL_STATE);
    setSelectedTreatments([]);
    resetCart();
    setSelectedClinic({
      id: 'c0cdafdc-f22e-4bba-b4d4-ba23357ca5e2',
      address: 'Videollamada (recibirás el enlace el día de la cita)',
      city: '',
      flowwwId: '1',
      internalName: '',
      phone: '',
      professionals: [],
    });
    setTypeOfPayment(TypeOfPayment.Full);
    setSelectedSlot(undefined);
    setSelectedDay(undefined);
    setCurrentUser(data?.user);
    const metrics: AnalyticsMetrics = {
      device: 0,
      locPhysicalMs: '',
      utmAdgroup: '',
      utmCampaign: '',
      utmContent: '',
      utmMedium: '',
      utmSource: '',
      utmTerm: '',
      treatmentText: '',
      externalReference: '',
      interestedTreatment: '',
      treatmentPrice: 0,
    };
    setAnalyticsMetrics(metrics);
    setPayment(undefined);
  }, []);

  useEffect(() => {
    setShowModal(showModalBackground);
  }, [showModalBackground]);

  const filteredProducts = DERMA_PRODUCTS.filter(product => data != null);

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
                  src={DERMA_ROUTINES[selectedRoutine].modalImgSrc}
                  alt={DERMA_ROUTINES[selectedRoutine].name}
                  width={324}
                  height={396}
                  className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8"
                />
                {selectedRoutine !== 0 && (
                  <Text className="mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block">
                    {DERMA_TYPES[data!.routine]}
                  </Text>
                )}
                <Title className="text-derma-primary mb-4">
                  {DERMA_ROUTINES[selectedRoutine].name}
                </Title>
                <Flex
                  layout="col-left"
                  className="rounded-2xl bg-derma-secondary400 p-4 md:p-6 w-full gap-4 mb-8"
                >
                  {DERMA_ROUTINES[selectedRoutine].bullets.map(
                    (item, index) => {
                      return (
                        <Flex className="w-full gap-4 items-start" key={index}>
                          <SvgCheckCircle className="text-derma-primary500 shrink-0 w-5 h-5" />
                          <p
                            className="text-hg-black500 text-sm md:text-md"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </Flex>
                      );
                    }
                  )}
                </Flex>
                {selectedRoutine >= 0 && (
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
                )}
              </Container>
            </div>
          </div>
        )}
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
          <Title size="2xl" className="text-white mb-4">
            Tu rutina facial ya está en camino
          </Title>
          <Text className="mb-8">
            Sigue las recomendaciones que te llegarán junto a la rutina para
            sacarle el máximo partido
          </Text>

          <Flex
            layout="col-left"
            className={` md:w-1/2 gap-6 md:grid mx-auto md:grid-cols-${DERMA_ROUTINES.length}`}
          >
            {DERMA_ROUTINES.map((routine, index) => (
              <Flex
                key={index}
                layout="col-left"
                className={`py-5 px-4 rounded-3xl h-full w-full ${
                  index === 2
                    ? 'bg-derma-tertiary text-white'
                    : 'bg-derma-secondary400'
                }`}
              >
                <Container className="pt-12 md:p-6">
                  <Image
                    src={DERMA_ROUTINES[selectedRoutine].modalImgSrc}
                    alt={DERMA_ROUTINES[selectedRoutine].name}
                    width={524}
                    height={696}
                    className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8"
                  />

                  <Flex layout="col-left" className="w-full">
                    <p
                      className={`mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block ${
                        index >= 0
                          ? 'bg-hg-secondary300 text-hg-secondary'
                          : 'bg-transparent text-transparent h-6'
                      }`}
                    >
                      {index >= 0 && data && DERMA_TYPES[data.routine]}
                    </p>
                    <Text className="text-md mb-3 md:text-lg md:font-semibold">
                      {routine.name}
                    </Text>
                  </Flex>

                  <Flex layout="row-right" className="justify-between w-full">
                    <Button
                      type="derma"
                      size={isMobile ? 'lg' : 'xl'}
                      onClick={() => {
                        setSelectedRoutine(index);

                        setTimeout(() => {
                          setShowModal(true);
                        }, 100);
                      }}
                    >
                      Saber más
                    </Button>
                  </Flex>
                </Container>
              </Flex>
            ))}
          </Flex>
        </Container>
      </div>
    </>
  );
}
