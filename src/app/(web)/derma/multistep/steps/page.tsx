'use client';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import {
  SvgArrowSmallLeft,
  SvgCheck,
  SvgCircle,
  SvgHolaglow,
} from 'app/icons/Icons';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [categorySelected, setCategorySelected] = useState<
    number | undefined
  >();

  const [client, setClient] = useState<Client>({
    email: '',
    phone: '',
    phonePrefix: '',
    name: '',
    surname: '',
    secondSurname: '',
    termsAndConditionsAccepted: false,
    receiveCommunications: false,
    page: '',
    externalReference: '',
    analyticsMetrics: {
      device: 0,
      locPhysicalMs: '',
      utmAdgroup: '',
      utmCampaign: '',
      utmContent: '',
      utmMedium: '',
      utmSource: '',
      utmTerm: '',
      treatmentText: '',
      externalReference: '',
      interestedTreatment: '',
      treatmentPrice: 0,
    },
    interestedTreatment: '',
    treatmentPrice: 0,
  });
  const redirectTo = (index: number) => {
    if (categorySelected !== undefined) {
      window.document.location.href =
        MULTISTEP_TREATMENTS[categorySelected].treatments[index].landing;
    }
  };

  const STEPS = 4;
  const progressBarWith: number = activeSlideIndex * (100 / STEPS);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
  };

  const sendEventTracking = (index: number) => {
    window.parent.postMessage(
      '(googleevent)multistep_step_' + index + '|',
      'https://www.holaglow.com'
    );
  };

  useEffect(() => {
    sendEventTracking(1);
  }, []);

  return (
    <>
      <header className="py-4 border-b border-hg-black50 mb-6 relative">
        <Flex layout="row-left" className="max-w-[624px] mx-auto px-4">
          {activeSlideIndex > 0 && (
            <div className="w-[30px] mr-2 sm:hidden">
              <SvgArrowSmallLeft
                height={30}
                width={30}
                fill={HOLAGLOW_COLORS['tertiary']}
                className="cursor-pointer self-center"
                onClick={() => goBack(activeSlideIndex)}
              />
            </div>
          )}
          <SvgHolaglow
            width={125}
            height={30}
            fill={HOLAGLOW_COLORS['tertiary']}
          />
        </Flex>
      </header>
      <main
        id="multistep"
        className="max-w-[624px] mx-auto relative overflow-hidden text-hg-black"
      >
        <div className="px-4 mb-12">
          <ul className="flex bg-hg-tertiary500/40 h-[4px] w-full rounded-full">
            <li
              className="h-[4px] rounded-full bg-hg-tertiary transition-all"
              style={{ width: `${progressBarWith}%` }}
            ></li>
          </ul>
        </div>

        <Carousel
          totalSlides={STEPS}
          currentSlide={activeSlideIndex}
          dragEnabled={false}
          touchEnabled={false}
        >
          <div className="bg-white px-4">
            Paso 1, validación de usuario
            <section className="mb-6">
              <Text size="xl" className="mb-2 font-semibold">
                Primero, comencemos con tu información básica
              </Text>
              <Text>
                Ten en cuenta que nuestros profesionales de la salud no podrán
                recetar antibióticos orales o medicamentos, como Roaccutane y
                Spironolactone, en línea, ya que esto requiere una consulta en
                persona. Nuestros médicos solo pueden abordar preocupaciones
                relacionadas con tu piel.
              </Text>
            </section>
            <section>
              <RegistrationForm
                redirect={false}
                hasContinueButton={false}
                formData={client}
                setClientData={setClient}
              />
            </section>
          </div>
        </Carousel>

        {activeSlideIndex > 0 && (
          <Button
            className="mt-8 ml-3"
            type="secondary"
            onClick={() => goBack(activeSlideIndex)}
          >
            <Flex layout="row-left">
              <SvgArrowSmallLeft height={20} width={20} />
              <span className="ml-2">Atrás</span>
            </Flex>
          </Button>
        )}
      </main>
    </>
  );
}
