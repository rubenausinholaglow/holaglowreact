'use client';

import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import DermaStepBar from 'app/(web)/(derma)/components/DermaStepBar';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DERMA_INGREDIENTS } from '../../multistepConfig';
import MedicAdvice from '../components/MedicAdvice';

export default function SkinTypeFeedback() {
  const router = useRouter();

  const { secondaryConcerns } = useDermaStore(store => store);

  const filteredIngredients = DERMA_INGREDIENTS.filter(ingredient => {
    return ingredient.concerns.some(concern =>
      secondaryConcerns.includes(concern)
    );
  });

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={10.66} />

        <Container className="px-0 md:px-4">
          <Flex layout="col-left" className="md:flex-row w-full md:gap-16">
            <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
              <Container className="md:px-0">
                <Image
                  alt="Dra. Sonsoles Espí"
                  src="/images/derma/multistep/Sonsoles.png"
                  height={192}
                  width={192}
                  className="mx-auto w-24 mb-4 md:ml-0"
                />
                <Text className="text-xl md:text-3xl text-derma-primary font-light font-gtUltra mb-4">
                  ¡Muy bien! Completaremos tu crema con los ingredientes activos
                  necesarios
                </Text>
              </Container>
            </div>
            <div className="w-full md:w-1/2">
              <Container className="px-0 md:pl-4">
                <Carousel
                  isIntrinsicHeight
                  hasControls={!isMobile && filteredIngredients.length > 2}
                  visibleSlides={isMobile ? 1.5 : 2}
                  infinite={false}
                  isDerma
                  controlstyles="pr-4"
                  className="mb-12"
                >
                  {filteredIngredients.map(ingredient => (
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
              </Container>
              <Container className="md:pl-8">
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
                    href={ROUTES.derma.multistep.allergy}
                  >
                    Continuar
                  </Button>
                </Flex>
              </Container>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
