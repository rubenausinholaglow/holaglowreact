'use client';

import 'react-international-phone/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { useEffect, useRef, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { fetchProduct } from '@utils/fetch';
import ROUTES from '@utils/routes';
import * as errorsConfig from '@utils/textConstants';
import * as utils from '@utils/validators';
import {
  SvgCalling,
  SvgCheckSquare,
  SvgCheckSquareActive,
  SvgWhatsapp,
} from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'designSystem/Dialog/Dialog';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function FloatingBottomBar({
  product,
  threshold,
  isVisible = true,
  className = '',
}: {
  product?: Product;
  threshold?: number;
  isVisible?: boolean;
  className?: string;
}) {
  const { setSelectedTreatments, setSelectedPack } = useSessionStore(
    state => state
  );
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    phonePrefix: '',
    termsAndConditionsAccepted: false,
  });
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);

  const [medicalVisitProduct, setMedicalVisitProduct] = useState<Product>();

  let url =
    'https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Holaglow%20y%20vuestros%20tratamientos';
  if (product) {
    url =
      'https://wa.me/+34930346565?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20tratamiento%20' +
      product.title;
  }

  const recalculateVisibility = () => {
    setShowBottomBar(window.scrollY > (threshold ?? 350));
    scrollPos.current = window.scrollY;
  };

  const handleScroll = () => {
    requestAnimationFrame(() => recalculateVisibility());
  };

  const handleFieldChange = (value: string | boolean, field: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    async function initMedicalVisitProduct() {
      const medicalVisitProduct = await fetchProduct(
        process.env.NEXT_PUBLIC_MEDICAL_VISIT || '',
        false,
        false
      );

      setMedicalVisitProduct(medicalVisitProduct);
    }

    initMedicalVisitProduct();
  }, []);

  useEffect(() => {
    scrollPos.current = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, handleScroll]);

  console.log(ROUTES);

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className={twMerge(`p-4 ${className}`)}>
        <Flex className="justify-end items-center">
          <Dialog>
            <DialogTrigger>
              <Button
                size="lg"
                type="primary"
                className="mr-4 pointer-events-auto"
              >
                <SvgCalling className="h-5 w-5 mr-4" />
                Te llamamos
              </Button>
            </DialogTrigger>
            <DialogContent type="bottom" className="rounded-t-2xl w-full">
              <Flex layout="col-center" className="p-4 pt-12 w-full bg-white">
                <div className="w-4/5 text-center flex flex-col gap-4 mb-6">
                  <div className="h-1 bg-hg-black300/50 rounded-full w-24" />
                  <Text className="font-semibold text-lg text-center">
                    ¿Tienes dudas?
                  </Text>
                  <Text className="text-center">
                    Te llamamos en 1 minuto para resolver todas tus dudas
                  </Text>
                  <Text className="text-xs text-hg-black400 text-center">
                    En horario comercial de Lunes a Viernes de 10 a 14h y de 15
                    a 19h
                  </Text>
                </div>

                <div className="relative w-full mb-3">
                  <PhoneInput
                    disableDialCodeAndPrefix
                    defaultCountry="es"
                    preferredCountries={['es']}
                    value={formData.phone}
                    forceDialCode
                    inputClassName={
                      showPhoneError !== null && !showPhoneError
                        ? 'isComplete'
                        : ''
                    }
                    onChange={(phone, country) => {
                      handleFieldChange(phone, 'phone');
                      handleFieldChange(
                        `+${country.country.dialCode}`,
                        'phonePrefix'
                      );

                      phone.length === country.country.dialCode.length + 1
                        ? setShowPhoneError(null)
                        : setShowPhoneError(!utils.validatePhoneInput(phone));
                    }}
                  />
                  {showPhoneError !== null && (
                    <Image
                      src={`/images/forms/${
                        showPhoneError ? 'error' : 'formCheck'
                      }.svg`}
                      alt="error"
                      height={26}
                      width={24}
                      className="absolute top-4 right-3"
                    />
                  )}
                  {showPhoneError && (
                    <p className="text-hg-error text-sm p-2 text-left">
                      {errorsConfig.ERROR_PHONE_NOT_VALID}
                    </p>
                  )}
                </div>
                <div className="self-start mb-8">
                  <Flex
                    layout="row-left"
                    className={
                      !formData.termsAndConditionsAccepted
                        ? 'animate-shake'
                        : ''
                    }
                  >
                    <label
                      htmlFor="termsAndConditionsAccepted"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="termsAndConditionsAccepted"
                        checked={formData.termsAndConditionsAccepted}
                        onChange={event =>
                          handleFieldChange(
                            event.target.checked,
                            'termsAndConditionsAccepted'
                          )
                        }
                        className="hidden"
                      />
                      {formData.termsAndConditionsAccepted ? (
                        <SvgCheckSquareActive className="mr-2" />
                      ) : (
                        <SvgCheckSquare className="mr-2" />
                      )}
                      <span className="text-xs text-left">
                        Acepto{' '}
                        <a
                          href={ROUTES.statics.termsAndConditions}
                          className="underline"
                        >
                          Términos y condiciones
                        </a>{' '}
                        y{' '}
                        <a
                          href={ROUTES.statics.privacyPolicy}
                          className="underline"
                        >
                          Política de privacidad
                        </a>
                      </span>
                    </label>
                  </Flex>
                </div>
                <Button type="disabledGrey" size="lg">
                  ¡Llámame!
                </Button>
              </Flex>
            </DialogContent>
          </Dialog>

          <a
            href={url}
            target="_blank"
            id="tmevent_click_floating_button_whatsapp"
            className="flex items-center justify-center p-3 bg-hg-green rounded-full"
          >
            <SvgWhatsapp className="text-white" />
          </a>
        </Flex>
      </div>
    </div>
  );
}
