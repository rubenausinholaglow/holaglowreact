'use client';

import { Title, Text } from 'components/Texts';
import { Button } from 'components/Buttons';
import { MULTISTEP_DATA } from './mockedData';
import { Flex } from 'components/Layouts';
import { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { treatments } from '../user/passport/types';

export default function Form() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [category, setcategory] = useState(MULTISTEP_DATA[1].category);
  const [treatments, setTreatments] = useState(
    MULTISTEP_DATA.filter(treatment => treatment.category === category)
      .map(category => category.treatments)
      .flat(),
  );

  console.log(category);
  console.log(treatments);

  return (
    <main className='border border-dashed border-slate-300 h-[800px] w-[420px] my-16 mx-auto relative'>
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
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      Sí, a diario.
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      Sí, pero solo a veces
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      No, nunca
                    </Text>
                  </Flex>
                </Button>
              </li>
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6'>
            <Title size='2xl' className='mb-2'>
              ¿Qué edad tienes?
            </Title>
          </section>

          <section>
            <ul>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      De 18 a 25 años
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      De 26 a 35 años
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      De 36 a 50 años
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      De 46 a 55 años
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      De 56 a 65 años
                    </Text>
                  </Flex>
                </Button>
              </li>
              <li>
                <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                  <Flex layout='left-col'>
                    <Text size='xl' className='mb-2'>
                      Más de 65 años
                    </Text>
                  </Flex>
                </Button>
              </li>
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6'>
            <Title size='2xl' className='mb-2'>
              ¿De qué zona de tu cuerpo querrías mejorar tu aspecto?
            </Title>
          </section>

          <section>
            <ul>
              {MULTISTEP_DATA.map(treatment => (
                <li>
                  <Button className='w-full mb-4' onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}>
                    <Flex layout='left-col'>
                      <Text size='xl' className='mb-2'>
                        {treatment.category}
                      </Text>
                    </Flex>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className='bg-white py-6 px-4 w-[420px]'>
          <section className='mb-6'>
            <Title size='2xl' className='mb-2'>
              ¿Qué aspecto concreto querrías tratarte?
            </Title>
          </section>

          <section>
            <ul>
              {treatments.map(treatment => (
                <li>
                  <Button className='w-full mb-4' onClick={() => console.log('redirection!')}>
                    <Flex layout='left-col'>
                      <Text size='xl' className='mb-2'>
                        {treatment.name}
                      </Text>
                    </Flex>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ReactSimplyCarousel>
    </main>
  );
}
