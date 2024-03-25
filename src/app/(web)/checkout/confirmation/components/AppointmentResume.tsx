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
}: {
  appointment?: Appointment;
  isProbadorVirtual?: boolean;
  isDerma?: boolean;
  isUpselling?: boolean;
  bgColor?: string;
  isDashboard?: boolean;
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

  const TreatmentImage = ({ selectedSlot }: { selectedSlot: Slot }) => {
    const imgSrc = '/images/derma/upselling/rutinaFacial2.png';
    const imgSrc2 = selectedSlot.startTime.startsWith('17')
      ? '/images/derma/upselling/Perez.png'
      : '/images/derma/upselling/Basart.png';
    const imgAlt2 = selectedSlot.startTime.startsWith('17')
      ? 'Dr. Pérez'
      : 'Dra. Basart';

    return (
      <Flex className="bg-derma-secondary300 p-4 w-full justify-center overflow-hidden rounded-t-2xl md:w-2/5 shrink-0 md:rounded-t-none md:rounded-l-2xl">
        <Image
          src={imgSrc}
          height={100}
          width={165}
          alt="rutina facial derma by Holaglow"
          className="md:relative md:left-16 md:top-[70px] md:z-10 md:w-4/5"
        />
        <Image
          src={imgSrc2}
          height={100}
          width={165}
          alt={imgAlt2}
          className="md:relative md:right-12 md:bottom-16 md:w-4/5"
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

  const TreatmentName = () => {
    if (selectedPack)
      return <Text className="font-semibold">{selectedPack.title}</Text>;
    return <Text className="font-semibold">{selectedTreatmentsNames}</Text>;
  };

  const TreatmentDate = ({ selectedSlot }: { selectedSlot: Slot }) => {
    const doctorInfo = selectedSlot.startTime.startsWith('17')
      ? 'Dra. Pérez · Núm. Colegiada 282886988'
      : 'Dr. Basart · Núm. Colegiado 080856206';

    return (
      <Flex layout="col-left" className="w-full gap-2 text-sm">
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
            className="w-full gap-2 mt-2 pt-6 border-t border-hg-black300"
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
          className="w-full gap-2 text-xs text-hg-black400 bg-white/50 p-2 rounded-lg mb-4"
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
            <Flex layout="col-left" className="w-full gap-2 ">
              <Flex className="justify-between w-full">
                <Text>Total</Text>
                <Text className="font-semibold">
                  {product.price.toFixed(2)}€
                </Text>
              </Flex>
              {typeOfPayment == TypeOfPayment.Reservation && (
                <Flex className="justify-between w-full">
                  <Text>Pendiente de pago en clínica</Text>
                  <Text className="font-semibold">
                    {(product.price - 49).toFixed(2)}€
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </div>
    );
  };

  const AppointmentDataResume = () => {
    return (
      <Accordion {...accordionProps} className="w-full mt-2">
        <AccordionItem {...accordionItemProps}>
          {!isDerma && (
            <>
              <AccordionTrigger className="group md:hidden">
                <Flex className="transition-all bg-hg-secondary100 group-radix-state-open:bg-hg-secondary300 w-full justify-between px-4 py-3 rounded-lg">
                  <Flex className="gap-2 text-sm">
                    <SvgBag height={16} width={16} /> Ver resumen del pedido
                  </Flex>
                  <SvgAngleDown className="transition-all group-radix-state-open:rotate-180" />
                </Flex>
              </AccordionTrigger>

              <AccordionContent className="md:border-t md:pt-4">
                <Flex
                  layout="col-left"
                  className="w-full gap-4 text-sm p-4 md:p-0"
                >
                  {isDashboard ? (
                    <TreatmentsDashboard />
                  ) : (
                    <Flex layout="col-left" className="w-full gap-2">
                      <TreatmentName />
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
                            <Flex
                              key={item.titlte}
                              className="items-start mb-1"
                            >
                              <Text className="text-hg-black400 text-sm">
                                {item.titlte}
                              </Text>
                            </Flex>
                          );
                        })
                      ) : (
                        <Flex className="items-start mb-2">
                          {selectedTreatments[0] && (
                            <Text>{selectedTreatments[0].description}</Text>
                          )}
                        </Flex>
                      )}
                    </Flex>
                  )}
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

          {!isProbadorVirtual && selectedTreatments[0] && !isDashboard && (
            <Flex
              className={`w-full justify-between px-4 py-3 rounded-lg md:border-none mt-0.5 ${
                isDerma
                  ? 'bg-derma-primary500/20 text-derma-primary'
                  : 'bg-hg-secondary300 text-hg-secondary md:rounded-lg'
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

  const appointmentComponent = useMemo(() => {
    return (
      <Flex
        layout="col-left"
        className="w-full rounded-xl overflow-hidden md:flex-row md:items-stretch"
      >
        {isDerma && selectedSlot && (
          <TreatmentImage selectedSlot={selectedSlot} />
        )}
        <Flex layout="col-left" className={`p-4 w-full gap-3 ${bgColor}`}>
          <TreatmentName />
          {selectedSlot && <TreatmentDate selectedSlot={selectedSlot} />}
          {/* {isDerma && <TreatmentPriceBreakdown hideTotal />} */}
          {!appointment && <AppointmentDataResume />}
        </Flex>
      </Flex>
    );
  }, [isProbadorVirtual, isDerma, isUpselling, selectedTreatments, address]);

  return appointmentComponent;
}
