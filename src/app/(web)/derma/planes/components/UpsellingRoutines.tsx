'use client';

import { useEffect, useState } from 'react';
import { AnalyticsMetrics } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import { CartItem, Product } from '@interface/product';
import { UpsellingData } from '@interface/upselling';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
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
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  DERMA_BUNDLE_TYPES_IDS,
  DERMA_PRODUCTS,
  DERMA_ROUTINES,
  DERMA_TYPES,
  DERMA_TYPES_IDS,
} from '../mockedData';

export default function UpsellingRoutines({ data }: { data: UpsellingData }) {
  const { showModalBackground } = useGlobalStore(state => state);
  const { deviceSize } = useSessionStore(state => state);

  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(0);

  const { cart, addItemToCart, resetCart, applyCartDiscount } = useCartStore(
    state => state
  );
  const {
    setSelectedClinic,
    setSelectedTreatments,
    selectedTreatments,
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
  const router = useRouter();

  useEffect(() => {
    setActivePayment(PaymentBank.None);
    useCartStore.setState(INITIAL_STATE);
    setSelectedTreatments([]);
    resetCart();
    setSelectedClinic({
      id: 'c0cdafdc-f22e-4bba-b4d4-ba23357ca5e2',
      address: 'Consulta online',
      city: '',
      flowwwId: '1',
      internalName: '',
      phone: '',
      professionals: [],
    });
    setTypeOfPayment(TypeOfPayment.Full);
    setSelectedSlot(undefined);
    setSelectedDay(undefined);
    setCurrentUser(data.user);
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

  const filteredProducts = DERMA_PRODUCTS.filter(product =>
    product.type.includes(data.routine)
  );

  async function addRevisionProduct() {
    const productDetails = await fetchProduct(
      process.env.NEXT_PUBLIC_CITA_DERMA_REVISION!
    );
    productDetails.id = productDetails.id;
    productDetails.flowwwId = 6;
    productDetails.title = productDetails.title;
    productDetails.price = productDetails.price;
    setSelectedTreatments([...selectedTreatments, productDetails]);
    if (cart.length == 0) addItemToCart(productDetails as CartItem);
  }

  async function addRoutineProduct() {
    const productDetails = await fetchProduct(DERMA_TYPES_IDS[data.routine]);
    productDetails.id = DERMA_TYPES_IDS[data.routine];
    productDetails.flowwwId = 0;
    productDetails.title = productDetails.title;
    productDetails.price = productDetails.price;
    setSelectedTreatments([...selectedTreatments, productDetails]);
    if (cart.length == 0) addItemToCart(productDetails as CartItem);
  }
  async function addRoutineWithProduct() {
    const productDetails = await fetchProduct(
      DERMA_BUNDLE_TYPES_IDS[data.routine]
    );
    productDetails.id = DERMA_BUNDLE_TYPES_IDS[data.routine];
    productDetails.flowwwId = 6;
    productDetails.title = productDetails.title;
    productDetails.price = productDetails.price;
    setSelectedTreatments([...selectedTreatments, productDetails]);
    if (cart.length == 0) addItemToCart(productDetails as CartItem);
  }

  const selectProduct = async (id: number) => {
    switch (id) {
      case 1:
        await addRevisionProduct();
        router.push('/planes/agenda');
        break;
      case 2:
        await addRoutineProduct();
        router.push('/planes/contactform');
        break;
      case 3:
        await addRoutineWithProduct();
        router.push('/planes/agenda');
        break;
    }
  };

  return (
    <>
      <Modal
        isVisible={showModal}
        width={deviceSize.isMobile ? 'w-full' : 'max-w-[550px]'}
        className="shadow-none"
        type="right"
        hideModalBackground
      >
        <div className="bg-derma-secondary100 border-b border-hg-black relative min-h-screen">
          <SvgCross
            height={20}
            width={20}
            className="absolute top-4 right-4"
            onClick={() => setShowModal(false)}
          />
          <div style={{ minHeight: `calc(100dvh - ${modalBottomBarHeight})` }}>
            <Container className="pt-12 md:p-6">
              <Image
                src={DERMA_ROUTINES[selectedRoutine].modalImgSrc}
                alt={DERMA_ROUTINES[selectedRoutine].name}
                width={324}
                height={396}
                className="w-2/3 shrink-0 mx-auto mb-8"
              />
              {selectedRoutine !== 0 && (
                <Text className="mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block">
                  {DERMA_TYPES[data.routine]}
                </Text>
              )}
              <TitleDerma className="text-derma-primary mb-4">
                {DERMA_ROUTINES[selectedRoutine].name}
              </TitleDerma>
              <Flex
                layout="col-left"
                className="rounded-2xl bg-derma-secondary400 p-4 md:p-6 w-full gap-4 mb-8"
              >
                {DERMA_ROUTINES[selectedRoutine].bullets.map((item, index) => {
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
              {selectedRoutine !== 0 && (
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
          <Flex
            className={`bg-derma-tertiary justify-between sticky bottom-0 py-4 px-6 text-white w-full h-[${modalBottomBarHeight}]`}
          >
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
            className={`w-full gap-6 md:grid md:grid-cols-${DERMA_ROUTINES.length}`}
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
                <Flex className="gap-6 mt-2 mb-6 md:flex-col h-full w-full items-start md:items-center">
                  <Image
                    src={routine.imgSrc}
                    alt="Seguimiento online con tu dermatólogo"
                    width={324}
                    height={396}
                    className="w-[55%]"
                  />

                  <Flex layout="col-left" className="w-full">
                    <p
                      className={`mb-2 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs inline-block ${
                        index !== 0
                          ? 'bg-hg-secondary300 text-hg-secondary'
                          : 'bg-transparent text-transparent h-6'
                      }`}
                    >
                      {index !== 0 && DERMA_TYPES[data.routine]}
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
                  <Button
                    type="derma"
                    size={deviceSize.isMobile ? 'lg' : 'xl'}
                    onClick={() => selectProduct(routine.id)}
                  >
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
