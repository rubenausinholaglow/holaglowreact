'use client';

import { Testimonial } from '@interface/testimonial';
import RegistrationForm from 'app/components/common/RegistrationForm';
import GoogleStars from 'app/components/home/GoogleStars';
import Products from 'app/components/home/Products';
import FullWidthCarousel from 'app/components/product/fullWidthCarousel';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgHolaglow } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';

interface SliderItem {
  title: string;
  text: string;
  imgUrl: string;
}

const SLIDES: SliderItem[] = [
  {
    title: 'Soluciones personalizadas',
    text: 'Nuestro equipo médico te ayudará a encontrar las soluciones para cubrir las necesidades de tu piel y conseguir los objetivos que desees.',
    imgUrl: '/images/statics/landings/captacion/slide1.svg',
  },
  {
    title: 'Escáner facial en 3D',
    text: 'Generaremos tu imagen en tres dimensiones mediante fotografías reales, gracias a la tecnología más innovadora.',
    imgUrl: '/images/statics/landings/captacion/slide2.svg',
  },
  {
    title: 'Resultados antes y después',
    text: 'Si sientes curiosidad por algún tratamiento de medicina estética, podrás descubrir cómo sería el resultado mediante la simulación sobre tu propia imagen 3D.',
    imgUrl: '/images/statics/landings/captacion/slide3.svg',
  },
  {
    title: 'Asesoramiento gratis',
    text: 'El médico te asesorará, te explicará detalladamente en qué consisten los tratamientos y responderá todas tus dudas.',
    imgUrl: '/images/statics/landings/captacion/slide4.svg',
  },
];

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

export default function LandingCaptacion() {
  const { deviceSize, setSelectedTreatments } = useGlobalPersistedStore(
    state => state
  );

  const HEADER_HEIGHT = deviceSize.isMobile
    ? HEADER_HEIGHT_MOBILE
    : HEADER_HEIGHT_DESKTOP;
  const HEADER_HEIGHT_CLASS = `h-[${HEADER_HEIGHT}px]`;

  return (
    <>
      <header id="header" className="z-30 w-full bg-white">
        <Container isHeader>
          <Flex
            layout="row-between"
            className={`w-full relative py-4 lg:py-5 justify-between lg:justify-center ${HEADER_HEIGHT_CLASS}`}
          >
            <Link href={ROUTES.home} className="lg:absolute left-0 2xl:ml-20">
              <SvgHolaglow
                fill={HOLAGLOW_COLORS['secondary']}
                className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
              />
            </Link>

            <Flex
              layout="row-center"
              className="lg:absolute right-0  2xl:mr-20"
            >
              <Button
                size={deviceSize.isMobile ? 'sm' : 'md'}
                type="tertiary"
                href={ROUTES.checkout.clinics}
                onClick={() => {
                  setSelectedTreatments([]);
                }}
              >
                Reservar cita
                <SvgArrow
                  height={16}
                  width={16}
                  className="ml-2 hidden md:block"
                />
              </Button>
            </Flex>
          </Flex>
        </Container>
      </header>

      <Container>
        <div className="pt-6 pb-12 border-b border-hg-black">
          <Title size="2xl" className="font-bold mb-4">
            Asesórate{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>gratis</Underlined>{' '}
            con nuestro equipo médico
          </Title>
          <Text className="w-1/2 relative">
            Pide tu primera cita médica e infórmate sobre medicina estética sin
            compromiso
          </Text>
          <Image
            src="/images/statics/landings/captacion/hero.png"
            alt="Asesórate gratis con nuestro equipo médico"
            height={1044}
            width={924}
            className="w-4/5 ml-auto -mt-[30%]"
          />
          <Flex className="justify-center">
            <Button size="xl" type="secondary" href="#leadForm">
              Pide tu cita médiga gratis
            </Button>
          </Flex>
        </div>
      </Container>

      <GoogleStars />

      <Container className="py-8">
        <Title size="2xl" className="font-bold mb-4">
          ¿En qué{' '}
          <Underlined color={HOLAGLOW_COLORS['primary']}>consiste</Underlined>?
        </Title>

        <Carousel
          hasControls
          className="relative mt-8"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
          sliderStyles={`${deviceSize.isMobile ? '' : 'gap-16'}`}
        >
          {SLIDES.map((item: SliderItem, index: number) => (
            <Flex key={index} layout="col-center" className="items-stretch">
              <div className="relative">
                <Image
                  src={item.imgUrl}
                  height={140}
                  width={140}
                  alt={item.title}
                  className="mx-auto"
                />
                <span className="absolute top-[50%] -translate-y-[50%] -translate-x-[50%] font-bold text-[56px]">
                  {index + 1}
                </span>
              </div>
              <Title disableAnimation className="text-2xl mb-4">
                {item.title}
              </Title>
              <Text disableAnimation className="text-center">
                {item.text}
              </Text>
            </Flex>
          ))}
        </Carousel>

        <Flex className="justify-center">
          <Button size="xl" type="secondary" href="#leadForm">
            ¡Yo quiero!
          </Button>
        </Flex>
      </Container>

      <Products hideCategorySelector />

      <div className="bg-[#eaf5e9]">
        <Container className="py-12">
          <Title size="2xl" className="font-bold mb-4">
            ¿Qué dicen de{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>nosotros</Underlined>
            ?
          </Title>
        </Container>
        <FullWidthCarousel
          className="pb-8"
          type="testimonials"
          items={TESTIMONIALS}
        />
      </div>

      <div className="bg-hg-black100 rounded-t-2xl">
        <Container className="py-8">
          <Title size="2xl" className="font-bold mb-4">
            Rellena el formulario para{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>agendar</Underlined>{' '}
            tu cita
          </Title>
          <Text className="text-hg-black500 mb-8">
            En el siguiente paso podrás seleccionar clínica
          </Text>
          <RegistrationForm />
        </Container>
      </div>
    </>
  );
}
