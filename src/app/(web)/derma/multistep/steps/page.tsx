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
import Agenda from 'app/(web)/checkout/agenda/Agenda';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { SvgArrow, SvgVideo } from 'app/icons/IconsDs';
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
import { MULTISTEP_QUESTIONS } from './mockedData';
import SecondStep from './SecondStep';

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
  });

  const [hasError] = useState<boolean>(false);
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

            <div>
              {activeSlideIndex === 4 && (
                <>
                  <Container>
                    <Text className="text-sm text-derma-primary500 mb-2">
                      Paso {activeSlideIndex + 1}, Agenda madre{' '}
                      {activeSlideIndex}
                    </Text>
                    <Text className="font-gtUltraThin mb-2 font-bold text-xl text-derma-primary">
                      Selecciona tu horario preferida
                    </Text>
                    <Text className="text-hg-black500 text-sm mb-4">
                      Después de tu consulta, tu médico te recomendará una
                      rutina personalizada de cuidado de la piel adaptada a tus
                      metas, que podrás recibir en tu puerta según tu
                      preferencia. Los detalles de tu cita online con el médico
                      se proporcionarán por correo electrónico al pagar.
                    </Text>
                    <ul className="flex flex-col gap-4 mb-8 text-xs text-hg-black500">
                      <li className="flex gap-2">
                        <SvgVideo />
                        Los detalles del vídeo se proporcionarán por correo
                        electrónico tras la confirmación
                      </li>
                      <li className="flex gap-2">
                        <SvgStethoscope />
                        Consulta online con dermatólogo especializado
                      </li>
                    </ul>
                  </Container>
                  <Agenda isDashboard={true} isDerma={true}></Agenda>
                </>
              )}
            </div>

            <div className="bg-white px-4">
              {activeSlideIndex === 5 && (
                <>
                  Paso 6, confirmacion
                  <section>
                    <Container className="px-0 md:mt-8 md:pb-8">
                      <Flex
                        layout="col-left"
                        className="gap-4 md:gap-16 md:flex-row bg-hg-cream500 md:bg-transparent rounded-t-2xl pt-4 md:pt-0"
                      >
                        <div className="w-full md:w-1/2 md:order-2">
                          <AppointmentResume isProbadorVirtual={false} />
                        </div>
                        <div className="w-full md:w-1/2 p-4 md:p-8 rounded-3xl">
                          <Title size="xl" className="font-semibold mb-4">
                            Reserva tu cita
                          </Title>
                          <RegistrationForm
                            showPostalCode={true}
                            redirect={false}
                            hasContinueButton={false}
                            formData={client}
                            setClientData={setClient}
                          />

                          <CheckoutPayment
                            hasError={hasError}
                            className="mt-8"
                            formData={client}
                          />
                        </div>
                      </Flex>
                    </Container>
                  </section>
                </>
              )}
            </div>
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
