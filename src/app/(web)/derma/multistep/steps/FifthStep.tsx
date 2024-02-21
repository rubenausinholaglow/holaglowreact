'use client';

import { Client } from '@interface/client';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FifthStep({
  activeSlideIndex,
  client,
}: {
  activeSlideIndex: number;
  client: Client;
}) {
  return (
    <div>
      {activeSlideIndex === 6 && (
        <Container className="px-0 md:px-4">
          <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
            <div>
              <Container className="md:px-0">
                <Flex layout="col-left" className="w-full">
                  <Flex layout="col-left" className="w-full">
                    <Text className="text-sm text-derma-primary500 mb-2">
                      Último paso. Pago
                    </Text>
                    <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                      Completa tu pedido
                    </Text>
                    <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                      Confirma los datos de tu consulta y completa el pago para
                      reservar tu videollamada
                    </Text>
                  </Flex>
                </Flex>
                <AppointmentResume isDerma />
                <Flex className="text-center" layout="col-center">
                  <div className="mb-4">
                    <img
                      width={200}
                      src="/images/derma/trustpilot-logo.png"
                    ></img>
                  </div>
                  <div className="w-full mb-4">
                    TrustScore <b>4.7</b>
                  </div>
                </Flex>
              </Container>
            </div>
            <Container className="mt-8">
              <CheckoutPayment
                hasError={false}
                className="mt-8"
                formData={client}
                isDerma
              />
            </Container>
          </Flex>
        </Container>
      )}
    </div>
  );
}
