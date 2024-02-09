'use client';

import './datePickerDermaStyle.css';

import { useEffect, useState } from 'react';
import { AnalyticsMetrics, Client } from '@interface/client';
import { DermaQuestions } from '@interface/dermaquestions';
import { PaymentBank } from '@interface/payment';
import { CartItem } from '@interface/product';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
import { usePayments } from '@utils/paymentUtils';
import useRegistration from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import { MULTISTEP_QUESTIONS } from './mockedData';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showFirstStepErrors, setShowFirstStepErrors] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);
  const [dermaQuestions, setDermaQuestions] = useState<DermaQuestions>({
    name: '',
  } as DermaQuestions);

  const {
    setSelectedClinic,
    setSelectedTreatments,
    selectedSlot,
    setTypeOfPayment,
    setAnalyticsMetrics,
    setPayment,
  } = useSessionStore(state => state);
  const { activePayment, setActivePayment, setCurrentUser } =
    useGlobalPersistedStore(state => state);
  const [client, setClient] = useState<Client>({
    email: '',
    phone: '',
    phonePrefix: '',
    name: '',
    surname: '',
    secondSurname: '',
    termsAndConditionsAccepted: false,
    receiveCommunications: false,
    page: '',
    externalReference: '',
    analyticsMetrics: {
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
    },
    interestedTreatment: '',
    treatmentPrice: 0,
    postalCode: '',
    origin: 'Derma',
  });

  const { cart, addItemToCart, resetCart } = useCartStore(state => state);
  const STEPS = 6;
  const progressBarWith: number = (activeSlideIndex + 1) * (100 / STEPS);

  const initializePayment = usePayments();
  const registerUser = useRegistration(client, false, false, false);

  useEffect(() => {
    async function checkout() {
      if (client.email) {
        client.origin = 'Derma';
        const createdUser = await registerUser(client, false, false, false);
        await initializePayment(activePayment, createdUser!);
      }
    }
    if (activePayment != PaymentBank.None && cart.length > 0) checkout();
  }, [activePayment]);

  useEffect(() => {
    setActivePayment(PaymentBank.None);
    useCartStore.setState(INITIAL_STATE);

    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      productDetails.id = process.env.NEXT_PUBLIC_CITA_DERMA!;
      productDetails.flowwwId = 5;
      productDetails.title = 'Consulta personalizada de dermatología';
      productDetails.price = 59;
      setSelectedTreatments([productDetails]);
      if (cart.length == 0) addItemToCart(productDetails as CartItem);
    }

    resetCart();
    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);

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

    setCurrentUser(undefined);
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
    if (selectedSlot) setContinueDisabled(false);
  }, [selectedSlot]);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
    setContinueDisabled(false);
  };

  const goNext = (index: number) => {
    setDermaQuestions(dermaQuestions);
    dermaService.update(dermaQuestions).then(x => {
      setActiveSlideIndex(index + 1);
      let continueDisabled = true;
      if (index == 2) continueDisabled = false;
      setContinueDisabled(continueDisabled);
      dermaQuestions.id = x!.toString();
      setDermaQuestions(dermaQuestions);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    });
  };

  const checkFirstStepErrors = () => {
    setShowFirstStepErrors(continueDisabled);
  };

  return (
    <CheckHydration>
      <meta name="robots" content="noindex,follow" />
      <div className="bg-derma-secondary100 min-h-screen">
        <header className="py-4 relative">
          <Container>
            <SvgHolaglowDerma className="w-[92px] h-[32px] md:w-[144px] md:h-[50px] mb-4" />
          </Container>
          <Container className="px-0 md:px-4 md:pt-12">
            <div className="md:w-1/2 md:pr-8">
              <ul className="flex bg-derma-primary500/20 h-[4px] w-full rounded-full mb-6">
                <li
                  className="h-[4px] rounded-full bg-derma-primary transition-all"
                  style={{ width: `${progressBarWith}%` }}
                ></li>
              </ul>
            </div>
          </Container>
        </header>

        <main
          id="multistep"
          className="mx-auto relative overflow-hidden text-hg-black"
        >
          <Carousel
            totalSlides={STEPS}
            currentSlide={activeSlideIndex}
            dragEnabled={false}
            touchEnabled={false}
          >
            <div id="tm_derma_step1" className="min-h-[100px]">
              <FirstStep
                activeSlideIndex={activeSlideIndex}
                dermaQuestions={dermaQuestions}
                setDermaQuestions={setDermaQuestions}
                setContinueDisabled={setContinueDisabled}
                continueDisabled={continueDisabled}
                showFirstStepErrors={showFirstStepErrors}
              />
            </div>

            {MULTISTEP_QUESTIONS.map((item: any, question: number) => {
              return (
                <Container
                  key={question}
                  id={`tm_derma_step${question + 2}`}
                  className="min-h-[100px]"
                >
                  {activeSlideIndex === question + 1 && (
                    <SecondStep
                      question={question}
                      item={item}
                      dermaQuestions={dermaQuestions}
                      setDermaQuestions={setDermaQuestions}
                      setContinueDisabled={setContinueDisabled}
                    />
                  )}
                </Container>
              );
            })}

            <div id="tm_derma_step5" className="min-h-[100px]">
              <ThirdStep activeSlideIndex={activeSlideIndex} />
            </div>

            <div id="tm_derma_step6" className="min-h-[100px]">
              <FourthStep
                name={dermaQuestions?.name || ''}
                activeSlideIndex={activeSlideIndex}
                client={client}
                setClient={setClient}
              />
            </div>
          </Carousel>

          <Container className="my-8">
            <div className="md:w-1/2 md:pl-8 md:ml-auto">
              <Flex layout="row-between">
                {activeSlideIndex > 0 && (
                  <Button
                    size="lg"
                    onClick={() => goBack(activeSlideIndex)}
                    type="tertiary"
                    customStyles="bg-transparent border-none text-derma-primary"
                  >
                    <Flex layout="row-left" className="gap-2">
                      <SvgArrow height={16} width={16} className="rotate-180" />
                      Atrás
                    </Flex>
                  </Button>
                )}

                {activeSlideIndex < STEPS && (
                  <Button
                    size="lg"
                    className="ml-auto"
                    type="tertiary"
                    customStyles={`bg-derma-secondary300 border-derma-primary text-derma-primary ${
                      continueDisabled
                        ? ''
                        : 'hover:border-derma-primary500 hover:text-derma-primary500 hover:bg-transparent'
                    }`}
                    disabled={continueDisabled}
                    onClick={() => {
                      if (!continueDisabled) goNext(activeSlideIndex);
                      if (activeSlideIndex === 0) checkFirstStepErrors();
                    }}
                    id={`tmevent_dermaStep_${activeSlideIndex}`}
                  >
                    <Flex layout="row-right">Siguiente</Flex>
                  </Button>
                )}
              </Flex>
            </div>
          </Container>
        </main>
      </div>
    </CheckHydration>
  );
}
