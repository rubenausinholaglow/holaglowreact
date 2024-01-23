'use client';

import { Client } from '@interface/client';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function FourthStep({
  activeSlideIndex,
  name,
  client,
  setClient,
}: {
  activeSlideIndex: number;
  name: string;
  client: Client;
  setClient: any;
}) {
  return (
    <div>
      {activeSlideIndex === 5 && (
        <Container className="px-0 md:px-4">
          <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
            <div>
              <Container className="md:px-0">
                <Flex layout="col-left" className="w-full">
                  <Flex layout="col-left" className="w-full">
                    <Text className="text-sm text-derma-primary500 mb-2">
                      Último paso. Formulario y pago
                    </Text>
                    <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                      ¡Ya casi lo tienes, {name}! <br></br> Estás a punto de
                      conseguir tu tratamiento personalizado
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
              </Container>
              <AppointmentResume isProbadorVirtual={false} isDerma />
            </div>
            <Container className="mt-8">
              <Text className="font-gtUltraThin font-semibold mb-4 text-derma-tertiary text-xl md:text-2xl">
                Reserva tu cita
              </Text>
              <RegistrationForm
                showPostalCode={true}
                redirect={false}
                hasContinueButton={false}
                formData={client}
                setClientData={setClient}
              />
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
