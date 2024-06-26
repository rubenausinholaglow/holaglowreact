'use client';

import { isMobile } from 'react-device-detect';
import { Accordion } from '@radix-ui/react-accordion';
import CheckHydration from '@utils/CheckHydration';
import StoriesDerma from 'app/(web)/components/common/StoriesDerma';
import RoutineItems from 'app/(web)/components/dermahome/RoutineItems';
import TestimonialsDerma from 'app/(web)/components/dermahome/TestimonialsDerma';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgAdd, SvgMinus } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import GuaranteedResults from '../../precios/components/GuaranteedResults';
import OptionsPrices from '../../precios/components/OptionsPrices';
import OptionsPricesSelectButton from '../../precios/components/OptionsPricesSelectButton';
import { DERMA_INGREDIENTS, PAINS_AND_SYMPTOMS } from '../multistepConfig';

const FAQS = [
  {
    question: '¿Qué voy a recibir?',
    answer:
      'La rutina facial personalizada está compuesta por la receta de una crema facial personalizada y 3 cremas que complementan y potencian el efecto de la crema personalizada. Después del diagnóstico recibirás la receta de tu crema personalizada, una espuma limpiadora, protector solar y una crema de día específica para tus objetivos.',
  },

  {
    question: '¿Dónde consigo mi crema personalizada?',
    answer:
      'Tu crema personalizada estará formulada específicamente para ti por tu médico y contendrá principios activos (ingredientes) catalogados como medicamento. Por eso necesita ser recetada por un médico y se elabora bajo demanda. Para conseguir la tuya, deberás pedirla en tu farmacia más cercana presentando la receta y documento de identificación. Tiene un coste a abonar en la farmacia de entre 25-40€.',
  },

  {
    question: 'Seguimiento médico incluido',
    answer:
      'Queremos asegurar que consigues los objetivos que tienes para tu piel. Por eso al finalizar los 3 meses de rutina, te pediremos fotos para un nuevo diagnóstico de tu médico y que puedas decidir si renuevas tu rutina 3 meses más o si quieres adaptarla y tratar otros aspectos de tu piel.',
  },
  {
    question: 'Detalles del envío',
    answer:
      'El envío de las cremas es totalmente gratuito. Las recibirás en casa entre 3-5 días laborables después de haber recibido el diagnóstico de tu médico. La receta para tu crema personalizada la recibirás a la vez que el diagnóstico.',
  },
];

