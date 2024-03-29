'use client';

import Agenda from 'app/(web)/checkout/agenda/Agenda';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgVideo } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function AgendaDerma() {
  return (
    <>
      <DermaLayout hideButton={true} hideFooter={true}>
        <Container className="px-0">
          <Flex layout="col-left" className="w-full">
            <Flex
              layout="col-left"
              className="px-4 md:flex-row md:gap-16 w-full"
            >
              <Flex layout="col-left" className="w-full">
                <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                  Selecciona el día y la hora
                </Text>
                <ul className="flex flex-col gap-4 mb-4 text-xs text-hg-black500 px-0 md:w-1/2 md:text-sm">
                  <li className="flex gap-2">
                    <SvgStethoscope className="h-5 w-5" />
                    Consulta online con dermatólogo especializado.
                  </li>
                  <li className="flex gap-2">
                    <SvgVideo className="h-6 w-6" />
                    Te enviaremos un whatsapp con los detalles para conectarte a
                    tu consulta.
                  </li>
                </ul>
              </Flex>
            </Flex>

            <Agenda isDashboard={true} isDerma={true} isCheckout={true} />
          </Flex>
        </Container>
      </DermaLayout>
    </>
  );
}
