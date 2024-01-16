'use client';

import './datePickerDermaStyle.css';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
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
import { Text, Title } from 'designSystem/Texts/Texts';

import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import { MULTISTEP_QUESTIONS } from './mockedData';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [values, setValues] = useState<Array<Array<number>>>([[]]);
  const [textAreaOne, setTextAreasOne] = useState<string>('');
  const [textAreaTwo, setTextAreasTwo] = useState<string>('');
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);

  const [dermaQuestions, setDermaQuestions] = useState<DermaQuestions>({
    name: '',
  } as DermaQuestions);
  const {
    setSelectedClinic,
    setSelectedTreatments,
    selectedSlot,
    setTypeOfPayment,
  } = useSessionStore(state => state);
  const { activePayment, setActivePayment } = useGlobalPersistedStore(
    state => state
  );
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

  const { cart, addItemToCart } = useCartStore(state => state);
  const STEPS = 6;
  const progressBarWith: number = (activeSlideIndex + 1) * (100 / STEPS);

  const initializePayment = usePayments();
  const registerUser = useRegistration(client, false, false, false);

  useEffect(() => {
    async function checkout() {
      const createdUser = await registerUser(client, false, false, false);
      await initializePayment(activePayment, createdUser!);
    }
    if (activePayment != PaymentBank.None && cart.length > 0) checkout();
  }, [activePayment]);

  useEffect(() => {
    setActivePayment(PaymentBank.None);
    useCartStore.setState(INITIAL_STATE);

    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      productDetails.id = '2e9bd0e8-ffa6-4fa1-ae1f-5bfc4cd17187';
      productDetails.flowwwId = 5;
      productDetails.title = 'Consulta personalizada de dermatología';
      productDetails.price = 49;
      setSelectedTreatments([productDetails]);
      addItemToCart(productDetails as CartItem);
    }

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
  }, []);

  useEffect(() => {
    if (selectedSlot) setContinueDisabled(false);
  }, [selectedSlot]);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
    setContinueDisabled(false);
  };

  const goNext = (index: number) => {
    dermaQuestions.extraInfo = textAreaTwo;
    setDermaQuestions(dermaQuestions);
    dermaService.update(dermaQuestions).then(x => {
      setActiveSlideIndex(index + 1);
      let continueDisabled = true;
      if (index == 2) continueDisabled = false;
      setContinueDisabled(continueDisabled);
      dermaQuestions.id = x!.toString();
      setDermaQuestions(dermaQuestions);
    });
  };

  return (
    <CheckHydration>
      <div className="bg-derma-secondary100 min-h-screen">
        <header className="py-4 relative">
          <Flex layout="row-left" className="max-w-[624px] mx-auto px-4">
            <SvgHolaglowDerma className="w-[92px] h-[32px] md:w-[144px] md:h-[50px]" />
          </Flex>
        </header>

        <main
          id="multistep"
          className="mx-auto relative overflow-hidden text-hg-black"
        >
          <ul className="flex bg-derma-primary/20 h-[4px] w-full rounded-full mb-6">
            <li
              className="h-[4px] rounded-full bg-hg-tertiary transition-all"
              style={{ width: `${progressBarWith}%` }}
            ></li>
          </ul>

          <Carousel
            totalSlides={STEPS}
            currentSlide={activeSlideIndex}
            dragEnabled={false}
            touchEnabled={false}
          >
            <FirstStep
              activeSlideIndex={activeSlideIndex}
              dermaQuestions={dermaQuestions}
              setDermaQuestions={setDermaQuestions}
              setContinueDisabled={setContinueDisabled}
            />

            {values &&
              MULTISTEP_QUESTIONS.map((item: any, question: number) => {
                return (
                  <Container key={question}>
                    {activeSlideIndex === question + 1 && (
                      <SecondStep
                        question={question}
                        item={item}
                        activeSlideIndex={activeSlideIndex}
                        dermaQuestions={dermaQuestions}
                        setDermaQuestions={setDermaQuestions}
                        setContinueDisabled={setContinueDisabled}
                      />
                    )}
                  </Container>
                );
              })}

            <ThirdStep activeSlideIndex={activeSlideIndex} />

            <FourthStep
              activeSlideIndex={activeSlideIndex}
              client={client}
              setClient={setClient}
            />
          </Carousel>

          <Container className="my-8">
            <Flex layout="row-between">
              {activeSlideIndex > 0 && (
                <Button
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
                  className="ml-auto"
                  type="tertiary"
                  customStyles="bg-transparent border-derma-primary text-derma-primary"
                  disabled={continueDisabled}
                  onClick={() => {
                    if (!continueDisabled) goNext(activeSlideIndex);
                  }}
                >
                  <Flex layout="row-right">Siguiente</Flex>
                </Button>
              )}
            </Flex>
          </Container>
        </main>
      </div>
    </CheckHydration>
  );
}
