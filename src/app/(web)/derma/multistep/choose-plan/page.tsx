import { DERMA_COLORS } from '@utils/colors';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgCheck, SvgInfoCircle } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { DERMA_PRODUCTS } from '../../planes/mockedData';

export default function ChoosePlan() {
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
