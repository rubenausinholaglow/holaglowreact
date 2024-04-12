import { DERMA_COLORS } from '@utils/colors';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgCheck, SvgInfoCircle } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { DERMA_PRODUCTS } from '../../planes/mockedData';
import GuaranteedResults from '../../precios/components/GuaranteedResults';
import OptionsPrices from '../../precios/components/OptionsPrices';

const ITEMS = [
  {
    title: 'Crema personalizada',
    text: 'Pídela en tu farmacia con la receta que te enviaremos',
  },
  {
    title: 'Espuma limpiadora',
    text: 'Mantén tu piel limpia para mejorar el efecto de la rutina',
  },
  {
    title: 'Protector solar 50+',
    text: 'Protege tu piel para prevenir el envejecimiento prematuro',
  },
  {
    title: 'Crema de día específica',
    text: 'Crema elegida específicamente por tu médico',
  },
];

export default function PlanesMultiStep() {
  return (
    <div className="bg-derma-secondary300 min-h-screen relative">
      <DermaLayout hideButton hideFooter>
        <Container className="mb-8">
          <Flex
            layout="col-center"
            className="w-full gap-4 md:items-start mb-8"
          >
            <Image
              alt="Dr. Basart"
              src="/images/derma/multistep/Sonsoles.png"
              height={192}
              width={192}
              className="mx-auto w-24 mb-4 md:ml-0"
            />
            <Title
              size="xldr"
              className="text-derma-primary font-light md:text-left"
            >
              Cada piel es única.
              <br /> Tu rutina facial también
            </Title>
          </Flex>

          <ul className="flex flex-col gap-4 w-full">
            {DERMA_PRODUCTS.sort((a, b) => a.order - b.order).map(
              (item, index) => (
                <li
                  className="flex items-center gap-4 border border-derma-secondary400 bg-white/70 p-3 w-full rounded-xl text-sm"
                  key={item.title}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    height={192}
                    width={164}
                    className="w-[82px]"
                  />
                  <div>
                    <Text className="font-semibold">{item.title}</Text>
                    <Text>{item.toggle}</Text>
                  </div>
                  <SvgArrow />
                </li>
              )
            )}
          </ul>
        </Container>
        <Container className="px-0 md:px-4 md:w-1/2">
          <div className="px-4 bg-derma-primary300/20 py-4 rounded-3xl md:p-0">
            <Title
              size="xldr"
              className="text-derma-primary font-light md:text-left mb-4"
            >
              Elige tu plan
            </Title>
            <Text className="text-sm mb-4">
              Selecciona el nivel de seguimiento médico y la frecuencia de
              entrega de tus cremas
            </Text>
          </div>
        </Container>
      </DermaLayout>
    </div>
  );
}
{
  /* <div className="bg-derma-secondary300 min-h-screen relative">
    <DermaLayout hideButton hideFooter>
      <Container className="px-0">
        <div className="md:flex gap-12 pt-8">
          <Container className="md:w-full mb-8">
            <Flex layout="col-center" className="w-full gap-4 md:items-start">
              <Image
                alt="Dr. Sonsoles"
                src="/images/derma/multistep/Sonsoles.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4 md:ml-0"
              />
              <Title size="xldr" className="text-derma-primary font-light">
                Cada piel es única
              </Title>
              <Title size="xldr" className="text-derma-primary font-light">
                Tu rutina facial también.
              </Title>
            </Flex>
            <Flex
              layout="col-left"
              className={`transition-opacity gap-4 w-full`}
            >
              {ITEMS.map((item, index) => (
                <div className="w-full relative">
                  <Flex
                    layout="row-left"
                    className="border border-derma-primary500 bg-white rounded-xl py-4 px-3 w-full relative min-h-[98px]"
                  >
                    <div className="relative h-16 w-16 aspect-square rounded-xl overflow-hidden mr-4 shrink-0">
                      <Image
                        src="/images/derma/multistep/faceIcon.png"
                        fill
                        objectFit="cover"
                        alt="alt"
                      />
                    </div>
                    <div className="mr-auto overflow-hidden">
                      <Text className="text-sm">
                        <span className="font-semibold">{item.title}</span>
                      </Text>
                      <Text className="text-sm">
                        <span>{item.text}</span>
                      </Text>
                    </div>
                  </Flex>
                </div>
              ))}
            </Flex>
            <OptionsPrices isMultistep={true} />
            <div className="bg-derma-secondary300">
              <GuaranteedResults />
            </div>
          </Container>
        </div>
      </Container>
    </DermaLayout>
  </div> */
}
