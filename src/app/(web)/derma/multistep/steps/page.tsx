'use client';

import './datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import TextInputField from '@dashboardComponents/TextInputField';
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
import {
  SvgArrowSmallLeft,
  SvgCheck,
  SvgCircle,
  SvgHolaglow,
} from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import { MULTISTEP_QUESTIONS } from './mockedData';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [values, setValues] = useState<Array<Array<number>>>([[]]);
  const [textAreaOne, setTextAreasOne] = useState<string>('');
  const [textAreaTwo, setTextAreasTwo] = useState<string>('');
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);
  const [localDateSelected, setLocalDateSelected] = useState(new Date());

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
  const progressBarWith: number = activeSlideIndex * (100 / STEPS);

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

  const setSelectedQuestionValue = (question: number, value: number) => {
    const newValues = values;
    if (!newValues[question]) newValues.push([]);
    const index = newValues[question].indexOf(value);
    if (index == -1) {
      newValues[question].push(value);
    } else {
      newValues[question].splice(index, 1);
    }
    setValues(newValues);
    setContinueDisabled(newValues[question].length == 0);
    if (question == 0) {
      dermaQuestions.skinConcerns = [];
      newValues[question].forEach(x => {
        dermaQuestions.skinConcerns.push({
          concern: MULTISTEP_QUESTIONS[0].questions[value].title,
        });
      });
      dermaQuestions.skinConcerns.push({ concern: textAreaOne });
    } else if (question == 1) {
      dermaQuestions.scenario = MULTISTEP_QUESTIONS[1].questions[value].title;
    }
    setDermaQuestions(dermaQuestions);
  };

  const setTextAreasValue = (value: string, question: number) => {
    if (question == 2) setTextAreasOne(value);
    else setTextAreasTwo(value);
    if (value) setContinueDisabled(false);
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setDermaQuestions(prevDermaQuestions => ({
      ...prevDermaQuestions,
      [field]: event.target.value,
    }));
  };
  const selectDate = (x: Date) => {
    const dayjsDate = dayjs(x);
    const today = dayjs();
    const years = today.diff(dayjsDate, 'years');
    setLocalDateSelected(dayjsDate.toDate());
    setContinueDisabled(years < 18);
    dermaQuestions.birthDate = dayjsDate.format('YYYY-MM-DD');
    setDermaQuestions(dermaQuestions);
  };

  return (
    <CheckHydration>
      <header className="py-4 border-b border-hg-black50 mb-6 relative">
        <Flex layout="row-left" className="max-w-[624px] mx-auto px-4">
          {activeSlideIndex > 0 && (
            <div className="w-[30px] mr-2 sm:hidden">
              <SvgArrowSmallLeft
                height={30}
                width={30}
                fill={HOLAGLOW_COLORS['tertiary']}
                className="cursor-pointer self-center"
                onClick={() => goBack(activeSlideIndex)}
              />
            </div>
          )}
          <SvgHolaglow
            width={125}
            height={30}
            fill={HOLAGLOW_COLORS['tertiary']}
          />
        </Flex>
      </header>
      <main
        id="multistep"
        className="max-w-[624px] mx-auto relative overflow-hidden text-hg-black"
      >
        <div className="px-4 mb-12">
          <ul className="flex bg-hg-tertiary500/40 h-[4px] w-full rounded-full">
            <li
              className="h-[4px] rounded-full bg-hg-tertiary transition-all"
              style={{ width: `${progressBarWith}%` }}
            ></li>
          </ul>
        </div>

        <Carousel
          totalSlides={STEPS}
          currentSlide={activeSlideIndex}
          dragEnabled={false}
          touchEnabled={false}
        >
          <div className="bg-white px-4">
            Paso 1, validación de usuario
            <section className="mb-6">
              <Text size="xl" className="mb-2 font-semibold">
                Primero, comencemos con tu información básica
              </Text>
              <Text>
                Ten en cuenta que nuestros profesionales de la salud no podrán
                recetar antibióticos orales o medicamentos, como Roaccutane y
                Spironolactone, en línea, ya que esto requiere una consulta en
                persona. Nuestros médicos solo pueden abordar preocupaciones
                relacionadas con tu piel.
              </Text>
            </section>
            <section>
              <div className="grid grid-cols-1 gap-4 w-full">
                <TextInputField
                  placeholder="Nombre"
                  value={dermaQuestions.name!}
                  onChange={event => handleFieldChange(event, 'name')}
                  hasNoValidation
                />
                <Flex id="datepickerWrapper">
                  <DatePicker
                    onChange={selectDate}
                    maxDate={new Date()}
                    useWeekdaysShort
                    calendarStartDay={1}
                    locale="es"
                    className="w-full"
                    fixedHeight
                    disabledKeyboardNavigation
                    selected={localDateSelected}
                  ></DatePicker>
                </Flex>
              </div>
            </section>
          </div>
          {values &&
            MULTISTEP_QUESTIONS.map((item: any, question: number) => {
              return (
                <div className="bg-white px-4" key={question}>
                  Paso {question + 1}, {item.section}
                  <section className="mb-6">
                    <Text size="xl" className="mb-2 font-semibold">
                      {item.title}
                    </Text>
                    <Text>{item.description}</Text>
                  </section>
                  <section>
                    <ul className="grid grid-cols-1 gap-4">
                      {values &&
                        item.questions.map((item: any, index: number) => {
                          const isActive =
                            values[question]?.indexOf(index) > -1;
                          return (
                            <div
                              key={index}
                              className={`w-full mb-4 ${
                                isActive
                                  ? 'bg-hg-tertiary500/25 text-hg-black'
                                  : 'text-hg-tertiary'
                              } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 hover:text-hg-black group rounded-lg py-2 px-3 cursor-pointer`}
                              onClick={() => {
                                setSelectedQuestionValue(question, index);
                              }}
                            >
                              <Flex
                                layout="col-center"
                                className="justify-start h-full"
                              >
                                {isActive ? (
                                  <SvgCheck
                                    height={16}
                                    width={16}
                                    fill={HOLAGLOW_COLORS['tertiary']}
                                    className="self-end mb-4"
                                  />
                                ) : (
                                  <SvgCircle
                                    height={16}
                                    width={16}
                                    stroke={HOLAGLOW_COLORS['black']}
                                    className="self-end mb-4"
                                  />
                                )}
                                <div className="grow flex items-center">
                                  <Text
                                    size="xs"
                                    className="py-2 font-semibold text-center"
                                  >
                                    {item.title}
                                  </Text>
                                  <Text
                                    size="xs"
                                    className="py-2 font-semibold text-center"
                                  >
                                    {item.text}
                                  </Text>
                                </div>
                              </Flex>
                            </div>
                          );
                        })}
                    </ul>
                  </section>
                  {item.showTextArea && (
                    <section>
                      <textarea
                        value={question == 2 ? textAreaOne : textAreaTwo}
                        onChange={e =>
                          setTextAreasValue(e.target.value, question)
                        }
                        placeholder="Escribe tu comentario..."
                        className="w-full h-40 p-2 resize-none border rounded-lg mb-6"
                      />
                    </section>
                  )}
                </div>
              );
            })}

          <div className="bg-white px-4">
            Paso 5, agenda
            <section>
              <Agenda isDashboard={true} isDerma={true}></Agenda>
            </section>
          </div>
          <div className="bg-white px-4">
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
          </div>
        </Carousel>
        {activeSlideIndex > 0 && (
          <Button
            className="mt-8 ml-3"
            type="secondary"
            onClick={() => goBack(activeSlideIndex)}
          >
            <Flex layout="row-left">
              <SvgArrowSmallLeft height={20} width={20} />
              <span className="ml-2">Atrás</span>
            </Flex>
          </Button>
        )}
        {activeSlideIndex < STEPS && (
          <Button
            className="mt-8 ml-3"
            type="secondary"
            disabled={continueDisabled}
            onClick={() => {
              if (!continueDisabled) goNext(activeSlideIndex);
            }}
          >
            <Flex layout="row-right">
              <span className="ml-2">Siguiente</span>
              <SvgArrow height={16} width={16} className="ml-2" />
            </Flex>
          </Button>
        )}
      </main>
    </CheckHydration>
  );
}
