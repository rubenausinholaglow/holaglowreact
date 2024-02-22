import { SvgArrowSmallLeft } from 'app/icons/Icons';
import { SimpleAccordion } from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { AnimateOnViewport } from '../common/AnimateOnViewport';

export default function BenefitsApplicationResultsDerma() {
  return (
    <div className="pt-12 pb-16">
      <Container>
        <TitleDerma
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Crema facial personalizada
        </TitleDerma>
        <Text className="text-hg-black500 mb-8">
          Una crema facial formulada exclusivamente para ti con ingredientes que
          han sido testados médicamente y cuya eficacia se ha demostrado
          empíricamente.
        </Text>

        <Flex
          layout="col-center"
          className="md:flex-row gap-4 md:gap-16 mb-16 items-start"
        >
          <Flex layout="col-left" className="gap-4 w-full mb-4 md:w-1/2">
            <TitleDerma size="xl">Beneficios</TitleDerma>
            {[
              {
                title: 'Prescripción médica',
                text: 'Los principios activos farmacológicos que contiene la formulación únicamente pueden ser recetados por un médico.',
              },
              {
                title: 'Formulación magistral',
                text: 'La combinación de fármacos creada exclusivamente para un paciente específico por su médico y preparada de manera personalizada en una farmacia.',
              },
              {
                title: 'Ingredientes testados',
                text: 'Al tratarse de principios activos farmacológicos, los ingredientes de la crema recetada se han sometido a ensayos clínicos más exhaustivos que los productos cosméticos.',
              },
              {
                title: 'Eficacia demostrada',
                text: 'Gracias a la comprobación empírica de la eficacia de los ingredientes y la personalización de la fórmula, los resultados son más notables y duraderos.',
              },
            ].map(item => (
              <SimpleAccordion
                key={item.title}
                className="p-4 md:mb-0 bg-white/50 rounded-2xl"
                trigger={item.title}
                triggerStyles="text-left items-start font-semibold"
                iconStyles="text-derma-primary500"
              >
                <Text size="sm" className="text-hg-black500 pt-4">
                  {item.text}
                </Text>
              </SimpleAccordion>
            ))}
          </Flex>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/derma/home/benefits.png"
              alt="Beneficios de las cremas formuladas"
              height={648}
              width={648}
              className="w-2/3 md:w-[80%]"
            />
          </div>
        </Flex>

        <Flex layout="col-center" className="md:flex-row gap-4 md:gap-16 mb-16">
          <Flex
            layout="col-left"
            className="gap-4 w-full mb-4 md:w-1/2 md:order-2"
          >
            <TitleDerma size="xl">Aplicación</TitleDerma>
            {[
              {
                title:
                  '<span class="font-semibold">¿Cuándo?</span> Por la noche.',
                text: 'Comienza aplicando una o dos veces por semana, aumentando la periodicidad gradualmente según la recomendación de tu médico.',
              },
              {
                title:
                  '<span class="font-semibold">¿Cómo?</span> Sobre la piel limpia y seca (antes de la crema hidratante).',
                text: 'A la mañana siguiente, lava bien tu rostro, aplica crema hidratante y protege tu piel con un SPF de amplio espectro.',
              },
              {
                title:
                  '<span class="font-semibold">¿Cuánto?</span> La cantidad del tamaño de un guisante',
                text: 'Este tipo de cremas son poderosas y eficaces, por eso, no necesitarás aplicar más cantidad para experimentar sus beneficios.',
              },
            ].map(item => (
              <SimpleAccordion
                key={item.title}
                className="p-4 md:mb-0 bg-white/50 rounded-2xl"
                trigger={item.title}
                triggerHasHtml
                triggerStyles="text-left items-start"
                iconStyles="text-derma-primary500"
              >
                <Text size="sm" className="text-hg-black500 pt-4">
                  {item.text}
                </Text>
              </SimpleAccordion>
            ))}
          </Flex>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/derma/home/application.png"
              alt="Beneficios de las cremas formuladas"
              height={572}
              width={432}
              className="w-2/3 md:w-[80%]"
            />
          </div>
        </Flex>

        {/* 
        <TitleDerma size="xl" className="mb-6 md:mb-16">
          Resultados de una formulación antiaging
        </TitleDerma>

        <Flex layout="col-left" className="w-full md:flex-row">
          <div className="relative pb-8 mb-4 md:w-[80%]">
            <SvgArrowSmallLeft className="md:hidden absolute -bottom-4 left-1/2 -translate-x-[12px] rotate-[270deg] text-derma-primary300" />
            <div className="md:hidden absolute h-full w-0.5 left-1/2 -translate-x-[1px] bg-gradient from-derma-tertiary via-derma-primary to-derma-primary300"></div>

            <SvgArrowSmallLeft className="hidden md:block absolute -right-2 -top-[11px] text-derma-primary300 rotate-180" />
            <div className="hidden md:block absolute h-0.5 w-full bg-gradient-to-r from-derma-tertiary via-derma-primary to-derma-primary300"></div>

            <ul className="flex flex-col md:flex-row text-xs w-full gap-6">
              <li className="w-1/2 pr-4 md:pr-0 relative md:pt-12">
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-derma-tertiary rounded-full top-0 -right-2 md:left-0 md:-top-[10px]"></div>
                <AnimateOnViewport>
                  <Text className="font-semibold mb-2 text-right md:text-left">
                    Primeras semanas
                  </Text>
                  <Text className="text-right md:text-left">
                    Con el uso inicial, puedes experimentar irritación,
                    enrojecimiento y descamación de la piel debido a la potencia
                    de sus principios activos farmacológicos
                  </Text>
                </AnimateOnViewport>
              </li>
              <li className="w-1/2 ml-auto pl-4 md:pl-0 relative md:pt-12">
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-[#1A798A] rounded-full top-0 -left-2 md:-top-[10px]"></div>

                <AnimateOnViewport>
                  <Text className="font-semibold mb-2">1-2 meses</Text>
                  <Text>
                    Textura de la piel más suave, unifica los tonos de la piel
                  </Text>
                </AnimateOnViewport>
              </li>
              <li className="w-1/2 pr-4 md:pr-0 relative md:pt-12">
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-derma-primary rounded-full top-0 -right-2 md:left-0 md:-top-[10px]"></div>

                <AnimateOnViewport>
                  <Text className="font-semibold mb-2 text-right md:text-left">
                    2-3 meses
                  </Text>
                  <Text className="text-right md:text-left">
                    Tonos de piel más brillantes, poros reducidos
                  </Text>
                </AnimateOnViewport>
              </li>
              <li className="w-1/2 ml-auto pl-4 md:pl-0 relative md:pt-12">
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-derma-primary500 rounded-full top-0 -left-2 md:-top-[10px]"></div>

                <AnimateOnViewport>
                  <Text className="font-semibold mb-2">6-12 meses</Text>
                  <Text>Arrugas reducidas, mejor elasticidad de la piel</Text>
                </AnimateOnViewport>
              </li>
              <li className="w-1/2 pr-4 md:pr-0 relative md:pt-12">
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-derma-primary300 rounded-full top-0 -right-2 md:left-0 md:-top-[10px]"></div>

                <AnimateOnViewport>
                  <Text className="font-semibold mb-2 text-right md:text-left">
                    +12 meses
                  </Text>
                  <Text className="text-right md:text-left">
                    Reducción significativa de las arrugas
                  </Text>
                </AnimateOnViewport>
              </li>
            </ul>
          </div>

          <Text className="text-hg-black500 text-center text-xs px-4 md:w-[20%] mt-2 md:-mt-10 md:pl-8 md:pr-0">
            El cuidado de la piel es un compromiso a largo plazo. Tu piel
            necesita un tiempo para adaptarse al nuevo tratamiento hasta lograr
            su tolerancia y experimentar los beneficios completos, en
            aproximadamente cuatro meses
          </Text>
        </Flex> */}
      </Container>
    </div>
  );
}
