'use client';

import './datePickerDermaStyle.css';

import { useEffect, useState } from 'react';
import { User } from '@interface/appointment';
import { AnalyticsMetrics, Client } from '@interface/client';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { PaymentBank } from '@interface/payment';
import { CartItem } from '@interface/product';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
import { usePayments } from '@utils/paymentUtils';
import { useRegistration, validFormData } from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { SvgArrow, SvgWarning } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';

import FifthStep from './FifthStep';
import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import { MULTISTEP_QUESTIONS } from './mockedData';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const CLIENT_INITIAL_VALUES = {
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
  city: '',
  address: '',
};

export default function Form() {
  const [errorMessage, setErrorMessage] = useState('');
  const [is18YearsOld, setIs18YearsOld] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);
  const [createdUser, setCreatedUser] = useState<User | undefined>(undefined);
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
  const [client, setClient] = useState<Client>(CLIENT_INITIAL_VALUES);

  const { cart, addItemToCart, resetCart } = useCartStore(state => state);
  const STEPS = 7;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const progressBarWith: number = (activeSlideIndex + 1) * (100 / STEPS);

  const initializePayment = usePayments();
  const registerUser = useRegistration(client, false, false, false);

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
      resetCart();
      addItemToCart(productDetails as CartItem);
    }
    resetCart();
    setSelectedClinic({
      id: 'c0cdafdc-f22e-4bba-b4d4-ba23357ca5e2',
      address: 'Videollamada',
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
    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
  }, []);

  useEffect(() => {
    async function checkout() {
      await initializePayment(activePayment, createdUser!, false, 5900);
    }
    if (activePayment != PaymentBank.None && cart.length > 0) checkout();
  }, [activePayment]);

  useEffect(() => {
    if (client && validFormData(client, [])) setContinueDisabled(false);
  }, [selectedSlot, client]);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
    setContinueDisabled(false);
  };

  useEffect(() => {
    if (activeSlideIndex === 4) {
      setClient(CLIENT_INITIAL_VALUES);
      setContinueDisabled(true);
    }

    if (activeSlideIndex === 5 && isEmpty(selectedSlot)) {
      setContinueDisabled(true);
    }
  }, [activeSlideIndex, selectedSlot]);

  const goNext = (index: number) => {
    if (client && client.email && !createdUser) {
      client.origin = 'Derma';
      registerUser(client, false, false, false).then(x => {
        setCreatedUser(x);
      });
    }
    if (!client.name && dermaQuestions.name) {
      client.name = dermaQuestions.name!;
      setClient(client);
    }
    setDermaQuestions(dermaQuestions);
    dermaService.update(dermaQuestions).then(x => {
      dermaQuestions.id = x!.toString();
      setDermaQuestions(dermaQuestions);
    });
    setActiveSlideIndex(index + 1);
    let continueDisabled = true;
    if (index === 2) continueDisabled = false;
    setContinueDisabled(continueDisabled);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const checkErrors = () => {
    setErrorMessage('');

    if (activeSlideIndex === 0) {
      setErrorMessage(
        isEmpty(dermaQuestions.name) || !is18YearsOld
          ? 'Completa todos los campos para continuar'
          : ''
      );
    }
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
                is18YearsOld={is18YearsOld}
                setIs18YearsOld={setIs18YearsOld}
                setErrorMessage={setErrorMessage}
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
                      continueDisabled={continueDisabled}
                      setContinueDisabled={setContinueDisabled}
                    />
                  )}
                </Container>
              );
            })}

            <div id="tm_derma_step5" className="min-h-[100px]">
              <ThirdStep
                activeSlideIndex={activeSlideIndex}
                client={client}
                setClient={setClient}
                dermaQuestions={dermaQuestions}
              />
            </div>

            <div id="tm_derma_step6" className="min-h-[100px]">
              <FourthStep activeSlideIndex={activeSlideIndex} />
            </div>

            <div id="tm_derma_step7" className="min-h-[100px]">
              <FifthStep activeSlideIndex={activeSlideIndex} client={client} />
            </div>
          </Carousel>

          <Container className="my-8">
            <div className="md:w-1/2 md:pl-8 md:ml-auto">
              {!isEmpty(errorMessage) && continueDisabled && (
                <Flex
                  layout="row-left"
                  className="gap-2 p-3 text-sm rounded-xl bg-hg-error300 text-hg-error w-full mb-4"
                >
                  <SvgWarning className="w-4 h-4" />
                  {errorMessage}
                </Flex>
              )}

              <Flex layout="row-between">
                {activeSlideIndex > 0 && (
                  <Button
                    size="xl"
                    onClick={() => goBack(activeSlideIndex)}
                    type="tertiary"
                    customStyles="bg-transparent border-none text-derma-tertiary"
                  >
                    <Flex layout="row-left" className="gap-2">
                      <SvgArrow height={16} width={16} className="rotate-180" />
                      Atrás
                    </Flex>
                  </Button>
                )}

                {activeSlideIndex < STEPS && (
                  <Button
                    size="xl"
                    className="ml-auto"
                    type="dermaDark"
                    disabled={continueDisabled}
                    onClick={() => {
                      if (!continueDisabled) {
                        goNext(activeSlideIndex);
                      }
                      checkErrors();
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