export default function ThankYouMultiStep() {
  const { user } = useGlobalPersistedStore(state => state);
  const { pain, secondaryConcerns } = useDermaStore(state => state);

  const filteredPain = PAINS_AND_SYMPTOMS.filter(
    item => item.value === pain
  )[0];

  const ingredients = filteredPain?.feedback?.ingredients as
    | string[]
    | undefined;

  const painIngredients = DERMA_INGREDIENTS.filter(
    item => ingredients?.includes(item.name)
  );

  const secondaryIngredients = DERMA_INGREDIENTS.filter(ingredient => {
    return ingredient.concerns.some(concern =>
      secondaryConcerns.includes(concern)
    );
  });

  const uniqueIngredients = [
    ...painIngredients,
    ...secondaryIngredients,
  ].filter(
    (ingredient, index, self) =>
      index === self.findIndex(t => t.name === ingredient.name)
  );

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <CheckHydration>
        <div className="md:flex gap-12 pt-8">
          <Container className="mb-8">
            <Flex
              layout="col-center"
              className="w-full gap-4 md:items-start pb-4"
            >
              <Image
                alt="Dra. Sonsoles Espi"
                src="/images/derma/multistep/Sonsoles.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4 md:ml-0"
              />
              <Title size="xl" className="text-derma-primary font-light">
                ¡Aquí tienes, {user?.name}!
              </Title>
              <Text className="text-center md:text-left mb-4">
                Tenemos un pack preparado para ti
              </Text>
              <OptionsPrices pain={filteredPain} />

              <div className="bg-derma-secondary300">
                <GuaranteedResults />
              </div>
            </Flex>
            <Flex
              layout="col-left"
              className="mt-6 w-full gap-4 md:items-start"
            >
              <Title
                size="xl"
                className="text-derma-primary font-light text-left"
              >
                Este es el detalle de tu pack
              </Title>
              <CheckHydration>
                <RoutineItems hideCremaFormulada pain={pain} />
              </CheckHydration>
            </Flex>
          </Container>
        </div>
        <div className="bg-derma-secondary400 py-8">
          <Container className="px-0 md:px-4">
            <Title
              size="xl"
              className="text-derma-primary font-light mb-4 px-4 md:px-0"
            >
              ... y esta será tu crema formulada para{' '}
              {filteredPain?.name.toLowerCase()}
            </Title>
            <CheckHydration>
              <Flex layout="col-left" className="md:flex-row w-full mb-8">
                <div className="w-full md:w-1/2 shrink-0 mb-8 md:mb-0 md:mr-4 px-4 md:px-0">
                  <RoutineItems hideDefaultItems pain={pain} />
                </div>
                <div className="w-full md:w-1/2 shrink-0 md:ml-4">
                  <Carousel
                    isIntrinsicHeight
                    visibleSlides={isMobile ? 1.75 : 2}
                    infinite={false}
                    isDerma
                    hasControls={!isMobile}
                    className="mb-12"
                    controlStyles="pr-4"
                  >
                    {uniqueIngredients.map(ingredient => (
                      <Flex
                        layout="col-left"
                        className="w-full pr-6 gap-2 px-4"
                        key={ingredient.name}
                      >
                        <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 border border-derma-secondary100 mb-2 py-4 overflow-hidden">
                          <Image
                            alt={ingredient.name}
                            src={ingredient.imgSrc}
                            fill
                            className="scale-110 object-contain"
                          />
                        </Flex>
                        <Text className="font-semibold">{ingredient.name}</Text>
                        <ul className="flex gap-2 flex-wrap">
                          {ingredient.concerns.map(tag => (
                            <li
                              key={tag}
                              className="p-2 px-3 rounded-full bg-derma-secondary100/50 text-derma-primary text-xs"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </Flex>
                    ))}
                  </Carousel>
                </div>
              </Flex>
            </CheckHydration>
            <Flex className="justify-center w-full px-4">
              <OptionsPricesSelectButton index={0} />
            </Flex>
          </Container>
        </div>
        <Container className="py-8 md:py-12">
          <Accordion
            className="mb-8 md:grid md:grid-cols-2 gap-4"
            type="single"
            collapsible
          >
            <div>
              {FAQS.map((faq, index) => {
                if (index % 2 === 0) {
                  return (
                    <AccordionItem
                      key={faq.question}
                      value={(index + 1).toString()}
                      className="rounded-2xl overflow-hidden bg-derma-secondary300 mb-4 break-inside-avoid"
                    >
                      <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                        <Text className="text-lg font-semibold">
                          {faq.question}
                        </Text>
                        <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                        <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                      </AccordionTrigger>
                      <AccordionContent className="bg-derma-secondary400 text-sm text-hg-black500">
                        <Text className="p-4">{faq.answer}</Text>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              })}
            </div>

            <div>
              {FAQS.map((faq, index) => {
                if (index % 2 !== 0) {
                  return (
                    <AccordionItem
                      key={faq.question}
                      value={(index + 1).toString()}
                      className="rounded-2xl overflow-hidden bg-derma-secondary300 mb-4 break-inside-avoid"
                    >
                      <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                        <Text className="text-lg font-semibold">
                          {faq.question}
                        </Text>
                        <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                        <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                      </AccordionTrigger>
                      <AccordionContent className="bg-derma-secondary400 text-sm text-hg-black500">
                        <Text className="p-4">{faq.answer}</Text>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              })}
            </div>
          </Accordion>

          <Title size="2xl" className="font-semibold text-derma-primary500">
            {user?.name}, hemos tratado a más de 500 personas como tu
          </Title>
        </Container>
        <StoriesDerma />
        <TestimonialsDerma />
        <Container className="pb-8 md:pb-12">
          <Flex className="justify-center w-full px-4">
            <OptionsPricesSelectButton index={0} />
          </Flex>
        </Container>
      </CheckHydration>
    </DermaLayout>
  );
}
