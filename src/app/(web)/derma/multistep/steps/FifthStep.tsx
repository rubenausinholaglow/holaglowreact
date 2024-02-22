'use client';

import { Client } from '@interface/client';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

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
            <div className="md:w-1/2">
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
                      Confirma los datos de tu pedido y completa el pago para
                      recibir tu rutina personalizada en casa
                    </Text>
                  </Flex>
                </Flex>
                <AppointmentResume isDerma />
              </Container>
            </div>
            <Container className="mt-8 md:w-1/2">
              <Flex className="text-center" layout="col-left">
                <div className="mb-4">
                  <Image
                    width={200}
                    height={200}
                    alt="TrustPilot"
                    src="/images/derma/trustpilot-logo.png"
                  />
                </div>
                <Text className="ml-4 mb-4">
                  TrustScore <b>4.7</b>
                </Text>
              </Flex>
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
