import { DERMA_COLORS } from '@utils/colors';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheck, SvgInfoCircle } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import OptionsPrices from '../../precios/components/OptionsPrices';
import GuaranteedResults from '../../precios/components/GuaranteedResults';

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
    </div>
  );
}
