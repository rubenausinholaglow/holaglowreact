import { SvgArrow } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BenefitsApplicationResultsDerma({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`py-12 bg-derma-primary100 ${className}`}>
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="mb-6 md:mb-8 text-derma-primary"
        >
          Una rutina minimalista
        </Title>
        <Text className="text-hg-black500 mb-8 md:text-lg">
          Lo que tu piel necesita. Nada más. Nada menos.
        </Text>

        <Flex
          layout="col-center"
          className="md:flex-row gap-4 md:gap-16 mb-16 items-start"
        >
          <Flex layout="col-left" className="gap-4 w-full mb-4 md:w-1/2">
            <Title size="xl" className="mb-4 text-derma-tertiary font-light">
              Una crema facial personalizada
            </Title>
            {[
              {
                title: 'Recetada por un médico',
              },
              {
                title: 'Compuesta por ingredientes médicos',
              },
              {
                title: 'Específica para tus objetivos',
              },
              {
                title: 'Adaptada a tu tipo de piel',
              },
            ].map(item => (
              <Flex
                key={item.title}
                className="bg-white/50 p-4 md:text-lg rounded-2xl gap-4 w-full"
              >
                <SvgArrow className="text-derma-primary500" />
                <Text>{item.title}</Text>
              </Flex>
            ))}
          </Flex>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/derma/home/cremaFormulada.png"
              alt="Beneficios de las cremas formuladas"
              height={648}
              width={648}
              className="w-1/2 md:w-[80%]"
            />
          </div>
        </Flex>

        <Flex layout="col-center" className="md:flex-row gap-4 md:gap-16 mb-16">
          <Flex
            layout="col-left"
            className="gap-4 w-full mb-4 md:w-1/2 md:order-2"
          >
            <Title size="xl" className="mb-4 text-derma-tertiary font-light">
              Tres cremas complementarias
            </Title>
            {[
              {
                title: 'Mantienen tu piel limpia',
              },
              {
                title: 'Evitan el envejecimiento prematuro de la piel',
              },
              {
                title: 'Potencian el efecto de la crema personalizada',
              },
            ].map(item => (
              <Flex
                key={item.title}
                className="bg-white/50 p-4 md:text-lg rounded-2xl gap-4 w-full"
              >
                <SvgArrow className="text-derma-primary500" />
                <Text>{item.title}</Text>
              </Flex>
            ))}
          </Flex>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/derma/home/cremasComplementarias.png"
              alt="Beneficios de las cremas formuladas"
              height={648}
              width={648}
              className="w-1/2 md:w-[80%]"
            />
          </div>
        </Flex>

        {/* 
        <Title size="xl" className="mb-6 md:mb-16">
          Resultados de una formulación antiaging
        </Title>

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
