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
              <Flex
                layout="col-left"
                className="px-4 md:flex-row md:gap-16 w-full"
              >
                <Flex layout="col-left" className="w-full">
                  <Text className="text-sm text-derma-primary500 mb-2">
                    Paso {activeSlideIndex + 1}. Agenda
                  </Text>
                  <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                    Selecciona el día y la hora
                  </Text>
                  <ul className="flex flex-col gap-4 mb-4 text-xs text-hg-black500 px-0 md:w-1/2 md:mt-8 md:text-sm">
                    <li className="flex gap-2">
                      <SvgStethoscope />
                      Consulta online con dermatólogo especializado.
                    </li>
                    <li className="flex gap-2">
                      <SvgVideo />
                      Te enviaremos un whatsapp con los detalles para conectarte
                      a tu consulta.
                    </li>
                  </ul>
                </Flex>
              </Flex>

              <Agenda isDashboard={true} isDerma={true} />
            </Flex>
          </Container>
        </>
      )}
    </div>
  );
}
