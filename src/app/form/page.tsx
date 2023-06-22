'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons';
import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';
import { Flex } from 'components/Layouts';
import { ReactElement, useState, useEffect } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { SvgArrowSmallLeft, SvgCheck } from 'icons/Icons';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [treatments, setTreatments] = useState([]);
  const [carouselWidth, setCarouselWidth] = useState(0);

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

                return (
                  <Button
                    className='w-full mb-4 bg-[#F7F9FC]'
                    onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                  >
                    <Flex layout='col-center' className='justify-start h-full'>
                      <SvgCheck height={16} width={16} fill='#7516E9' className='self-end mb-auto' />

                      {Icon && <Icon height={20} width={20} fill='#717D96' roundedBg='#F1E8FD' />}
                      <Text size='sm' className='py-2 font-semibold text-center'>
                        {question.text}
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
              ¿Qué edad tienes?
            </Title>
          </section>

          <section>
            <ul>
              {MULTISTEP_QUESTIONS[1].questions.map((question: any, index: number) => {
                return <li key={question}>{SelectorItem(question, null, 'age', index)}</li>;
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
            <ul>
              {MULTISTEP_TREATMENTS.map((treatment: any, index: number) => (
                <li key={index}>{SelectorItem(treatment.category, null, 'category', index)}</li>
              ))}
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
                console.log(treatment);
                return <li key={index}>{SelectorItem(treatment.name, null, 'landing', index)}</li>;
              })}
            </ul>
          </section>
        </div>
      </ReactSimplyCarousel>
    </main>
  );
}
