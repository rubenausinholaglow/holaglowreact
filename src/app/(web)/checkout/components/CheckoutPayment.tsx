import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { validateEmail, validatePhone } from '@utils/validators';
import { SvgWarning } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import { PaymentMethods } from './PaymentMethods';

export default function CheckoutPayment({
  className = '',
  hasError = false,
  formData,
}: {
  className?: string;
  hasError: boolean;
  formData: Client;
}) {
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  useEffect(() => {
    if (hasError) {
      const elementToScroll = document.getElementById('checkoutPaymentForm');

      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    setIsPaymentActive(checkFormData(formData));
  }, [formData]);

  function checkFormData(formData: Client) {
    const {
      name,
      surname,
      email,
      phonePrefix,
      phone,
      termsAndConditionsAccepted,
    } = formData;

    const cleanedPhoneNumber =
      phonePrefix === '+34' ? phone.slice(3).replace(/ /g, '') : phone;

    const dataToCheck = {
      name: !isEmpty(name),
      surname: !isEmpty(surname),
      email: validateEmail(email),
      phone:
        (phonePrefix === '+34' && validatePhone(cleanedPhoneNumber)) ||
        (phonePrefix !== '+34' && !isEmpty(phone)),
      termsAndConditionsAccepted: termsAndConditionsAccepted,
    };

    for (const key in dataToCheck) {
      if (
        Object.prototype.hasOwnProperty.call(dataToCheck, key) &&
        (dataToCheck as any)[key] !== true
      ) {
        return false;
      }
    }

    return true;
  }

  return (
    <Flex
      layout="col-left"
      className={`w-full transition-all ${className} ${
        !isPaymentActive ? 'opacity-20 pointer-events-none' : ''
      }`}
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
