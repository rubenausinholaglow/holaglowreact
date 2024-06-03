'use client';

import 'react-international-phone/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { useEffect, useRef, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import ROUTES from '@utils/routes';
import * as errorsConfig from '@utils/textConstants';
import * as utils from '@utils/validators';
import {
  SvgCallIncoming,
  SvgCalling,
  SvgCheckSquare,
  SvgCheckSquareActive,
  SvgWhatsapp,
} from 'app/icons/IconsDs';
import { Product } from 'app/types/product';
import dayjs from 'dayjs';
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

import LottieAnimation from '../common/LottieAnimation';

function checkCallingAvailability() {
  const now = dayjs();
  const isWeekend = now.day() === 0 || now.day() === 6;
  const hour = now.hour();
  const isWithinCallingHours =
    (hour >= 10 && hour < 14) || (hour >= 15 && hour < 18);

  return !isWeekend && isWithinCallingHours;
}

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
  const scrollPos = useRef(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showCallMeModal, setShowCallMeModal] = useState(false);

  const [showCallingMessage, setShowCallingMessage] = useState({
    isVisible: false,
    callingAvailabilty: checkCallingAvailability(),
  });
  const [formData, setFormData] = useState({
    phone: '',
    phonePrefix: '',
    termsAndConditionsAccepted: false,
  });
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);

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
    scrollPos.current = 0;
    recalculateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, handleScroll]);

  function handleCallMe() {
    setShowCallingMessage({
      isVisible: true,
      callingAvailabilty: checkCallingAvailability(),
    });
  }

  useEffect(() => {
    if (!showCallMeModal) {
      setShowCallingMessage({
        isVisible: false,
        callingAvailabilty: checkCallingAvailability(),
      });
    }
  }, [showCallMeModal]);

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        showBottomBar && isVisible ? 'translate-y-[0%]' : 'translate-y-[105%]'
      }`}
    >
      <div className={twMerge(`p-4 ${className}`)}>
        <Flex className="justify-end items-center">
          <Dialog
            open={showCallMeModal}
            onOpenChange={showCallMeModal =>
              setShowCallMeModal(showCallMeModal)
            }
            dragToClose
          >
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
            <DialogContent
              type="bottom"
              className="rounded-t-2xl w-full"
              hideClose
            >
              <Flex
                layout="col-center"
                className="p-4 w-full bg-white justify-center"
              >
                <div className="h-1.5 bg-hg-black100 rounded-full w-20 mb-6" />
                {showCallingMessage.isVisible ? (
                  <Flex layout="col-center" className="px-8 w-full">
                    <SvgCallIncoming className="h-8 w-8 mb-4" />
                    <Text className="font-semibold text-lg text-center mb-4">
                      {showCallingMessage.callingAvailabilty
                        ? 'Ahora te llamamos'
                        : 'Te llamaremos lo antes posible!'}
                    </Text>
                    {!showCallingMessage.callingAvailabilty && (
                      <Text className="text-center text-xs mb-4">
                        En horario comercial de Lunes a Viernes de 10 a 14h y de
                        15 a 19h
                      </Text>
                    )}
                    <LottieAnimation
                      animation="/lotties/callIncomingLoader.json"
                      className="h-10 mb-8"
                    />
                  </Flex>
                ) : (
                  <>
                    <div className="w-4/5 text-center flex flex-col gap-4 mb-6">
                      <Text className="font-semibold text-lg text-center">
                        ¿Tienes dudas?
                      </Text>
                      <Text className="text-center">
                        Te llamamos en 1 minuto para resolver todas tus dudas
                      </Text>
                      <Text className="text-xs text-hg-black400 text-center">
                        En horario comercial de Lunes a Viernes de 10 a 14h y de
                        15 a 19h
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
                            : setShowPhoneError(
                                !utils.validatePhoneInput(phone)
                              );
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
                      <Flex layout="row-left">
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
                              target="_blank"
                            >
                              Términos y condiciones
                            </a>{' '}
                            y{' '}
                            <a
                              href={ROUTES.statics.privacyPolicy}
                              className="underline"
                              target="_blank"
                            >
                              Política de privacidad
                            </a>
                          </span>
                        </label>
                      </Flex>
                    </div>
                    <Button
                      type={
                        formData.phone &&
                        !showPhoneError &&
                        formData.termsAndConditionsAccepted
                          ? 'primary'
                          : 'disabledGrey'
                      }
                      size="lg"
                      onClick={() => handleCallMe()}
                    >
                      ¡Llámame!
                    </Button>
                  </>
                )}
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
