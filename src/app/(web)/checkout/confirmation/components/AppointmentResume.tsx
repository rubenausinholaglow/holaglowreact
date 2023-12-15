import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import { getDiscountedPrice } from '@utils/common';
import { priceFormat } from '@utils/priceFormat';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgCalendar, SvgHour, SvgLocation } from 'app/icons/Icons';
import { SvgInjection } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function AppointmentResume({
  appointment,
}: {
  appointment?: Appointment;
}) {
  const { clinics } = useGlobalPersistedStore(state => state);

  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    setAnalyticsMetrics,
  } = useSessionStore(state => state);

  const [discountedPrice, setDiscountedPrice] = useState<null | []>(null);
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

  console.log(selectedTreatments);

  return (
    <Flex layout="col-left" className="w-full px-4 md:px-0 md:pr-8 pb-8">
      <Text className="text-lg font-semibold mb-4">
        Detalle de tu tratamiento
      </Text>

      <div className="w-full">
        <Flex
          layout="col-left"
          className="w-full gap-4 text-sm border-b border-hg-black300 pb-6 mb-6"
        >
          <div className="w-full flex items-start">
            <SvgLocation className="mr-2 mt-1" />
            <div className="flex flex-col text-sm">
              <Text className="font-semibold">{city}</Text>
              <Text>{address}</Text>
            </div>
          </div>
          <div className="w-full flex items-center">
            <SvgCalendar className="mr-2" />
            <Text className="font-semibold capitalize">
              {localSelectedDay.format('dddd')}, {localSelectedDay.format('D')}{' '}
              de {localSelectedDay.format('MMMM')} de{' '}
              {localSelectedDay.format('YYYY')}
            </Text>{' '}
          </div>
          <div className="w-full flex items-center">
            <SvgHour className="mr-2" />
            <Text className="font-semibold">{startTime}h</Text>
          </div>
        </Flex>
        {!appointment && (
          <Flex
            layout="col-left"
            className="w-full gap-4 text-sm border-b border-hg-black300 pb-6 mb-6"
          >
            <div className="flex flex-col">
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
                    <Flex key={item.titlte} className="items-start mb-1">
                      <Text className="text-hg-black400 text-sm">
                        {item.titlte} ola
                      </Text>
                    </Flex>
                  );
                })
              ) : (
                <Flex className="items-start mb-2">
                  <SvgInjection
                    height={16}
                    width={16}
                    className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                  />
                  {selectedTreatments[0] && (
                    <Text>{selectedTreatments[0].description}</Text>
                  )}
                </Flex>
              )}
            </div>
          </Flex>
        )}
        <Flex
          layout="col-left"
          className="w-full gap-4 text-sm text-hg-black400 border-b border-hg-black300 pb-6 mb-6"
        >
          <Flex className="justify-between w-full">
            <Text>Importe sin IVA</Text>
            <Text className="font-semibold">
              {(selectedTreatments[0].price * 0.79).toFixed(2)}€
            </Text>
          </Flex>
          <Flex className="justify-between w-full">
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

        <Flex layout="col-left" className="w-full gap-4 text-sm ">
          <Flex className="justify-between w-full">
            <Text>Total</Text>
            <Text className="font-semibold">
              {selectedTreatments[0].price.toFixed(2)}€
            </Text>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
}
