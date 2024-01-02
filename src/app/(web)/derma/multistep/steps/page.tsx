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
import { SvgArrow } from 'app/icons/IconsDs';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { MULTISTEP_QUESTIONS } from './mockedData';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [values, setValues] = useState<Array<Array<number>>>([[]]);
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

  const STEPS = 4;
  const progressBarWith: number = activeSlideIndex * (100 / STEPS);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
  };
  const goNext = (index: number) => {
    setActiveSlideIndex(index + 1);
  };

  const setSelectedQuestionValue = (question: number, value: number) => {
    const newValues = values;
    if (!newValues[question]) newValues.push([]);
    const index = newValues[question].indexOf(value);
    if (index == -1) {
      newValues[question].push(value);
    } else {
      newValues[question].splice(index, 1);
    }
    setValues(newValues);
    setActiveSlideIndex(activeSlideIndex);
  };

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
          {values &&
            MULTISTEP_QUESTIONS.map((item: any, question: number) => {
              return (
                <div className="bg-white px-4">
                  Paso {question + 1}, {item.section}
                  <section className="mb-6">
                    <Text size="xl" className="mb-2 font-semibold">
                      {item.title}
                    </Text>
                    <Text>{item.description}</Text>
                  </section>
                  <section>
                    <ul className="grid grid-cols-3 gap-4">
                      {values &&
                        item.questions.map((item: any, index: number) => {
                          const isActive =
                            values[question]?.indexOf(index) > -1;
                          return (
                            <div
                              key={index}
                              className={`w-full mb-4 ${
                                isActive
                                  ? 'bg-hg-tertiary500/25 text-hg-black'
                                  : 'text-hg-tertiary'
                              } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 hover:text-hg-black group rounded-lg py-2 px-3 cursor-pointer`}
                              onClick={() => {
                                setSelectedQuestionValue(question, index);
                              }}
                            >
                              <Flex
                                layout="col-center"
                                className="justify-start h-full"
                              >
                                {isActive ? (
                                  <SvgCheck
                                    height={16}
                                    width={16}
                                    fill={HOLAGLOW_COLORS['tertiary']}
                                    className="self-end mb-4"
                                  />
                                ) : (
                                  <SvgCircle
                                    height={16}
                                    width={16}
                                    stroke={HOLAGLOW_COLORS['black']}
                                    className="self-end mb-4"
                                  />
                                )}
                                <div className="grow flex items-center">
                                  <Text
                                    size="xs"
                                    className="py-2 font-semibold text-center"
                                  >
                                    {item.title}
                                  </Text>
                                  <Text
                                    size="xs"
                                    className="py-2 font-semibold text-center"
                                  >
                                    {item.text}
                                  </Text>
                                </div>
                              </Flex>
                            </div>
                          );
                        })}
                    </ul>
                  </section>
                </div>
              );
            })}
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
        {activeSlideIndex < STEPS && (
          <Button
            className="mt-8 ml-3"
            type="secondary"
            onClick={() => goNext(activeSlideIndex)}
          >
            <Flex layout="row-right">
              <span className="ml-2">Siguiente</span>
              <SvgArrow height={16} width={16} className="ml-2" />
            </Flex>
          </Button>
        )}
      </main>
    </>
  );
}
