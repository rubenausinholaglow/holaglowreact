'use client';

import Image from 'next/image';
import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons/Buttons';
import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';
import { Flex } from 'components/Layouts';
import { useEffect, useState } from 'react';
import Carousel from 'components/Carousel/Carousel';
import { SvgArrowSmallLeft, SvgCheck, SvgCircle } from 'icons/Icons';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [treatments, setTreatments] = useState([]);

  const [skincareSelected, setSkincareSelected] = useState<number | undefined>();
  const [ageSelected, setAgeSelected] = useState<number | undefined>();
  const [categorySelected, setCategorySelected] = useState<number | undefined>();
  const [treatmentSelected, setTreatmentSelected] = useState<number | undefined>();

  const redirectTo = (index: number) => {
    if (categorySelected !== undefined) {
      window.parent.postMessage(
        MULTISTEP_TREATMENTS[categorySelected].treatments[index].landing,
        'https://holaglow.com',
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
    window.parent.postMessage('(googleevent)multistep_step_' + index + '|', 'https://holaglow.com');
  };

  useEffect(() => {
    sendEventTracking(1);
  }, []);

  return (
    <>
      <header className='py-4 border-b border-[#EDF0F7] mb-6 relative'>
        <div className='max-w-[624px] mx-auto'>
          {activeSlideIndex > 0 && (
            <div className='w-[32px] absolute left-3 top-3 sm:hidden'>
              <SvgArrowSmallLeft
                height={32}
                width={32}
                fill='#1A202C'
                className='cursor-pointer self-center'
                onClick={() => goBack(activeSlideIndex)}
              />
            </div>
          )}

          <Image className='mx-auto sm:ml-4' src='/images/holaglow.svg' height='24' width='112' alt='Holaglow' />
        </div>
      </header>
      <main id='multistep' className='max-w-[624px] mx-auto relative overflow-hidden text-[#1A202C]'>
        <div className='px-4 mb-12'>
          <ul className='flex bg-[#7516E9]/10 h-[4px] w-full rounded-full'>
            <li
              className='h-[4px] rounded-full bg-[#7516E9] transition-all'
              style={{ width: `${progressBarWith}%` }}
            ></li>
          </ul>
        </div>

        <Carousel totalSlides={4} currentSlide={activeSlideIndex}>
          <div className='bg-white px-4'>
            <section className='mb-6'>
              <Title size='2xl' className='mb-2'>
                ¿Actualmente sigues alguna rutina de cuidado de la piel?
              </Title>
            </section>

            <section>
              <ul className='grid grid-cols-3 gap-4'>
                {MULTISTEP_QUESTIONS[0].questions.map((question: any, index: number) => {
                  const Icon = question.icon;
                  const isActive = index === skincareSelected;

                  const bgIcon = isActive ? 'bg-[#EAE2F9]' : 'bg-[#EDF0F7]';
                  const iconColor = isActive ? '#7516E9' : '#CBD2E0';

                  return (
                    <div
                      className='w-full mb-4 bg-[#F7F9FC] group rounded-lg py-2 px-3 cursor-pointer'
                      onClick={() => {
                        setActiveSlideIndex(activeSlideIndex + 1);
                        setSkincareSelected(index);
                        sendEventTracking(activeSlideIndex + 2);
                      }}
                    >
                      <Flex layout='col-center' className='justify-start h-full'>
                        {isActive ? (
                          <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-4' />
                        ) : (
                          <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-4' />
                        )}
                        <div
                          className={`${bgIcon} group-hover:bg-[#EAE2F9] h-[72px] w-[72px] rounded-full flex justify-center items-center transition-all`}
                        >
                          {Icon && (
                            <div className={`text-[${iconColor}] group-hover:text-[#7516E9] transition-all`}>
                              <Icon height={40} width={40} />
                            </div>
                          )}
                        </div>
                        <div className='grow flex items-center'>
                          <Text size='sm' className='py-2 font-semibold text-center'>
                            {question.text}
                          </Text>
                        </div>
                      </Flex>
                    </div>
                  );
                })}
              </ul>
            </section>
          </div>

          <div className='bg-white px-4'>
            <section className='mb-6 flex gap-2 items-center'>
              <Title size='2xl' className='mb-2'>
                ¿Qué edad tienes?
              </Title>
            </section>

            <section>
              <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                {MULTISTEP_QUESTIONS[1].questions.map((age: any, index: number) => {
                  const isActive = index === ageSelected;
                  const bgColor = isActive ? 'bg-[#EAE2F9]' : 'bg-[#F7F9FC]';
                  const textColor = isActive ? 'text-[#7516E9]' : 'text-[#1A202C]';

                  return (
                    <div
                      className='w-full mb-4 bg-[#F7F9FC] group rounded-lg py-2 px-3 cursor-pointer'
                      onClick={() => {
                        setActiveSlideIndex(activeSlideIndex + 1);
                        setAgeSelected(index);
                        sendEventTracking(activeSlideIndex + 2);
                      }}
                    >
                      <Flex layout='col-center' className='justify-start h-full'>
                        {isActive ? (
                          <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-2' />
                        ) : (
                          <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-2' />
                        )}

                        <Text
                          size='3xl'
                          className={`font-semibold text-center ${textColor} group-hover:text-[#7516E9] transition-all`}
                        >
                          {age}
                        </Text>
                        <Text
                          size='sm'
                          className={`-mt-3 font-semibold text-center mb-4 ${textColor} group-hover:text-[#7516E9] transition-all`}
                        >
                          años
                        </Text>
                      </Flex>
                    </div>
                  );
                })}
              </ul>
            </section>
          </div>

          <div className='bg-white px-4'>
            <section className='mb-6 flex gap-2 items-center'>
              <Title size='2xl' className='mb-2'>
                ¿Qué te gustaría mejorar?
              </Title>
            </section>

            <section>
              <ul className='grid grid-cols-3 gap-4'>
                {MULTISTEP_TREATMENTS.map((item: any, index: number) => {
                  const isActive = index === categorySelected;
                  const bgColor = isActive ? 'bg-[#EAE2F9]' : 'bg-[#F7F9FC]';
                  const textColor = isActive ? 'text-[#7516E9]' : 'text-[#1A202C]';
                  const Icon = item?.icon;
                  const bgIcon = isActive ? 'bg-[#EAE2F9]' : 'bg-[#EDF0F7]';
                  const iconColor = isActive ? '#7516E9' : '#CBD2E0';

                  return (
                    <div
                      className={`w-full mb-4 ${bgColor} group rounded-lg py-2 px-3 cursor-pointer`}
                      onClick={() => {
                        setActiveSlideIndex(activeSlideIndex + 1);
                        setCategorySelected(index);
                        setTreatments(MULTISTEP_TREATMENTS[index].treatments);
                        sendEventTracking(activeSlideIndex + 2);
                      }}
                    >
                      <Flex layout='col-center' className='justify-start h-full'>
                        {isActive ? (
                          <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-2' />
                        ) : (
                          <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-2' />
                        )}

                        {Icon ? (
                          <div
                            className={`${bgIcon} group-hover:bg-[#EAE2F9] h-[72px] w-[72px] rounded-full flex justify-center items-center transition-all`}
                          >
                            {Icon && (
                              <div className={`text-[${iconColor}] group-hover:text-[#7516E9] transition-all`}>
                                <Icon height={40} width={40} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className='relative pointer-events-none'>
                            <Image
                              priority={true}
                              src={`${item.imgSrc}-bw.png`}
                              height='96'
                              width='70'
                              alt={item.category}
                            />
                            <Image
                              priority={true}
                              className={`transition-opacity opacity-0 group-hover:opacity-100 absolute top-0 left-0 ${
                                isActive && 'opacity-100'
                              } `}
                              src={`${item.imgSrc}.png`}
                              height='96'
                              width='70'
                              alt={item.category}
                            />
                          </div>
                        )}
                        <div className='grow flex items-center'>
                          <Text size='sm' className={`py-2 font-semibold text-center ${textColor}`}>
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

          <div className='bg-white px-4'>
            <section className='mb-6 flex gap-2 items-center'>
              <Title size='2xl' className='mb-2'>
                ¿Qué quieres tratar?
              </Title>
            </section>

            <section>
              <ul>
                {treatments.map((treatment: any, index: number) => {
                  const isActive = index === treatmentSelected;
                  const bgColor = isActive ? 'bg-[#EAE2F9]' : 'bg-[#F7F9FC]';
                  const textColor = isActive ? 'text-[#7516E9]' : 'text-[#1A202C]';

                  return (
                    <div
                      className={`w-full mb-4 ${bgColor} hover:bg-[#EAE2F9] py-4 group transition-all rounded-lg px-3 cursor-pointer`}
                      onClick={() => {
                        setTreatmentSelected(index);
                        redirectTo(index);
                      }}
                    >
                      <Flex layout='row-left' className='justify-start items-center h-full'>
                        <Text size='lg' className={`${textColor} group-hover:text-[#7516E9] mr-auto`}>
                          {treatment.name}
                        </Text>
                        {isActive ? (
                          <SvgCheck height={16} width={16} fill='#7516E9' className='' />
                        ) : (
                          <SvgCircle height={16} width={16} stroke='#1A202C' className='' />
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
          <Button className='mt-8 ml-3' type='inverted' onClick={() => goBack(activeSlideIndex)}>
            <Flex layout='row-left'>
              <SvgArrowSmallLeft height={20} width={20} />
              <span className='ml-2'>Atrás</span>
            </Flex>
          </Button>
        )}
      </main>
    </>
  );
}
