'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import {
  SvgArrow,
  SvgCheckSquare,
  SvgCheckSquareActive,
} from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';

const CATEGORIES_BY_PAIN = [
  {
    name: 'Acné',
    categories: ['Acné 1', 'Acné 2', 'Acné 3', 'Acné 4', 'Acné 5'],
  },
  {
    name: 'Enrojecimiento / Rosácea',
    categories: [
      'Enrojecimiento / Rosácea 1',
      'Enrojecimiento / Rosácea 2',
      'Enrojecimiento / Rosácea 3',
      'Enrojecimiento / Rosácea 4',
      'Enrojecimiento / Rosácea 5',
    ],
  },
  {
    name: 'Melasma / Manchas',
    categories: [
      'Melasma / Manchas 1',
      'Melasma / Manchas 2',
      'Melasma / Manchas 3',
      'Melasma / Manchas 4',
      'Melasma / Manchas 5',
    ],
  },
  {
    name: 'Dermatitis',
    categories: [
      'Dermatitis 1',
      'Dermatitis 2',
      'Dermatitis 3',
      'Dermatitis 4',
      'Dermatitis 5',
    ],
  },
];

export default function Inquietudes() {
  const router = useRouter();
  const { pain, categories, setCategories } = useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    const hasExtraCategory = categories.filter(category =>
      category.startsWith('Extra:')
    );

    if (hasExtraCategory.length > 0) {
      setTextAreaValue(hasExtraCategory[0].substring(6));
    }
  }, [categories]);

  function handleTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const categoriesWithoutExtra = categories.filter(
      category => !category.startsWith('Extra:')
    );

    setCategories(categoriesWithoutExtra);

    if (event.target.value.length > 0) {
      setCategories([
        ...categoriesWithoutExtra,
        `Extra: ${event.target.value}`,
      ]);
    }
  }

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={2} />
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
                Paso 2. Necesidades personales
              </Text>
              <Title className="text-derma-primary font-light mb-1">
                Selecciona las inquietudes que te gustaría resolver en tu
                consulta
              </Title>
              <Text className="text-sm text-hg-black500">
                Elige tantas opciones como desees
              </Text>
            </div>

            <div className="w-full">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {CATEGORIES_BY_PAIN.filter(
                  item => item.name === pain
                )[0].categories.map(category => (
                  <li
                    className={`transition-all rounded-xl p-3 flex justify-between ${
                      categories.includes(category)
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={category}
                    onClick={() => {
                      if (categories.includes(category)) {
                        setCategories(
                          categories.filter(cat => cat !== category)
                        );
                      } else {
                        setCategories([...categories, category]);
                      }
                    }}
                  >
                    {category}
                    {categories.includes(category) ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
                <li
                  className={`transition-all rounded-xl p-3 ${
                    textAreaValue.length > 0
                      ? 'bg-derma-primary/20'
                      : 'bg-derma-secondary400'
                  }`}
                >
                  <Text className="mb-2">Cuéntame tu vida</Text>
                  <textarea
                    className="w-full h-24 md:h-48 p-2 text-sm"
                    placeholder="Escribe aquí tus movidas"
                    onChange={event => {
                      handleTextArea(event);
                      setTextAreaValue(event.target.value);
                    }}
                    value={textAreaValue.replace(/^\s+/, '')}
                  />
                </li>
              </ul>
              <Flex className="justify-between pb-12">
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onclick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={ROUTES.derma.multistep.skinType}
                  type={categories.length > 0 ? 'dermaDark' : 'disabled'}
                >
                  Siguiente
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
