'use client';

import Agenda from 'app/(web)/checkout/agenda/Agenda';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgVideo } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ThirdStep({
  activeSlideIndex,
}: {
  activeSlideIndex: number;
}) {
  const { deviceSize } = useSessionStore(state => state);

  return (
    <div>
      {activeSlideIndex === 4 && (
        <>
          <Container className="px-0">
            <Flex layout="col-left" className="w-full">
              <Flex layout="col-left" className="px-4 md:flex-row md:gap-16">
                <Flex layout="col-left" className="w-full gap-4 md:w-1/2">
                  <Text className="text-sm text-derma-primary500 mb-2">
                    Paso {activeSlideIndex + 1}. Agenda
                  </Text>
                  <Text className="font-gtUltraThin font-bold text-xl text-derma-primary md:text-2xl">
                    Selecciona el día y la hora
                  </Text>
                  <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                    Después de la confirmación de la reserva, te enviaremos un
                    whatsapp con los detalles para conectarte a tu consulta.
                  </Text>
                </Flex>

                <ul className="flex flex-col gap-4 mb-8 text-xs text-hg-black500 px-0 md:w-1/2 md:mt-8 md:text-sm">
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
              </Flex>

              <Agenda isDashboard={true} isDerma={true} />
            </Flex>
          </Container>
        </>
      )}
    </div>
  );
}
