'use client';

import { useEffect, useState } from 'react';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Professional } from '@interface/clinic';
import { fetchClinics } from '@utils/fetch';
import { FAQ } from 'app/(web)/tratamientos/[slug]/components/faqs';
import { SvgArrow } from 'app/icons/IconsDs';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { useGlobalPersistedStore } from '../../../stores/globalStore';
import ProfessionalsDerma from '../common/ProfessionalsDerma';
import DescriptionDerma from './DescriptionDerma';
import TestimonialsDerma from './TestimonialsDerma';

export default function HomeBlocksDerma() {
  const { clinics, setClinics } = useGlobalPersistedStore(state => state);
  const [floatingBarThreshold, setFloatingBarThreshold] = useState(0);
  const dermaImages: any[] = [];

  const faqs: FAQ[] = [
    { description: 'TEST DESCRIPTION', title: 'test title' },
  ];
  useEffect(() => {
    const professionals = document.getElementById('professionals');

    if (professionals && floatingBarThreshold === 0) {
      const rect = professionals.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop + 125;

      setFloatingBarThreshold(elementTop);
    }
  }, []);

  /*   useEffect(() => {

    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]); */
  return (
    <>
      <DescriptionDerma />

      <div className="bg-hg-pink400">
        <Container className="py-12">
          <Title
            isAnimated
            size="2xl"
            className="font-gtUltraBold text-hg-tertiary text-left font-bold mb-8"
          >
            Cómo funciona
          </Title>
          <ul className="flex flex-col w-full gap-8">
            {[
              {
                text: 'Reserva tu consulta',
                description: 'Loren Ipsum',
                icon: '/images/derma/home/calendar.svg',
              },
              {
                text: 'Visita médica online',
                description: 'Loren Ipsum',
                icon: '/images/derma/home/online.svg',
              },
              {
                text: 'Plan de cuidado en casa',
                description: 'Loren Ipsum',
                icon: '/images/derma/home/box.svg',
              },
            ].map((item, index) => (
              <li className="flex text-hg-black500" key={item.text}>
                <div className="flex relative md:justify-center flex-col w-full">
                  <div className="flex-1 flex items-start w-full">
                    <Image
                      src={item.icon}
                      alt={item.text}
                      width={48}
                      height={44}
                      className="mr-6 shrink-0"
                    />
                    <Flex layout="col-left" className="gap-4 w-full">
                      <Text className="text-sm">Paso {index + 1}</Text>
                      <Text className="text-lg text-hg-tertiary font-semibold">
                        {item.text}
                      </Text>
                      <Text>{item.description}</Text>
                    </Flex>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container className="pt-12 pb-4 overflow-hidden">
        <Flex
          layout="col-left"
          className="gap-4 items-center relative md:justify-center md:flex-row"
        >
          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Title
              isAnimated
              size="2xl"
              className="text-hg-secondary font-gtUltraBold font-bold mb-4 lg:pr-[20%]"
            >
              Qué incluye el precio
            </Title>
            <Text className="text-hg-black500 md:w-full md:text-lg mb-12">
              Para una piel mejor cuidada, tus médicos te están esperando
            </Text>

            <Text className="text-lg font-bold text-hg-black700 mb-4">
              Pago único
            </Text>
            <ul className="flex flex-col gap-4 w-full text-hg-black500 mb-4">
              {[
                'Consulta de <b class="text-hg-black700">12 min</b> con el dermatólogo',
                'Receta online para crema formulada especialmente para tu piel <b class="text-hg-black700">59 €</b>',
              ].map(item => (
                <li className="border-hg-black flex" key={item}>
                  <div className="flex relative md:justify-center flex-col w-full">
                    <div className="flex-1 flex items-start pr-4 w-full">
                      <SvgArrow
                        height={20}
                        width={20}
                        className="text-hg-secondary mr-3 mt-1 shrink-0 rotate-45"
                      />
                      <div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Flex>
        </Flex>
      </Container>

      <Flex className="pl-[25%]">
        <Image
          src="/images/derma/home/cream.png"
          alt="Holaglow"
          width={312}
          height={248}
          className="w-full shrink-0"
        />
      </Flex>

      <Container className="py-4 overflow-hidden">
        <Flex
          layout="col-left"
          className="gap-4 items-center relative md:justify-center md:flex-row"
        >
          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Button
              isAnimated
              type="secondary"
              size="xl"
              className="mx-auto md:mx-0 mb-10"
              href="/derma/multistep/start"
              id={'tmevent_multistep_module'}
            >
              ¡Comienza ahora!
            </Button>

            <Text className="text-lg font-bold text-hg-black700 mb-4">
              Suscripción
            </Text>

            <ul className="flex flex-col gap-4 mb-4 w-full text-hg-black500">
              {[
                'Consulta de <b class="text-hg-black700">12 min</b> con el dermatólogo',
                'Receta online para crema formulada especialmente para tu piel',
                'Rutina de cuidado diario de la piel para 3 meses con una suscripción de <b class="text-hg-black700">49 €/mes</b> <span class="text-hg-black400">(Total 147€)</span>',
              ].map(item => (
                <li className="border-hg-black flex" key={item}>
                  <div className="flex relative md:justify-center flex-col w-full">
                    <div className="flex-1 flex items-start pr-4 w-full">
                      <SvgArrow
                        height={20}
                        width={20}
                        className="text-hg-secondary mr-3 mt-1 shrink-0 rotate-45"
                      />
                      <div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Flex>
        </Flex>
        <Image
          src="/images/derma/home/subscription.png"
          alt="Holaglow"
          width={312}
          height={248}
          className="w-full shrink-0"
        />
      </Container>

      <ProfessionalsDerma />

      <Container className="py-12 overflow-hidden">
        <Flex
          layout="col-left"
          className="gap-4 items-center relative md:justify-center md:flex-row"
        >
          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Title
              isAnimated
              size="2xl"
              className="text-hg-secondary font-bold mb-12 md:mb-6 lg:pr-[20%]"
            >
              Historias de Derma
            </Title>
            <Text isAnimated className="text-hg-black500 md:w-full md:text-lg">
              Conectamos a personas con médicos experimentados para un
              descubrimiento personalizado de productos y tratamientos para el
              acné hasta el envejecimiento.
            </Text>
            <div className="md:w-1/2">
              <Carousel
                hasControls={dermaImages?.length > 1}
                dragEnabled={false}
                touchEnabled={false}
                hasDots
                className="px-4 md:px-0 rounded-xl aspect-square"
              >
                {dermaImages?.map(item => (
                  <div key={item.id} className="overflow-hidden relative">
                    <ImgComparisonSlider className="outline-none w-full">
                      <figure slot="first" className="before">
                        <div className="relative aspect-square">
                          <Image
                            src={item.urlBefore || ''}
                            alt=""
                            fill
                            className="object-cover rounded-3xl"
                          />
                        </div>
                        <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute left-4 bottom-4 text-sm">
                          Antes
                        </span>
                      </figure>
                      <figure slot="second" className="after">
                        <div className="relative aspect-square">
                          <Image
                            src={item.urlAfter || ''}
                            alt=""
                            fill
                            className="object-cover rounded-3xl"
                          />
                        </div>
                        <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute right-4 bottom-4 text-sm">
                          Después
                        </span>
                      </figure>
                    </ImgComparisonSlider>
                  </div>
                ))}
              </Carousel>
            </div>
          </Flex>
        </Flex>
      </Container>

      <TestimonialsDerma />
      <Container className="py-12">
        <Title
          isAnimated
          size="2xl"
          className="text-hg-secondary font-bold mb-8 md:mb-12"
        >
          Preguntas frecuentes
        </Title>

        <div className="md:grid md:grid-cols-2 md:gap-6">
          {faqs.map(faq => {
            return (
              <SimpleAccordion
                key={faq.title}
                className="border-b border-hg-black pb-6 mb-6 md:mb-0"
                trigger={faq.title}
                triggerStyles="text-left items-start font-semibold"
              >
                <Text size="sm" className="text-hg-black500 py-4">
                  {faq.description}
                </Text>
              </SimpleAccordion>
            );
          })}
        </div>
      </Container>
    </>
  );
}
