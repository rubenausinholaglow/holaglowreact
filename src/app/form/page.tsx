'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons';
import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';
import { Flex } from 'components/Layouts';
import { ReactElement, useState, useEffect } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { SvgArrowSmallLeft, SvgCheck, SvgCircle, SvgSkinCare, SvgHairCare } from 'icons/Icons';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [treatments, setTreatments] = useState([]);

  const [skincareSelected, setSkincareSelected] = useState<number | undefined>();
  const [ageSelected, setAgeSelected] = useState<number | undefined>();
  const [categorySelected, setCategorySelected] = useState<number | undefined>();
  const [treatmentSelected, setTreatmentSelected] = useState<number | undefined>();

  const STEPS = 4;
  const progressBarSteps: any = [];
  for (let i = 0; i < STEPS; i++) {
    progressBarSteps.push(
      <li
        key={i}
        className={`h-[4px] rounded-full w-[calc(25%+2px)] -ml-[2px] ${
          activeSlideIndex >= i ? 'bg-[#7516E9]' : 'bg-[#7516E9]/10'
        }`}
      ></li>,
    );
  }

  function SelectorItem(
    text: string,
    icon: ReactElement<any, string | React.JSXElementConstructor<any>> | null,
    type: string,
    index: number,
  ) {
    const Icon = icon ? icon : null;

    return (
      <Button
        className='w-full mb-4 bg-[#F7F9FC]'
        onClick={() => {
          setActiveSlideIndex(activeSlideIndex + 1);
          if (type === 'category') {
            setTreatments(MULTISTEP_TREATMENTS[index].treatments);
          }
        }}
      >
        <Flex layout='col-left'>
          <Text size='lg' className='py-2'>
            {text}
          </Text>
          {Icon && <Icon height={20} width={20} fill='#717D96' />}
        </Flex>
      </Button>
    );
  }

  {
    /* <Button
        className='w-full mb-4 bg-[#F7F9FC]'
        onClick={() => {
          setActiveSlideIndex(activeSlideIndex + 1);
          if (type === 'category') {
            setTreatments(MULTISTEP_TREATMENTS[index].treatments);
          }
        }}
      >
        {type === 'question' || type === 'category' ? (
          <Flex layout='col-left'>
            <Text size='lg' className='py-2'>
              {text}
            </Text>
            {Icon && <Icon height={20} width={20} fill='#717D96' />}
          </Flex>
        ) : (
          <Link href={type} className='w-full mb-4 bg-[#7516E9]/10'>
            <Flex layout='col-left'>
              <Text size='lg' className='py-2'>
                {text}
              </Text>
            </Flex>
          </Link>
        )}
      </Button> */
  }

  return (
    <main id='multistep' className='w-[390px] my-16 mx-auto relative pt-8'>
      <header className='py-4 border-b border-[#EDF0F7] mb-4 relative'>
        {activeSlideIndex > 0 && (
          <div className='w-[32px] absolute left-0 top-3'>
            <SvgArrowSmallLeft
              height={32}
              width={32}
              fill='grey'
              className='cursor-pointer self-center'
              onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
            />
          </div>
        )}

        <Image className='mx-auto' src='/images/holaglow.svg' height='24' width='112' alt='Holaglow' />
      </header>

      <div className='px-4'>
        <ul className='flex bg-[#7516E9]/10 h-[4px] w-full rounded-full'>{progressBarSteps}</ul>
      </div>

      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        infinite={false}
        itemsToShow={1}
        itemsToScroll={1}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={500}
        easing='ease-out'
      >
        <div className={`bg-white py-6 px-4 w-[390px]`}>
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
                  <Button
                    className='w-full mb-4 bg-[#F7F9FC]'
                    onClick={() => {
                      setActiveSlideIndex(activeSlideIndex + 1);
                      setSkincareSelected(index);
                    }}
                  >
                    <Flex layout='col-center' className='justify-start h-full'>
                      {isActive ? (
                        <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-4' />
                      ) : (
                        <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-4' />
                      )}
                      <div className={`${bgIcon} h-[72px] w-[72px] rounded-full flex justify-center items-center`}>
                        {Icon && <Icon height={40} width={40} fill={iconColor} />}
                      </div>
                      <div className='grow flex items-center'>
                        <Text size='sm' className='py-2 font-semibold text-center'>
                          {question.text}
                        </Text>
                      </div>
                    </Flex>
                  </Button>
                );
              })}
            </ul>
          </section>
        </div>

        <div className={`bg-white py-6 px-4 w-[390px]`}>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿Qué edad tienes?
            </Title>
          </section>

          <section>
            <ul className='grid grid-cols-2 gap-4'>
              {MULTISTEP_QUESTIONS[1].questions.map((age: any, index: number) => {
                const isActive = index === ageSelected;
                const bgColor = isActive ? 'bg-[#EAE2F9]' : 'bg-[#F7F9FC]';
                const textColor = isActive ? 'text-[#7516E9]' : 'text-[#1A202C]';

                return (
                  <Button
                    className={`w-full mb-4 ${bgColor}`}
                    onClick={() => {
                      setActiveSlideIndex(activeSlideIndex + 1);
                      setAgeSelected(index);
                    }}
                  >
                    <Flex layout='col-center' className='justify-start h-full'>
                      {isActive ? (
                        <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-2' />
                      ) : (
                        <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-2' />
                      )}

                      <Text size='3xl' className={`font-semibold text-center ${textColor}`}>
                        {age}
                      </Text>
                      <Text size='sm' className={`-mt-3 font-semibold text-center mb-4 ${textColor}`}>
                        años
                      </Text>
                    </Flex>
                  </Button>
                );
              })}
            </ul>
          </section>
        </div>

        <div className={`bg-white py-6 px-4 w-[390px]`}>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿De qué zona de tu cuerpo querrías mejorar tu aspecto?
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
                  <Button
                    className={`w-full mb-4 ${bgColor}`}
                    onClick={() => {
                      setActiveSlideIndex(activeSlideIndex + 1);
                      setCategorySelected(index);
                      setTreatments(MULTISTEP_TREATMENTS[index].treatments);
                    }}
                  >
                    <Flex layout='col-center' className='justify-start h-full'>
                      {isActive ? (
                        <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-2' />
                      ) : (
                        <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-2' />
                      )}

                      {Icon ? (
                        <div className={`${bgIcon} h-[72px] w-[72px] rounded-full flex justify-center items-center`}>
                          {Icon && <Icon height={40} width={40} fill={iconColor} />}
                        </div>
                      ) : (
                        <Image src={item.imgSrc} height='96' width='70' alt={item.category} />
                      )}
                      <Text size='sm' className={`font-semibold text-center ${textColor}`}>
                        {item.category}
                      </Text>
                    </Flex>
                  </Button>
                );
              })}
            </ul>
          </section>
        </div>

        <div className={`bg-white py-6 px-4 w-[390px]`}>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿Qué aspecto concreto querrías tratarte?
            </Title>
          </section>

          <section>
            <ul>
              {treatments.map((treatment: any, index: number) => {
                const isActive = false;
                const bgColor = isActive ? 'bg-[#EAE2F9]' : 'bg-[#F7F9FC]';
                const textColor = isActive ? 'text-[#7516E9]' : 'text-[#1A202C]';

                return (
                  <Button className={`w-full mb-4 ${bgColor} py-4`} onClick={() => setTreatmentSelected(index)}>
                    <Flex layout='row-left' className='justify-start h-full'>
                      <Text size='lg' className={`${textColor} mr-auto`}>
                        {treatment.name}
                      </Text>
                      {isActive ? (
                        <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-2' />
                      ) : (
                        <SvgCircle height={16} width={16} stroke='#1A202C' className='self-end mb-2' />
                      )}
                    </Flex>
                  </Button>
                );
              })}
            </ul>
          </section>
        </div>
      </ReactSimplyCarousel>
    </main>
  );
}
