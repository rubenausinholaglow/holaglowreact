'use client';

import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgCheck, SvgHour, SvgLocation } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function ConfirmationCheckout() {
  const router = useRouter();
  const { selectedTreatments } = useGlobalPersistedStore(state => state);
  const { selectedSlot } = useGlobalPersistedStore(state => state);
  const { selectedDay } = useGlobalPersistedStore(state => state);
  const { selectedClinic } = useGlobalPersistedStore(state => state);

  const localSelectedDay = dayjs(selectedDay);
  let selectedTreatmentsNames = '';
  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments!.map(x => x.title).join(' + ');
  }
  return (
    <MainLayout>
      <Container className="mb-11">
        <Flex layout="col-left" className="md:flex-row items-stretch">
          <div className="w-full md:w-1/2 bg-hg-turquoise p-8 rounded-xl ">
            <div className="flex items-center justify-center mt-16 mb-8">
              <SvgCheck
                width={88}
                height={88}
                fill={HOLAGLOW_COLORS['secondary']}
                className="text-hg-primary"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center mb-6">
              <Text className="font-semibold text-center mb-2" size="xl">
                ¡Gracias!
              </Text>
              <Text className="font-semibold text-center" size="xl">
                Tu cita ha sido realizada con éxito
              </Text>
            </div>
            <div className="w-full flex flex-col justify-center items-center mb-12">
              <Text className="text-center">
                Nos alegramos de que confíes en nosotros para acompañarte,
                aconsejarte y ayudarte a conseguir el efecto glow que deseas.
                Nuestro propósito es que te mires bonito para que te sientas aún
                mejor. ¡Qué ganas de verte!
              </Text>
            </div>

            <div className="w-full mb-6">
              <Text className="font-semibold  text-left" size="xl">
                A partir de ahora...
              </Text>
            </div>
            <div className="bg-hg-secondary300 px-4 gap-2 rounded-xl">
              <div className="flex flex-row gap-4 border-hg-secondary border-b-2 py-4">
                <div className="bg-hg-black w-6 h-6 p-4 rounded-full flex justify-center items-center gap-4">
                  <Text className="font-semibold items-center text-hg-primary">
                    1
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text className="font-semibold">Confirmación de tu cita</Text>
                  <Text>
                    Desde este momento, estaremos en contacto contigo por
                    teléfono para resolver todas tus dudas y confirmar la cita.
                  </Text>
                </div>
              </div>
              <div className="flex flex-row gap-4 border-hg-secondary border-b-2 py-4">
                <div className="bg-hg-black w-6 h-6 p-4 rounded-full flex justify-center items-center gap-4">
                  <Text className="font-semibold items-center text-hg-primary">
                    2
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text className="font-semibold">
                    Recomendaciones pretratamiento
                  </Text>
                  <Text>
                    En la página web podrás consultar algunos consejos del
                    equipo médico para tener en cuenta antes de tu cita.
                  </Text>
                </div>
              </div>
              <div className="flex flex-row gap-4 py-4">
                <div className="bg-hg-black w-6 h-6 p-4 rounded-full flex justify-center items-center gap-4">
                  <Text className="font-semibold items-center text-hg-primary">
                    3
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text className="font-semibold">
                    Distintos métodos de pago
                  </Text>
                  <Text>
                    El día de tu visita a la clínica, podrás elegir el método de
                    pago que mejor se adapte a ti, incluso financiación sin
                    intereses.
                  </Text>
                </div>
              </div>
            </div>
            {localSelectedDay != undefined && (
              <Flex>
                <b>
                  {localSelectedDay.format('dddd')},{' '}
                  {localSelectedDay.format('D')},{' '}
                  {localSelectedDay.format('MMMM')}
                </b>
                {selectedSlot?.startTime}
              </Flex>
            )}
          </div>
          <div className="w-full md:w-1/2 p-8 rounded-xl items-end">
            <Text className="mb-6">Resumen de tu cita</Text>
            <div className="bg-hg-black text-white p-4 gap-2 rounded-xl">
              <div className="w-full mt-3 pb-4 flex items-center">
                <SvgCalendar className="mr-2" />
                <Text className="font-semibold">Viernes 9 de Junio, 2023</Text>
              </div>
              <div className="w-full pb-4 flex items-center">
                <SvgHour className="mr-2" />
                <Text className="font-semibold">15:30h</Text>
              </div>
              <div className="w-full flex items-start pb-4 border-b-2 border-hg-black500">
                <SvgLocation className="mr-2 mt-1" />
                <div className="flex flex-col">
                  <Text className="font-semibold">Madrid Argüelles</Text>
                  <Text>C. de Andrés Mellado 3, 28015, Madrid</Text>
                </div>
              </div>
              <div className="w-full flex items-start pt-4 text-hg-primary">
                <div className="flex flex-col">
                  <Text className="font-semibold">
                    {selectedTreatmentsNames}
                  </Text>
                  <Text>1 vial de ácido hialurónico</Text>
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
        </Flex>
      </Container>
    </MainLayout>
  );
}
