'use client';

import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Inquietudes() {
  const { inquietudes, setInquietudes } = useDermaStore(state => state);

  console.log(inquietudes);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <Container className="px-0 md:px-4 md:pt-12">
          <div className="md:w-1/2 md:pr-8">
            <ul className="flex bg-derma-primary500/20 h-[4px] w-full rounded-full mb-6">
              <li className="h-[4px] rounded-full bg-derma-primary transition-all w-[25%]"></li>
            </ul>
          </div>
        </Container>
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16"
          >
            <div>
              <Image
                alt="Dr. Basart"
                src="/images/derma/multistep/Basart.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4"
              />
              <Text className="text-xs text-derma-primary500 mb-1">
                Paso 1. Necesidades personales
              </Text>
              <Title className="text-derma-primary font-light mb-1">
                Selecciona las inquietudes que te gustaría resolver en tu
                consulta
              </Title>
              <Text className="text-sm text-hg-black500">
                Elige tantas opciones como desees
              </Text>
            </div>

            <ul className="flex flex-col gap-4 w-full">
              {[
                'Acné',
                'Enrojecimiento / Rosácea',
                'Melasma / Manchas',
                'Dermatitis',
                'No se lo que tengo',
              ].map(item => (
                <li
                  className={`transition-all rounded-xl p-3 flex justify-between ${
                    inquietudes === item
                      ? 'bg-derma-primary/20'
                      : 'bg-derma-secondary400'
                  }`}
                  key={item}
                  onClick={() => setInquietudes(item)}
                >
                  {item}
                  {inquietudes === item ? (
                    <SvgCheckSquareActive className="h-6 w-6" />
                  ) : (
                    <SvgCheckSquare className="h-6 w-6" />
                  )}
                </li>
              ))}
            </ul>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
