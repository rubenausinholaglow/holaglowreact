'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaStepBar from 'app/(web)/(derma)/components/DermaStepBar';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow, SvgVerify } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DERMA_INGREDIENTS, PAINS_AND_SYMPTOMS } from '../../multistepConfig';
import MedicAdvice from '../components/MedicAdvice';

export default function PainFeedback() {
  const router = useRouter();
  const { pain } = useDermaStore(state => state);

  const [painItem, setPainItem] = useState<any>(undefined);
  const [painIngredients, setPainIngredients] = useState<any>(undefined);

  useEffect(() => {
    const painItem = PAINS_AND_SYMPTOMS.filter(item => item.value === pain)[0];
    setPainItem(painItem);

    const ingredients = painItem?.feedback?.ingredients as string[] | undefined;

    const painIngredients = DERMA_INGREDIENTS.filter(
      item => ingredients?.includes(item.name)
    );
    setPainIngredients(painIngredients);
  }, []);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={5} />

        <Container>
          <Flex layout="col-left" className="md:flex-row w-full md:gap-16">
            <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-4">
              <Image
                alt="Dra. Sonsoles Espí"
                src="/images/derma/multistep/Sonsoles.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4 md:ml-0"
              />
              <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra mb-4">
                ¡Entendido! Una crema efectiva para{' '}
                <span className="font-semibold">
                  {painItem?.name?.toLocaleLowerCase()}
                </span>{' '}
                contiene:
              </Text>
            </div>
            <div className="md:w-1/2">
              <Flex
                layout="col-left"
                className="items-center relative md:justify-center md:flex-row md:mt-4"
              >
                <Flex layout="col-left" className="relative z-10">
                  <Flex className="justify-center w-full -ml-6 mb-8">
                    {painIngredients &&
                      painIngredients.length > 0 &&
                      painIngredients.map((ingredient: any) => (
                        <Image
                          key={ingredient.name}
                          src={ingredient.imgSrc}
                          alt={ingredient.name}
                          width={392}
                          height={392}
                          className="w-[150px] md:w-[200px] -mr-12 rounded-full shadow-centered-black-md"
                        />
                      ))}
                  </Flex>

                  <ul className="flex flex-col gap-4 md:gap-6 w-full mb-8 md:mb-16 text-sm md:text-lg">
                    {painIngredients &&
                      painIngredients.length > 0 &&
                      painIngredients.map((ingredient: any) => (
                        <li
                          className="flex items-start gap-3 w-full"
                          key={ingredient.name}
                        >
                          <SvgVerify className="text-derma-primary500 shrink-0" />
                          <div>
                            <Text className="font-semibold mb-1">
                              {ingredient.name}
                            </Text>
                            <Text>{ingredient.feedbackSubtitle}</Text>
                            {ingredient.feedbackExtraInfo && (
                              <Text className="text-xs md:text-md text-hg-black500">
                                {ingredient.feedbackExtraInfo}
                              </Text>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>

                  <MedicAdvice />

                  <Flex className="justify-between w-full mb-8">
                    <Button
                      type="whiteDerma"
                      customStyles="bg-transparent border-none"
                      onClick={() => router.back()}
                      size="lg"
                    >
                      <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                      <Text className="text-derma-tertiary">Atrás</Text>
                    </Button>
                    <Button
                      type="derma"
                      size="lg"
                      href={ROUTES.derma.multistep.skinType}
                    >
                      Continuar
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
