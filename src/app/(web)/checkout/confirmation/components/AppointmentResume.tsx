import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import {
  Accordion,
  AccordionItemProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';
import { getTotalFromCart } from '@utils/utils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { DERMA_APPOINTMENT_IMAGE } from 'app/(web)/derma/planes/mockedData';
import {
  SvgAngleDown,
  SvgCalendar,
  SvgHour,
  SvgLocation,
} from 'app/icons/Icons';
import { SvgBag } from 'app/icons/IconsDs';
import {
  TypeOfPayment,
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function AppointmentResume({
  appointment,
  isProbadorVirtual = false,
  isDerma = false,
  isUpselling = false,
  bgColor = 'bg-white',
}: {
  appointment?: Appointment;
  isProbadorVirtual?: boolean;
  isDerma?: boolean;
  isUpselling?: boolean;
  bgColor?: string;
}) {
  const { clinics } = useGlobalPersistedStore(state => state);
  const {
    deviceSize,
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
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

  let selectedTreatmentsNames = '';

  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments.map(x => x.title).join(' + ');
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
    ...(deviceSize.isMobile ? {} : { defaultValue: 'item-1' }),
  };

  const accordionItemProps: AccordionItemProps = {
    value: deviceSize.isMobile ? 'item-2' : 'item-1',
  };

  const TreatmentImage = ({ id }: { id: string }) => {
    let imgSrc = '';

    DERMA_APPOINTMENT_IMAGE.map(item => {
      if (item.ids.includes(id)) {
        imgSrc = item.imgSrc;
      }
    });

    imgSrc =
      imgSrc === '' ? '/images/derma/upselling/rutinaFacial.png' : imgSrc;

    return (
      <Flex className="bg-derma-secondary300 p-4 w-full justify-center overflow-hidden rounded-t-2xl">
        <Image src={imgSrc} height={100} width={160} alt="seguimiento" />
      </Flex>
    );
  };

  const TreatmentName = () => {
    return <Text className="font-semibold">{selectedTreatmentsNames}</Text>;
  };

  const TreatmentDate = () => {
    return (
      <Flex layout="col-left" className="w-full gap-2 text-sm">
        <div className="w-full flex items-center">
          <SvgCalendar className="mr-2" />
          <Text className="capitalize">
            {localSelectedDay.format('dddd')}, {localSelectedDay.format('D')} de{' '}
            {localSelectedDay.format('MMMM')} de{' '}
            {localSelectedDay.format('YYYY')}
          </Text>{' '}
        </div>
        {startTime && (
          <div className="w-full flex items-center">
            <SvgHour className="mr-2" />
            {startTime}h
          </div>
        )}
        <div className="w-full flex items-start">
          <SvgLocation className="mr-2 mt-1" />
          <div className="flex flex-col ">
            <Text className="font-semibold">{city}</Text>
            <Text>{address}</Text>
          </div>
        </div>
      </Flex>
    );
  };

  const TreatmentPriceBreakdown = ({
    hideTotal = false,
  }: {
    hideTotal?: boolean;
  }) => {
    return (
      <div className="w-full">
        <Flex
          layout="col-left"
          className="w-full gap-2 text-xs text-hg-black400 bg-hg-black50 p-2 rounded-lg mb-4"
        >
          <Flex className="justify-between w-full">
            <Text>Importe sin IVA</Text>
            <Text>{(selectedTreatments[0].price * 0.79).toFixed(2)} €</Text>
          </Flex>
          <Flex className="justify-between w-full ">
            <Text>Impuestos</Text>
            <Text>
              {(
                selectedTreatments[0].price -
                selectedTreatments[0].price * 0.79
              ).toFixed(2)}{' '}
              €
            </Text>
          </Flex>
          {!isProbadorVirtual && selectedTreatments[0] && !hideTotal && (
            <Flex layout="col-left" className="w-full gap-2">
              <Flex className="justify-between w-full">
                <Text>Total</Text>
                <Text className="font-semibold">
                  {selectedTreatments[0].price.toFixed(2)}€
                </Text>
              </Flex>
              {typeOfPayment == TypeOfPayment.Reservation && (
                <Flex className="justify-between w-full">
                  <Text>Pendiente de pago en clínica</Text>
                  <Text className="font-semibold">
                    {(selectedTreatments[0].price - 49).toFixed(2)}€
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
                          <Flex key={item.titlte} className="items-start mb-1">
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
                  {selectedTreatments[0] && selectedTreatments[0].price > 0 && (
                    <TreatmentPriceBreakdown />
                  )}
                </Flex>
              </AccordionContent>
            </>
          )}

          {!isProbadorVirtual && selectedTreatments[0] && (
            <Flex
              className={`w-full justify-between px-4 py-3 rounded-lg md:border-none mt-0.5 ${
                isDerma
                  ? 'bg-derma-primary500/20 text-derma-primary'
                  : 'bg-hg-secondary300 text-hg-secondary md:rounded-lg'
              } `}
            >
              <Text>
                <span className="font-semibold">
                  {isDerma ? 'Pago único' : 'Pagar ahora'}
                </span>
                {typeOfPayment == TypeOfPayment.Reservation && ' (Anticipo)'}
              </Text>
              <Text className="font-semibold">
                {isDerma
                  ? getTotalFromCart(
                      cart,
                      percentageDiscount,
                      priceDiscount,
                      manualPrice
                    )
                  : '49€'}
              </Text>
            </Flex>
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <Flex layout="col-left" className="w-full rounded-xl overflow-hidden">
      {isUpselling && <TreatmentImage id={selectedTreatments[0].id} />}
      <Flex layout="col-left" className={`p-4 w-full gap-3 ${bgColor}`}>
        <TreatmentName />
        <TreatmentDate />
        {isUpselling && <TreatmentPriceBreakdown hideTotal />}
        {!appointment && <AppointmentDataResume />}
      </Flex>
    </Flex>
  );
}
