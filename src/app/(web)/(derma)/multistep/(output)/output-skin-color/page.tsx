'use client';

import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import DermaStepBar from 'app/(web)/(derma)/components/DermaStepBar';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SKIN_COLORS } from '../../multistepConfig';
import MedicAdvice from '../components/MedicAdvice';

export default function SkinColorFeedback() {
  const router = useRouter();
  const { pain, skinSensibility, skinColor } = useDermaStore(state => state);

  const DisplayPositions = {
    skinSensibility: [
      { value: 3, position: '0%' },
      { value: 2, position: '50%' },
      { value: 1, position: '100%' },
    ],
    skinColor: [
      { value: 0, position: '0%', color: SKIN_COLORS[0].color },
      { value: 1, position: '20%', color: SKIN_COLORS[1].color },
      { value: 2, position: '40%', color: SKIN_COLORS[2].color },
      { value: 3, position: '60%', color: SKIN_COLORS[3].color },
      { value: 4, position: '80%', color: SKIN_COLORS[4].color },
      { value: 5, position: '0%', color: SKIN_COLORS[5].color },
    ],
  };

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={10} />

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
                ¡Cada piel es única! Ajustaremos la composición de tu crema para
                que sea compatible con tu piel
              </Text>
            </div>
            <div className="w-full md:w-1/2">
              <Flex className="flex-col items-center justify-center gap-12 md:mt-4">
                <div className="px-8 md:px-4 w-full">
                  <CheckHydration>
                    <div className="relative w-full h-32">
                      <div
                        className="bg-white rounded-full h-10 w-10 absolute bg-gradient-radial from-derma-primary100 to-derma-primary500 to-50% border border-white -translate-x-1/2"
                        style={{
                          left: DisplayPositions['skinSensibility'].filter(
                            item => item.value === skinSensibility
                          )[0].position,
                        }}
                      />
                      <Image
                        alt="sensibilidad"
                        src="/images/derma/multistep/feedback/lineasSensibilidadPiel.svg"
                        fill
                      />
                      <Flex
                        layout="row-between"
                        className="w-full absolute bottom-8 left-0 right-0 text-xs"
                      >
                        <Text
                          className={
                            skinSensibility === 3 ? '' : 'text-hg-black400'
                          }
                        >
                          Muy sensible
                        </Text>
                        <Text
                          className={
                            skinSensibility === 2 ? '' : 'text-hg-black400'
                          }
                        >
                          Algo sensible
                        </Text>
                        <Text
                          className={
                            skinSensibility === 1 ? '' : 'text-hg-black400'
                          }
                        >
                          Poco sensible
                        </Text>
                      </Flex>
                    </div>
                  </CheckHydration>

                  <div className="relative w-full h-32">
                    <div
                      className="bg-white rounded-full h-10 w-10 absolute border border-white -translate-x-1/2"
                      style={{
                        left: DisplayPositions['skinColor'].filter(
                          item => item.value === skinColor
                        )[0].position,
                        background: `radial-gradient(circle, rgba(255,255,255,.2) 0%, ${
                          DisplayPositions.skinColor.filter(
                            item => item.value === skinColor
                          )[0].color
                        } 50%)`,
                      }}
                    />

                    <Image
                      alt="color de piel"
                      src="/images/derma/multistep/feedback/lineasTonoPiel.svg"
                      fill
                    />
                    <div
                      className="w-24 absolute bottom-8 text-xs text-center -translate-x-1/2"
                      style={{
                        left: DisplayPositions['skinColor'].filter(
                          item => item.value === skinColor
                        )[0].position,
                      }}
                    >
                      {
                        SKIN_COLORS.filter(item => item.value === skinColor)[0]
                          .title
                      }
                    </div>
                  </div>
                </div>
              </Flex>

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
                  href={ROUTES.derma.multistep.secondaryConcern}
                >
                  Continuar
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
