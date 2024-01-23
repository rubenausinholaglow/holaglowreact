import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import {
  Accordion,
  AccordionItemProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';
import {
  SvgAngleDown,
  SvgCalendar,
  SvgHour,
  SvgLocation,
} from 'app/icons/Icons';
import { SvgBag } from 'app/icons/IconsDs';
import { SvgCrema } from 'app/icons/suggestionIcons';
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

export default function AppointmentResume({
  appointment,
  isProbadorVirtual,
  isConfirmation = false,
  isDerma = false,
}: {
  appointment?: Appointment;
  isProbadorVirtual: boolean;
  isConfirmation?: boolean;
  isDerma?: boolean;
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

  if (deviceSize.isMobile && isProbadorVirtual && !isConfirmation) return <></>;

  return (
    <Flex
      layout="col-left"
      className={`w-full md:px-0 ${!isDerma ? 'px-4 md:pr-8' : ''}`}
    >
      {!isDerma && (
        <Text
          className={`mb-4 hidden md:block ${
            isConfirmation ? 'text-sm' : 'text-lg font-semibold'
          }`}
        >
          Detalle de tu tratamiento
        </Text>
      )}

      <div
        className={`w-full rounded-xl overflow-hidden ${
          isConfirmation ? 'bg-hg-secondary100 p-4' : 'bg-white'
        }`}
      >
        <Flex
          layout="col-left"
          className={`w-full gap-4 text-sm px-4 pt-4 ${
            !isDerma ? 'md:p-0' : ''
          }`}
        >
          <div className="w-full flex items-center">
            <SvgCalendar className="mr-2" />
            <Text className="font-semibold capitalize">
              {localSelectedDay.format('dddd')}, {localSelectedDay.format('D')}{' '}
              de {localSelectedDay.format('MMMM')} de{' '}
              {localSelectedDay.format('YYYY')}
            </Text>{' '}
          </div>
          <div className="w-full flex items-center ">
            <SvgHour className="mr-2" />
            <Text className="font-semibold">{startTime}h</Text>
          </div>
          {!isDerma && (
            <div className="w-full flex items-start pb-6 border-b border-hg-black300 mb-6">
              <SvgLocation className="mr-2 mt-1" />
              <div className="flex flex-col text-sm">
                <Text className="font-semibold">{city}</Text>
                <Text>{address}</Text>
              </div>
            </div>
          )}

          {isDerma && (
            <div className="w-full flex items-start pb-6">
              <SvgCrema className="mr-2 mt-1 h-4 w-4 shrink-0" />
              <Text>
                Receta para crema formulada especialmente para tu piel
              </Text>
            </div>
          )}
        </Flex>

        {!appointment && (!deviceSize.isMobile || !isProbadorVirtual) && (
          <Accordion {...accordionProps}>
            <AccordionItem {...accordionItemProps}>
              {!isDerma && (
                <>
                  <AccordionTrigger className="group md:hidden">
                    <Flex className="transition-all bg-hg-secondary100 group-radix-state-open:bg-hg-secondary300 w-full justify-between px-4 py-3 border-x border-white">
                      <Flex className="gap-2 text-sm">
                        <SvgBag height={16} width={16} /> Ver resumen del pedido
                      </Flex>
                      <SvgAngleDown className="transition-all group-radix-state-open:rotate-180" />
                    </Flex>
                  </AccordionTrigger>

                  <AccordionContent>
                    <Flex
                      layout="col-left"
                      className="w-full gap-4 text-sm pt-6 px-4 md:px-0 md:pt-0"
                    >
                      <div className="flex flex-col w-full mb-3">
                        <Text className="font-semibold mb-2">
                          {selectedTreatmentsNames}
                        </Text>
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
                      </div>
                    </Flex>
                    {selectedTreatments[0] &&
                      selectedTreatments[0].price > 0 && (
                        <Flex
                          layout="col-left"
                          className="w-full gap-4 text-sm text-hg-black400 px-4 md:px-0"
                        >
                          <Flex className="justify-between w-full">
                            <Text>Importe sin IVA</Text>
                            <Text className="font-semibold">
                              {(selectedTreatments[0].price * 0.79).toFixed(2)}€
                            </Text>
                          </Flex>
                          <Flex className="justify-between w-full border-b border-hg-black300 pb-6 mb-6">
                            <Text>Impuestos</Text>
                            <Text className="font-semibold">
                              {(
                                selectedTreatments[0].price -
                                selectedTreatments[0].price * 0.79
                              ).toFixed(2)}
                              €
                            </Text>
                          </Flex>
                        </Flex>
                      )}

                    {!isProbadorVirtual && selectedTreatments[0] && (
                      <Flex
                        layout="col-left"
                        className="w-full gap-4 text-sm px-4 pb-6 md:px-0"
                      >
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
                  </AccordionContent>
                </>
              )}

              {!isProbadorVirtual && selectedTreatments[0] && (
                <Flex
                  className={`w-full justify-between px-4 py-3 border border-white rounded-b-xl md:border-none ${
                    isDerma
                      ? 'bg-derma-primary500/20 text-derma-primary'
                      : 'bg-hg-secondary100 text-hg-secondary md:rounded-xl'
                  } `}
                >
                  <Text>
                    <span className="font-semibold">
                      {isDerma ? 'Pago único' : 'Pagar ahora'}
                    </span>
                    {typeOfPayment == TypeOfPayment.Reservation &&
                      ' (Anticipo)'}
                  </Text>
                  <Text className="font-semibold">
                    {isDerma
                      ? `${selectedTreatments[0].price.toFixed(2)}€`
                      : '49€'}
                  </Text>
                </Flex>
              )}
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </Flex>
  );
}
