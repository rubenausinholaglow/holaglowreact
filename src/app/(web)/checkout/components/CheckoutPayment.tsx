import { useEffect } from 'react';
import { SvgWarning } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import { PaymentMethods } from './PaymentMethods';

export default function CheckoutPayment({
  className = '',
  hasError = false,
}: {
  className?: string;
  hasError: boolean;
}) {
  useEffect(() => {
    if (hasError) {
      const elementToScroll = document.getElementById('checkoutPaymentForm');

      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <Flex
      layout="col-left"
      className={`w-full ${className}`}
      id="checkoutPaymentForm"
    >
      <Title size="xl" className="font-semibold mb-4">
        Selecciona método de pago
      </Title>

      {hasError && (
        <Flex className="bg-hg-error100 text-hg-error text-xs gap-3 px-4 py-3 rounded-xl w-full mb-4">
          <SvgWarning width={22} height={22} />
          <div>
            <Text className="font-semibold mb-1">Ha habido un error</Text>
            <Text>Inténtalo de nuevo o cambia el método de pago</Text>
          </div>
        </Flex>
      )}

      <Text className="text-hg-black500 text-sm mb-4">
        Paga ahora un anticipo del tratamiento de 49 € en concepto de reserva
      </Text>

      <PaymentMethods />
    </Flex>
  );
}
