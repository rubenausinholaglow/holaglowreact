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
                      ¡Ya casi lo tienes, {client.name}
                      <br></br> Estás a punto de conseguir tu tratamiento
                      personalizado
                    </Text>
                    <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                      Durante tu consulta, tu médico analizará las
                      características de tu piel y te recomendará un plan de
                      cuidado facial eficaz para conseguir tus objetivos.
                      Además, en caso de que sea necesario, te facilitará la
                      receta de una crema formulada exclusivamente para ti.{' '}
                      <br></br>Los detalles de tu cita online se proporcionarán
                      por Whatsapp al pagar.
                    </Text>
                  </Flex>
                </Flex>
                <AppointmentResume isDerma />
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
