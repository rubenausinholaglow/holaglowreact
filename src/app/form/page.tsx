'use client';

import { useEffect, useState } from 'react';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import {
  SvgArrowSmallLeft,
  SvgCheck,
  SvgCircle,
  SvgHolaglow,
} from 'icons/Icons';
import Image from 'next/image';

import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [treatments, setTreatments] = useState([]);

  const [skincareSelected, setSkincareSelected] = useState<
    number | undefined
  >();
  const [ageSelected, setAgeSelected] = useState<number | undefined>();
  const [categorySelected, setCategorySelected] = useState<
    number | undefined
  >();
  const [treatmentSelected, setTreatmentSelected] = useState<
    number | undefined
  >();

  const redirectTo = (index: number) => {
    if (categorySelected !== undefined) {
      window.parent.postMessage(
        MULTISTEP_TREATMENTS[categorySelected].treatments[index].landing,
        'https://holaglow.com'
      );
    }
  };

  const STEPS = 4;
  const progressBarWith: number = activeSlideIndex * (100 / STEPS);

  const goBack = (index: number) => {
    setActiveSlideIndex(index - 1);
    setTreatmentSelected(undefined);
  };

  const sendEventTracking = (index: number) => {
    window.parent.postMessage(
      '(googleevent)multistep_step_' + index + '|',
      'https://holaglow.com'
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
          totalSlides={4}
          currentSlide={activeSlideIndex}
          dragEnabled={false}
          touchEnabled={false}
        >
          <div className="bg-white px-4">
            <section className="mb-6">
              <Text size="xl" className="mb-2 font-semibold">
                ¿Actualmente sigues alguna rutina de cuidado de la piel?
              </Text>
            </section>

            <section>
              <ul className="grid grid-cols-3 gap-4">
                {MULTISTEP_QUESTIONS[0].questions.map(
                  (question: any, index: number) => {
                    const Icon = question.icon;
                    const isActive = index === skincareSelected;

                    return (
                      <div
                        key={index}
                        className={`w-full mb-4 ${
                          isActive
                            ? 'bg-hg-tertiary500/25 text-hg-black'
                            : 'text-hg-tertiary'
                        } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 hover:text-hg-black group rounded-lg py-2 px-3 cursor-pointer`}
                        onClick={() => {
                          setActiveSlideIndex(activeSlideIndex + 1);
                          setSkincareSelected(index);
                          sendEventTracking(activeSlideIndex + 2);
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
                          <div
                            className={`${
                              isActive
                                ? 'bg-hg-tertiary500/40'
                                : 'bg-hg-tertiary500/20'
                            }  group-hover:bg-hg-tertiary500/60 h-[72px] w-[72px] rounded-full flex justify-center items-center transition-all`}
                          >
                            {Icon && (
                              <div
                                className={`${
                                  isActive
                                    ? 'text-hg-tertiary'
                                    : 'text-hg-tertiary500'
                                } group-hover:text-hg-tertiary transition-all`}
                              >
                                <Icon height={40} width={40} />
                              </div>
                            )}
                          </div>
                          <div className="grow flex items-center">
                            <Text
                              size="xs"
                              className="py-2 font-semibold text-center"
                            >
                              {question.text}
                            </Text>
                          </div>
                        </Flex>
                      </div>
                    );
                  }
                )}
              </ul>
            </section>
          </div>

          <div className="bg-white px-4">
            <section className="mb-6 flex gap-2 items-center">
              <Text size="xl" className="mb-2 font-semibold">
                ¿Qué edad tienes?
              </Text>
            </section>

            <section>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {MULTISTEP_QUESTIONS[1].questions.map(
                  (age: any, index: number) => {
                    const isActive = index === ageSelected;

                    return (
                      <div
                        key={index}
                        className={`w-full mb-4 ${
                          isActive
                            ? 'text-hg-black bg-hg-tertiary500/25'
                            : 'text-hg-tertiary'
                        } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 group rounded-lg py-2 px-3 cursor-pointer`}
                        onClick={() => {
                          setActiveSlideIndex(activeSlideIndex + 1);
                          setAgeSelected(index);
                          sendEventTracking(activeSlideIndex + 2);
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

                          <Text
                            size="xl"
                            className={`font-semibold text-center text-[32px] ${
                              isActive ? 'text-hg-black' : 'text-hg-tertiary'
                            } group-hover:text-hg-black transition-all`}
                          >
                            {age}
                          </Text>
                          <Text
                            size="xs"
                            className={`-mt-3 font-semibold text-center mb-4 ${
                              isActive ? 'text-hg-black' : 'text-hg-tertiary'
                            } group-hover:text-hg-black transition-all`}
                          >
                            años
                          </Text>
                        </Flex>
                      </div>
                    );
                  }
                )}
              </ul>
            </section>
          </div>

          <div className="bg-white px-4">
            <section className="mb-6 flex gap-2 items-center">
              <Text size="xl" className="mb-2 font-semibold">
                ¿Qué te gustaría mejorar?
              </Text>
            </section>

            <section>
              <ul className="grid grid-cols-3 gap-4">
                {MULTISTEP_TREATMENTS.map((item: any, index: number) => {
                  const isActive = index === categorySelected;
                  const Icon = item?.icon;

                  return (
                    <div
                      key={index}
                      className={`w-full mb-4 ${
                        isActive
                          ? 'bg-hg-tertiary500/25 text-hg-black'
                          : 'text-hg-tertiary'
                      } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 hover:text-hg-black group rounded-lg py-2 px-3 cursor-pointer`}
                      onClick={() => {
                        setActiveSlideIndex(activeSlideIndex + 1);
                        setCategorySelected(index);
                        setTreatments(MULTISTEP_TREATMENTS[index].treatments);
                        sendEventTracking(activeSlideIndex + 2);
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

                        {Icon ? (
                          <div
                            className={`${
                              isActive
                                ? 'bg-hg-tertiary500/40'
                                : 'bg-hg-tertiary500/20'
                            }  group-hover:bg-hg-tertiary500/60 h-[72px] w-[72px] rounded-full flex justify-center items-center transition-all`}
                          >
                            {Icon && (
                              <div
                                className={`${
                                  isActive
                                    ? 'text-hg-tertiary'
                                    : 'text-hg-tertiary500'
                                } group-hover:text-hg-tertiary transition-all`}
                              >
                                <Icon height={40} width={40} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative pointer-events-none">
                            <Image
                              priority={true}
                              src={`${item.imgSrc}-bw.png`}
                              height="96"
                              width="70"
                              alt={item.category}
                            />
                            <Image
                              priority={true}
                              className={`transition-opacity opacity-0 group-hover:opacity-100 absolute top-0 left-0 ${
                                isActive && 'opacity-100'
                              } `}
                              src={`${item.imgSrc}.png`}
                              height="96"
                              width="70"
                              alt={item.category}
                            />
                          </div>
                        )}
                        <div className="grow flex items-center">
                          <Text
                            size="xs"
                            className="py-2 font-semibold text-center"
                          >
                            {item.category}
                          </Text>
                        </div>
                      </Flex>
                    </div>
                  );
                })}
              </ul>
            </section>
          </div>

          <div className="bg-white px-4">
            <section className="mb-6 flex gap-2 items-center">
              <Text size="xl" className="mb-2 font-semibold">
                ¿Qué quieres tratar?
              </Text>
            </section>

            <section>
              <ul>
                {treatments.map((treatment: any, index: number) => {
                  const isActive = index === treatmentSelected;

                  return (
                    <div
                      key={index}
                      className={`w-full mb-4 ${
                        isActive
                          ? 'bg-hg-tertiary500/25 text-hg-black'
                          : 'text-hg-tertiary'
                      } bg-hg-tertiary500/10 hover:bg-hg-tertiary500/20 hover:text-hg-black py-4 group transition-all rounded-lg px-3 cursor-pointer`}
                      onClick={() => {
                        setTreatmentSelected(index);
                        redirectTo(index);
                      }}
                    >
                      <Flex
                        layout="row-left"
                        className="justify-start items-center h-full"
                      >
                        <Text size="md" className="mr-auto">
                          {treatment.name}
                        </Text>
                        {isActive ? (
                          <SvgCheck
                            height={16}
                            width={16}
                            fill={HOLAGLOW_COLORS['tertiary']}
                          />
                        ) : (
                          <SvgCircle
                            height={16}
                            width={16}
                            stroke={HOLAGLOW_COLORS['black']}
                          />
                        )}
                      </Flex>
                    </div>
                  );
                })}
              </ul>
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
