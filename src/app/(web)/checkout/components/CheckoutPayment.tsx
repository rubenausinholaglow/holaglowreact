import { Client } from '@interface/client';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import { PaymentMethods } from './PaymentMethods';

export default function CheckoutPayment({
  className = '',
  client,
}: {
  className?: string;
  client?: Client;
}) {
  return (
    <Flex layout="col-left" className={`w-full ${className}`}>
      <Title size="xl" className="font-semibold mb-4">
        Selecciona método de pago
      </Title>

      <Text className="text-hg-black500 text-sm">
        Paga ahora un anticipo del tratamiento de 49 € en concepto de reserva
      </Text>

      <PaymentMethods />
    </Flex>
  );
}
