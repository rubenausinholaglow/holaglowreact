'use client';

import { useEffect, useState } from 'react';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Professional } from '@interface/clinic';
import { Testimonial } from '@interface/testimonial';
import { fetchClinics } from '@utils/fetch';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { FAQ } from 'app/(web)/tratamientos/[slug]/components/faqs';
import { SvgArrow, SvgTimeLeft } from 'app/icons/IconsDs';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import {
  useGlobalPersistedStore,
  useSessionStore,
} from '../../../stores/globalStore';
import { AnimateOnViewport } from '../common/AnimateOnViewport';
import ProfessionalCard from '../common/ProfessionalCard';
import TestimonialCard from '../common/TestimonialCard';
import GoogleStars from './GoogleStars';
import HeroDerma from './HeroDerma';
import ValuesDescriptionDerma from './ValuesDescriptionDerma';

export default function HomeBlocksDerma() {
  const { deviceSize } = useSessionStore(state => state);
  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  const { clinics, setClinics } = useGlobalPersistedStore(state => state);
  const [floatingBarThreshold, setFloatingBarThreshold] = useState(0);
  const dermaImages: any[] = [];

  const TESTIMONIALS: Testimonial[] = [
    {
      city: 'Barcelona',
      name: 'Yolanda Pérez',
      imgUrl: '/images/statics/landings/captacion/YolandaPérez.jpg',
      value: 4.7,
      testimonial:
        'Trato espectacular de todos, en especial Roma por el tiempo dedicado a explicar con detalle cada tratamiento y dando consejos de cómo obtener el mejor resultado. Es genial la visualización 3D de cómo quedaría lo que decidas hacerte. El doctor dedica tiempo a explicar el procedimiento y el resultado ha sido genial. 100% recomendable!',
    },
    {
      city: 'Madrid',
      name: 'Mía GC',
      imgUrl: '/images/statics/landings/captacion/MíaGC.jpg',
      value: 4.7,
      testimonial:
        'La atención y el trato al caso específico de cada persona son muy buenos, además de tener detalles muy guays como una bebida al llegar. Las recomendaciones son muy honestas y te sientes acompañada en todo momento.',
    },
    {
      city: 'Barcelona',
      name: 'Lluna Santiago',
      imgUrl: '/images/statics/landings/captacion/LlunaSantiago.jpg',
      value: 4.7,
      testimonial:
        'Me he hecho los labios y ha sido increíble!!! Sin duda el mejor lugar en el que poder confiarse. Un trato maravilloso hacia los clientes, os lo recomiendo!!',
    },
    {
      city: 'Barcelona',
      name: 'Noemí Clemente',
      imgUrl: '/images/statics/landings/captacion/NoemiClemente.jpg',
      value: 4.7,
      testimonial:
        'Hace 1 mes fui hacerme un estudio para hacerme un tratamiento facial, desde el minuto 1 el trato fue increíble. Me hizo el estudio Roma que fue súper cercano y claro con lo que necesitaba, tengo que decir que hace tiempo quería hacerme el tratamiento pero no encontraba a nadie que me asesorara con tanta confianza y seguridad. Ayer fui a hacerme el tratamiento y me puse en manos del Dr. Basart que me explicó todos los pasos del tratamiento. Ya tengo fecha.',
    },
    {
      city: 'Madrid',
      name: 'Carlos Correa',
      imgUrl: '/images/statics/landings/captacion/CarlosCorrea.jpg',
      value: 4.7,
      testimonial:
        '¡¡Muy buena experiencia!! Desde el detalle de la bebida, el equipo de recepción hasta el momento del tratamiento con la doctora. Iba con mucho miedo por ser mi primera vez y salgo muy contento!',
    },
    {
      city: 'Madrid',
      name: 'Julia Capozzi',
      imgUrl: '/images/statics/landings/captacion/JuliaCapozzi.jpg',
      value: 4.7,
      testimonial:
        'Llevo unos días desde mi tratamiento de aumento de labios en Holaglow y se merece 5 estrellas. Estoy súper satisfecha, los resultados son exactamente los que deseaba. El trato del médico ha sido muy cercano y profesional. Me he sentido bien, me ha transmitido confianza la marca desde el primer momento. Además, un par de días después te llega la llamada de la clínica para preguntarte si estás bien. Pequeños pero importantes detalles de calidad en atención al paciente. ¡Repetiré!',
    },
  ];

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

  useEffect(() => {
    if (clinics) {
      const professionalsWithCity = clinics.flatMap(clinic =>
        clinic.professionals.filter(professional => {
          if (professional.professionalType === 1) {
            return {
              ...professional,
              city: clinic.city,
            };
          }
        })
      );

      setProfessionals(professionalsWithCity);
    }

    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);
  return (
    <>
      <HeroDerma />
      <GoogleStars />
      <ValuesDescriptionDerma />
      <Button
        isAnimated
        type="secondary"
        size="xl"
        className="mx-auto md:mx-0 mb-10"
        href="/derma/multistep/start"
        id={'tmevent_multistep_module'}
      >
        Reserva tu cita online
        <SvgArrow className="ml-4" height={24} width={24} />
      </Button>
      <Container
        className={`p-0 md:px-4 gap-16 md:flex justify-between md:mb-16`}
      >
        <Container
          className={`md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start`}
        >
          <Title
            isAnimated
            size="2xl"
            className="text-left font-bold mb-6 md:mb-8"
          >
            Cómo funciona
          </Title>
          <ul className="flex flex-col pb-4 w-full">
            <li className="mb-4 pb-4 border-hg-black flex ">
              <div
                className={`flex relative md:justify-center flex-col w-full`}
              >
                <div className={`flex-1 flex items-start pr-4 w-full`}>
                  <SvgTimeLeft
                    height={24}
                    width={24}
                    className="text-hg-secondary mr-3 mt-1"
                  />
                  <div>
                    <Text>Paso 1</Text>
                    <Text size="lg" className="font-semibold mb-1">
                      Reserva tu consulta
                    </Text>
                    <Text>Lorem lorem</Text>
                  </div>
                </div>
              </div>
            </li>

            <li className="mb-4 pb-4 border-hg-black flex ">
              <div
                className={`flex relative md:justify-center flex-col w-full`}
              >
                <div className={`flex-1 flex items-start pr-4 w-full`}>
                  <SvgTimeLeft
                    height={24}
                    width={24}
                    className="text-hg-secondary mr-3 mt-1"
                  />
                  <div>
                    <Text>Paso 2</Text>
                    <Text size="lg" className="font-semibold mb-1">
                      Visita médica online
                    </Text>
                    <Text>Lorem lorem</Text>
                  </div>
                </div>
              </div>
            </li>
            <li className="mb-4 pb-4 border-hg-black flex ">
              <div
                className={`flex relative md:justify-center flex-col w-full`}
              >
                <div className={`flex-1 flex items-start pr-4 w-full`}>
                  <SvgTimeLeft
                    height={24}
                    width={24}
                    className="text-hg-secondary mr-3 mt-1"
                  />
                  <div>
                    <Text>Paso 3</Text>
                    <Text size="lg" className="font-semibold mb-1">
                      Su plan de cuidado de la piel en casa
                    </Text>
                    <Text>Lorem lorem</Text>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </Container>
      </Container>
      <Container
        className={`p-0 md:px-4 gap-16 md:flex justify-between md:mb-16`}
      >
        <Container
          className={`md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start`}
        >
          <Title
            isAnimated
            size="2xl"
            className="text-hg-secondary text-left font-bold mb-6 md:mb-8"
          >
            Nuestros expertos en dermatología estética
          </Title>
          <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
            En Holaglow defendemos una medicina estética que cuida y, para ello,
            la profesionalidad y la empatía son fundamentales. Todos nuestros
            doctores comparten el mismo compromiso: ponerse en tu piel, de
            manera literal y metafóricamente.
          </Text>
        </Container>
        <div className={'md:w-1/2'}>
          {deviceSize.isMobile && (
            <FullWidthCarousel type="professionals" items={professionals} />
          )}
          {!deviceSize.isMobile && (
            <Carousel
              hasControls={professionals?.map && professionals?.map.length > 2}
              className="relative"
              isIntrinsicHeight
              visibleSlides={2}
              infinite={false}
              sliderStyles="gap-8"
            >
              {professionals?.map(professional => (
                <ProfessionalCard
                  key={professional.name}
                  professional={professional}
                  className="h-full flex flex-col"
                />
              ))}
            </Carousel>
          )}
        </div>
      </Container>
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
              Resultados reales
            </Title>
          </Flex>
        </Flex>
      </Container>
      <AnimateOnViewport>
        <FullWidthCarousel className="pb-8">
          {TESTIMONIALS.map((testimonial: Testimonial | any) => {
            return (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                className="h-full flex flex-col mr-4"
              />
            );
          })}
        </FullWidthCarousel>
      </AnimateOnViewport>
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
