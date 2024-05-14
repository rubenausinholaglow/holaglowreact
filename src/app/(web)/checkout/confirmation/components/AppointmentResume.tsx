import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Appointment } from '@interface/appointment';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
import {
  Accordion,
  AccordionItemProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';
import {
  getTotalFromCart,
  getUniqueIds,
  getUniqueProducts,
} from '@utils/utils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SUBSCRIPTIONS } from 'app/(web)/(derma)/planes/mockedData';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import {
  SvgAngleDown,
  SvgCalendar,
  SvgHour,
  SvgLocation,
  SvgStethoscope,
} from 'app/icons/Icons';
import { SvgBag, SvgCheckCircle } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

dayjs.locale(spanishConf);

export default function AppointmentResume({
  appointment,
  isProbadorVirtual = false,
  isDerma = false,
  isUpselling = false,
  bgColor = 'bg-white',
  isDashboard = false,
  isConfirmation = false,
}: {
  appointment?: Appointment;
  isProbadorVirtual?: boolean;
  isDerma?: boolean;
  isUpselling?: boolean;
  bgColor?: string;
  isDashboard?: boolean;
  isConfirmation?: boolean;
}) {
  const { clinics } = useGlobalPersistedStore(state => state);
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPack,
    selectedPacksTreatments,
    typeOfPayment,
  } = useSessionStore(state => state);

  const { cart, priceDiscount, percentageDiscount, manualPrice } = useCartStore(
    state => state
  );
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const localSelectedDay = dayjs(
    appointment ? appointment.startTime : selectedDay
  );

  const startTime = appointment
    ? appointment?.startTime
      ? appointment.startTime.slice(-5)
      : ''
    : selectedSlot?.startTime;

  let selectedTreatmentTitles: string[] = [];
  if (selectedTreatments) {
    const uniqueProductIds = getUniqueIds(selectedTreatments);
    selectedTreatmentTitles = uniqueProductIds.map(productId => {
      const product = selectedTreatments.find(x => x.id === productId);
      return product ? product.title : '';
    });
  }
  const selectedTreatmentsNames = selectedTreatmentTitles.join(' + ');

  function getProductsMapped(): Product[] {
    const uniqueProductIds = getUniqueIds(selectedTreatments);
    return getUniqueProducts(uniqueProductIds, selectedTreatments);
  }

  useEffect(() => {
    const appointmentClinic = appointment
      ? clinics.filter(clinic => clinic.flowwwId === appointment?.clinicId)[0]
      : undefined;

    const appointmentCity = appointmentClinic ? appointmentClinic.city : '';
    const appointmentAddress = appointmentClinic
      ? appointmentClinic.address
      : '';

    setCity(appointmentCity || selectedClinic?.city || '');
    setAddress(appointmentAddress || selectedClinic?.address || '');
  }, [clinics]);

  const accordionProps: AccordionSingleProps = {
    type: 'single',
    collapsible: true,
    ...(isMobile ? {} : { defaultValue: 'item-1' }),
  };

  const accordionItemProps: AccordionItemProps = {
    value: isMobile ? 'item-2' : 'item-1',
  };

  const TreatmentImage = () => {
    const imgSrc2 = '/images/derma/landingPrecios/rutinaDoctorHolaglow.png';

    return (
      <Flex className="bg-white border-b md:border-r border-derma-secondary400 p-4 w-full justify-center overflow-hidden rounded-t-2xl md:w-2/5 shrink-0 md:rounded-t-none md:rounded-l-2xl">
        <Image
          src={imgSrc2}
          height={100}
          width={165}
          alt="rutina facial derma by Holaglow"
          className="md:relative md:z-10 md:w-4/5"
        />
      </Flex>
    );
  };

  const TreatmentsDashboard = () => {
    return getProductsMapped().map(item => (
      <div key={item.id}>
        <Text className="font-semibold">{item.title}</Text>
        <Text>{item.description}</Text>
      </div>
    ));
  };

  const TreatmentName = ({ className = '' }: { className?: string }) => {
    return (
      <Text className={`font-semibold text-xs md:text-sm ${className}`}>
        {selectedPack ? selectedPack.title : selectedTreatmentsNames}
      </Text>
    );
  };

  const TreatmentDerma = () => {
    return (
      <Flex
        layout="col-left"
        className={`p-4 w-full gap-2 text-xs md:text-sm ${
          !isConfirmation ? '' : ''
        }`}
      >
        <Flex layout="col-left" className="w-full gap-2 mt-2">
          <Text className="font-semibold text-md mb-4">{cart[0].title}</Text>
          {SUBSCRIPTIONS.find(x => x.id == cart[0].id)!.bullets.map(item => (
            <div className="w-full flex items-center gap-2" key={item.text}>
              <div
                className={`flex justify-center items-center rounded-full h-8 w-8 -mt-1 ${
                  item.isEnabled
                    ? 'bg-derma-primary/20 text-hg-black'
                    : 'bg-hg-black100 text-hg-error'
                }`}
              >
                <DynamicIcon
                  family="default"
                  name={item.icon}
                  height={item.isEnabled ? 20 : 14}
                  width={item.isEnabled ? 20 : 14}
                />
              </div>
              <div className="flex flex-col ">
                <Text>{item.text}</Text>
              </div>
            </div>
          ))}
        </Flex>
      </Flex>
    );
  };

  const TreatmentDate = ({ selectedSlot }: { selectedSlot: Slot }) => {
    const doctorInfo = selectedSlot.startTime.startsWith('17')
      ? 'Dra. Pérez · Núm. Colegiada 282886988'
      : 'Dr. Basart · Núm. Colegiado 080856206';

    return (
      <Flex
        layout="col-left"
        className={`p-4 w-full gap-2 text-xs md:text-sm ${
          !isConfirmation ? 'md:px-0' : ''
        }`}
      >
        {isDerma && (
          <div className="w-full flex items-center">
            <SvgStethoscope className="mr-2 shrink-0" />
            <Text>{doctorInfo}</Text>
          </div>
        )}
        <div className="w-full flex items-center">
          <SvgCalendar className="mr-2 shrink-0" />
          <Text>
            <span className="capitalize">
              {localSelectedDay.format('dddd')},{' '}
            </span>
            {localSelectedDay.format('D')} de {localSelectedDay.format('MMMM')}{' '}
            de {localSelectedDay.format('YYYY')}
          </Text>{' '}
        </div>
        {startTime && (
          <div className="w-full flex items-center">
            <SvgHour className="mr-2 shrink-0" />
            {startTime}h
            {isDerma && (
              <span className="inline-block ml-1">consulta online</span>
            )}
          </div>
        )}
        {!isDerma && (
          <div className="w-full flex items-start">
            <SvgLocation className="mr-2 mt-1 shrink-0" />
            <div className="flex flex-col ">
              <Text className="font-semibold">{city}</Text>
              <Text>{address}</Text>
            </div>
          </div>
        )}
        {isDerma && !isUpselling && (
          <Flex
            layout="col-left"
            className="w-full gap-2 mt-2 pt-6 border-t border-derma-secondary400"
          >
            <Text className="font-semibold text-md">Rutina facial</Text>
            {[
              'Espuma limpiadora',
              'Protector solar 50+',
              'Crema facial personalizada',
              'Receta de crema formulada',
            ].map(item => (
              <div className="w-full flex items-start" key={item}>
                <SvgCheckCircle className="mr-2 shrink-0" />
                <div className="flex flex-col ">
                  <Text>{item}</Text>
                </div>
              </div>
            ))}
          </Flex>
        )}
      </Flex>
    );
  };

  const TreatmentPriceBreakdown = ({
    hideTotal = false,
    product,
  }: {
    hideTotal?: boolean;
    product: Product;
  }) => {
    return (
      <div className="w-full">
        <Flex
          layout="col-left"
          className="w-full gap-1 text-xs py-3 rounded-lg"
        >
          <Flex className="justify-between w-full">
            <Text>Importe sin IVA</Text>
            <Text>{(product.price * 0.79).toFixed(2)} €</Text>
          </Flex>
          <Flex className="justify-between w-full ">
            <Text>Impuestos</Text>
            <Text>{(product.price - product.price * 0.79).toFixed(2)} €</Text>
          </Flex>
          {!isProbadorVirtual && product && !hideTotal && (
            <Flex layout="col-left" className="w-full">
              <Flex className="justify-between w-full">
                <Text>Total</Text>
                <Text className="font-semibold">
                  {product.price.toFixed(2)}€
                </Text>
              </Flex>
              {typeOfPayment == TypeOfPayment.Reservation && (
                <div className="border-t border-derma-secondary400 mt-4 pt-4">
                  <Flex className="justify-between w-full">
                    <Text>Pendiente de pago en clínica</Text>
                    <Text className="font-semibold">
                      {(product.price - 49).toFixed(2)}€
                    </Text>
                  </Flex>

                  <p className="bg-derma-secondary100 text-hg-black500 py-3 px-4 mt-2 rounded-xl mb-2">
                    El importe restante se puede abonar en clínica al contado o
                    financiado hasta 18 meses con Pepper, Alma o Frakmenta
                  </p>
                </div>
              )}
            </Flex>
          )}
        </Flex>
      </div>
    );
  };

  const AppointmentDataResume = () => {
    return (
      <Accordion
        {...accordionProps}
        className="w-full mt-auto pb-[2px] pl-[2px] pr-[2px]"
      >
        <AccordionItem {...accordionItemProps}>
          {!isDerma && (
            <>
              <AccordionTrigger className="group md:hidden">
                <Flex className="w-full justify-between p-4">
                  <Flex className="gap-2 text-sm">
                    <SvgBag height={16} width={16} /> Ver resumen del pedido
                  </Flex>
                  <SvgAngleDown className="transition-all group-radix-state-open:rotate-180" />
                </Flex>
              </AccordionTrigger>
              <AccordionContent className="md:border-t border-derma-secondary400 md:pt-2 ">
                <Flex
                  layout="col-left"
                  className={`w-full text-sm px-4 ${
                    !isConfirmation ? 'md:px-0' : ''
                  }`}
                >
                  <Flex layout="col-left" className="w-full py-3">
                    <TreatmentName className="p-0" />
                    {selectedTreatments &&
                    selectedTreatments[0] &&
                    selectedTreatments[0].isPack ? (
                      <ul className="p-1">
                        {selectedPacksTreatments &&
                          selectedPacksTreatments.map(item => {
                            return <li key={item.title}>- {item.title}</li>;
                          })}
                      </ul>
                    ) : selectedTreatments[0] &&
                      !isEmpty(selectedTreatments[0].appliedProducts) ? (
                      selectedTreatments[0].appliedProducts.map(item => {
                        return (
                          <Flex key={item.titlte} className="items-start mb-1">
                            <Text className="text-hg-black400 text-xs md:text-sm">
                              {item.titlte}
                            </Text>
                          </Flex>
                        );
                      })
                    ) : (
                      selectedTreatments[0].description && (
                        <Flex className="items-start mb-2">
                          <Text>{selectedTreatments[0].description}</Text>
                        </Flex>
                      )
                    )}
                  </Flex>

                  {selectedTreatments[0] &&
                    selectedTreatments[0].price > 0 &&
                    !isDashboard && (
                      <TreatmentPriceBreakdown
                        product={selectedTreatments[0]}
                      />
                    )}
                  {selectedPack && selectedPack.price > 0 && (
                    <TreatmentPriceBreakdown product={selectedPack} />
                  )}
                </Flex>
              </AccordionContent>
            </>
          )}

          {isDerma && (
            <>
              <AccordionTrigger className="group md:hidden">
                <Flex className="w-full justify-between p-4">
                  <Flex className="gap-2 text-sm">
                    <SvgBag height={16} width={16} /> Ver resumen del pedido
                  </Flex>
                  <SvgAngleDown className="transition-all group-radix-state-open:rotate-180" />
                </Flex>
              </AccordionTrigger>

              <AccordionContent className="md:border-t border-derma-secondary400 md:pt-2 ">
                <Flex
                  layout="col-left"
                  className={`w-full text-sm px-4 ${!isConfirmation ? '' : ''}`}
                >
                  <Flex layout="col-left" className="w-full py-3">
                    <TreatmentName className="p-0" />
                    {cart && cart[0] && cart[0].isPack ? (
                      <ul className="p-1">
                        {selectedPacksTreatments &&
                          selectedPacksTreatments.map(item => {
                            return <li key={item.title}>- {item.title}</li>;
                          })}
                      </ul>
                    ) : cart[0] && !isEmpty(cart[0].appliedProducts) ? (
                      cart[0].appliedProducts.map(item => {
                        return (
                          <Flex key={item.titlte} className="items-start mb-1">
                            <Text className="text-hg-black400 text-xs md:text-sm">
                              {item.titlte}
                            </Text>
                          </Flex>
                        );
                      })
                    ) : (
                      cart[0].description && (
                        <Flex className="items-start mb-2">
                          <Text>{cart[0].description}</Text>
                        </Flex>
                      )
                    )}
                  </Flex>

                  {cart[0] && cart[0].price > 0 && !isDashboard && (
                    <TreatmentPriceBreakdown product={cart[0]} />
                  )}
                  {selectedPack && selectedPack.price > 0 && (
                    <TreatmentPriceBreakdown product={selectedPack} />
                  )}
                </Flex>
              </AccordionContent>
            </>
          )}
          {!isProbadorVirtual &&
            (selectedTreatments[0] || cart[0]) &&
            !isDashboard && (
              <Flex
                className={`w-full justify-between px-4 py-3 rounded-b-lg md:border-none mt-0.5 ${
                  isDerma
                    ? 'bg-derma-primary500/20 text-derma-primary rounded-br-lg rounded-bl-none'
                    : isConfirmation
                    ? 'text-hg-secondary bg-hg-secondary300'
                    : 'bg-hg-secondary100 text-hg-secondary md:rounded-lg'
                } `}
              >
                <Text>
                  <span className="font-semibold">Total</span>
                  {typeOfPayment == TypeOfPayment.Reservation && ' (Anticipo)'}
                </Text>
                <Text className="font-semibold">
                  {typeOfPayment == TypeOfPayment.Reservation
                    ? '49€'
                    : !isEmpty(cart)
                    ? getTotalFromCart(
                        cart,
                        percentageDiscount,
                        priceDiscount,
                        manualPrice
                      )
                    : `${selectedTreatments[0].price.toFixed(2)}€`}
                </Text>
              </Flex>
            )}
        </AccordionItem>
      </Accordion>
    );
  };

  const AppointmentResumeDashboard = () => {
    return (
      <Accordion
        collapsible={true}
        defaultValue="1"
        type="single"
        className="w-full mt-auto pb-[2px] pl-[2px] pr-[2px]"
      >
        <AccordionItem {...accordionItemProps}>
          <AccordionTrigger className="">
            <Flex className="w-full justify-between p-4">
              <Flex className="gap-2 text-sm">
                <SvgBag height={16} width={16} /> Resumen del pedido
              </Flex>
            </Flex>
          </AccordionTrigger>

          <div className="md:border-t border-derma-secondary400 md:pt-2 py-4 ">
            <Flex
              layout="col-left"
              className={`w-full text-sm px-4 ${
                !isConfirmation ? 'md:px-0' : ''
              }`}
            >
              <TreatmentsDashboard />
            </Flex>
          </div>
        </AccordionItem>
      </Accordion>
    );
  };

  const appointmentComponent = useMemo(() => {
    return (
      <Flex
        layout="col-left"
        className="w-full rounded-xl overflow-hidden md:flex-row md:items-stretch"
      >
        {isDerma && <TreatmentImage />}
        <Flex layout="col-left" className={`w-full ${bgColor}`}>
          {selectedSlot && <TreatmentDate selectedSlot={selectedSlot} />}
          {isDerma && <TreatmentDerma />}
          {!appointment && !isDashboard && <AppointmentDataResume />}
          {isDashboard && <AppointmentResumeDashboard />}
        </Flex>
      </Flex>
    );
  }, [isProbadorVirtual, isDerma, isUpselling, selectedTreatments, address]);

  return appointmentComponent;
}
