'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons';
import { MULTISTEP_QUESTIONS, MULTISTEP_TREATMENTS } from './mockedData';
import { Flex } from 'components/Layouts';
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { SvgArrowSmallLeft } from 'icons/Icons';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [treatments, setTreatments] = useState([]);

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

  const SelectorItem = (text: string, type: string, index: number) => {
    if (type === 'question') {
      return (
        <Button className='w-full mb-4 bg-[#7516E9]/10' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
          <Flex layout='col-left'>
            <Text size='lg' className='py-2'>
              {text}
            </Text>
          </Flex>
        </Button>
      );
    }

    if (type === 'category') {
      return (
        <Button
          className='w-full mb-4 bg-[#7516E9]/10'
          onClick={() => {
            setActiveSlideIndex(activeSlideIndex + 1);
            setTreatments(MULTISTEP_TREATMENTS[index].treatments);
          }}
        >
          <Flex layout='col-left'>
            <Text size='lg' className='py-2'>
              {text}
            </Text>
          </Flex>
        </Button>
      );
    }

    return (
      <Button className='w-full mb-4 bg-[#7516E9]/10'>
        <Link href={type} className='w-full mb-4 bg-[#7516E9]/10'>
          <Flex layout='col-left'>
            <Text size='lg' className='py-2'>
              {text}
            </Text>
          </Flex>
        </Link>
      </Button>
    );
  };

  return (
    <main className='h-[800px] w-[420px] my-16 mx-auto relative pt-8'>
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

      <Flex layout='row-center' className='px-4'>
        <ul className='flex bg-[#7516E9]/10 h-[4px] w-full rounded-full'>{progressBarSteps}</ul>
        <span className='w-[40px] ml-4 text-[#7516E9]'>
          {activeSlideIndex + 1} / {STEPS}
        </span>
      </Flex>

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
        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6'>
            <Title size='2xl' className='mb-2'>
              ¿Actualmente sigues alguna rutina de cuidado de la piel?
            </Title>
          </section>

          <section>
            <ul>
              {MULTISTEP_QUESTIONS[0].questions.map((question: any, index: number) => {
                return <li key={question}>{SelectorItem(question, 'question', index)}</li>;
              })}
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿Qué edad tienes?
            </Title>
          </section>

          <section>
            <ul>
              {MULTISTEP_QUESTIONS[1].questions.map((question: any, index: number) => {
                return <li key={question}>{SelectorItem(question, 'question', index)}</li>;
              })}
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿De qué zona de tu cuerpo querrías mejorar tu aspecto?
            </Title>
          </section>

          <section>
            <ul>
              {MULTISTEP_TREATMENTS.map((treatment: any, index: number) => (
                <li key={index}>{SelectorItem(treatment.category, 'category', index)}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6 flex gap-2 items-center'>
            <Title size='2xl' className='mb-2'>
              ¿Qué aspecto concreto querrías tratarte?
            </Title>
          </section>

          <section>
            <ul>
              {treatments.map((treatment: any, index: number) => {
                console.log(treatment);
                return (
                  <li key={index}>{SelectorItem(treatment.name, treatment.landing, index)}</li>
                );
              })}
            </ul>
          </section>
        </div>
      </ReactSimplyCarousel>
    </main>
  );
}
