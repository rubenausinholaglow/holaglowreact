'use client';

import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgHour, SvgLocation } from 'icons/Icons';
import {
  SvgArrow,
  SvgCheck,
  SvgCheckCircle,
  SvgRadioChecked,
} from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function ConfirmationCheckout() {
  const router = useRouter();
  const { selectedTreatments, selectedSlot, selectedDay } =
    useGlobalPersistedStore(state => state);
  const localSelectedDay = dayjs(selectedDay);
  let selectedTreatmentsNames = '';
  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments!.map(x => x.title).join(' + ');
    selectedTreatmentsDesc = selectedTreatments
      .map(x => x.description)
      .join(' + ');
  }
  return (
    <MainLayout hideFooter>
      <Container className="mt-12 mb-4 md:mt-16">
        <div className="md:w-1/2 pr-8">
          <SvgCheck
            height={88}
            width={88}
            className="bg-hg-secondary300 text-hg-primary rounded-full p-3 mx-auto mb-8"
          />
        </div>
        <div className="md:grid grid-cols-2 gap-16">
          <div className="w-full">
            <Flex layout="col-left" className="w-full items-center">
              <Text className="font-semibold text-center" size="xl">
                ¡Gracias!
              </Text>
              <Text className="font-semibold text-center mb-4" size="xl">
                Tu cita ha sido realizada con éxito
              </Text>

              <Text className="text-center hidden md:block">
                Nos alegramos de que confíes en nosotros para acompañarte,
                aconsejarte y ayudarte a conseguir el efecto glow que deseas.
                Nuestro propósito es que te mires bonito para que te sientas aún
                mejor. ¡Qué ganas de verte!
              </Text>
            </Flex>
          </div>
          <div className="row-span-2 w-full">
            <Text className="hidden md:block mb-6 text-xs">
              Resumen de tu cita
            </Text>
            <div className="bg-hg-black text-white p-4 gap-2 rounded-xl">
              <div className="w-full mt-3 pb-3 flex items-center">
                <SvgCalendar className="mr-2" />
                <Text className="font-semibold">
                  {localSelectedDay.format('dddd')},{' '}
                  {localSelectedDay.format('D')} de{' '}
                  {localSelectedDay.format('MMMM')} de{' '}
                  {localSelectedDay.format('YYYY')}
                </Text>              </div>
              <div className="w-full pb-3 flex items-center">
                <SvgHour className="mr-2" />
 <Text className="font-semibold">{selectedSlot?.startTime}</Text>
              </div>
              <div className="w-full flex items-start pb-3 border-b border-hg-black700">
                <SvgLocation className="mr-2 mt-1" />
                <div className="flex flex-col">
    <Text className="font-semibold">{selectedClinic?.city}</Text>
                  <Text size="xs">{selectedClinic?.address}</Text>
                </div>
              </div>
              <div className="w-full flex items-start pt-4 text-hg-primary">
                <div className="flex flex-col">
                  <Text className="font-semibold">
                    {selectedTreatmentsNames}
                  </Text>
                    <Text>{selectedTreatmentsDesc}</Text>
                </div>
              </div>
            </div>
            <div className="pt-12">
              <Button
                type="tertiary"
                size="md"
                className={`hidden lg:block 2xl:mr-20`}
                customStyles="group-hover:bg-hg-secondary100"
              >
                <Flex layout="row-center">
                  <span className="font-semibold">Ver tratamientos</span>
                  <SvgArrow height={18} width={18} className="ml-2" />
                </Flex>
              </Button>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mb-6">
              <Text className="font-semibold  text-left" size="xl">
                A partir de ahora...
              </Text>
            </div>
            <Flex
              layout="col-left"
              className="bg-hg-secondary100 p-4 rounded-xl gap-4"
            >
              <Flex className="border-b border-hg-secondary300 pb-4 items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  1
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Confirmación de tu cita
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    Desde este momento, estaremos en contacto contigo por
                    teléfono para resolver todas tus dudas y confirmar la cita.
                  </Text>
                </div>
              </Flex>
              <Flex className="border-b border-hg-secondary300 pb-4 items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  2
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Recomendaciones pretratamiento
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    En la página web podrás consultar algunos consejos del
                    equipo médico para tener en cuenta antes de tu cita.
                  </Text>
                </div>
              </Flex>
              <Flex className="items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  3
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Distintos métodos de pago
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    El día de tu visita a la clínica, podrás elegir el método de
                    pago que mejor se adapte a ti, incluso financiación sin
                    intereses.
                  </Text>
                </div>
              </Flex>
            </Flex>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
