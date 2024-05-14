import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SKIN_COLORS } from '../../multistepConfig';
import MedicAdvice from './MedicAdvice';

export default function SkinColorFeedback() {
  const router = useRouter();
  const { skinSensibility, skinColor } = useDermaStore(state => state);

  const DisplayPositions = {
    skinSensibility: [
      { value: 1, position: '-5%' },
      { value: 2, position: '45%' },
      { value: 3, position: '95%' },
    ],
    skinColor: [
      { value: 1, position: '-5%', color: '#FFE6E0' },
      { value: 2, position: '15%', color: '#EBD2C3' },
      { value: 3, position: '35%', color: '#D8BDB1' },
      { value: 4, position: '55%', color: '#B87E69' },
      { value: 5, position: '75%', color: '#653121' },
      { value: 6, position: '95%', color: '#3C201C' },
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
        <Container>
          <Flex layout="col-left" className="md:flex-row w-full md:gap-16">
            <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
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
              <Flex className="flex-col items-center justify-center py-12 gap-12">
                <div className="px-4 w-full">
                  <CheckHydration>
                    <div className="relative w-full h-32">
                      <div
                        className="bg-white rounded-full h-10 w-10 absolute bg-gradient-radial from-derma-primary100 to-derma-primary500 to-50%"
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
                            skinSensibility === 1 ? '' : 'text-hg-black400'
                          }
                        >
                          Poco sensible
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
                            skinSensibility === 3 ? '' : 'text-hg-black400'
                          }
                        >
                          Muy sensible
                        </Text>
                      </Flex>
                    </div>
                  </CheckHydration>

                  <div className="relative w-full h-32">
                    <div
                      className="bg-white rounded-full h-10 w-10 absolute"
                      style={{
                        left: DisplayPositions['skinColor'].filter(
                          item => item.value === skinColor
                        )[0].position,
                        background: `radial-gradient(circle, rgba(255,255,255,.2) 0%, ${
                          DisplayPositions['skinColor'].filter(
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
                    <Flex
                      layout="row-between"
                      className="w-full absolute bottom-8 left-0 right-0 text-xs"
                    >
                      <Text className="text-hg-black400">Piel clara</Text>
                      <Text className="text-hg-black400 absolute left-1/2 -translate-x-1/2">
                        Piel media
                      </Text>
                      <Text className="text-hg-black400">Piel oscura</Text>
                    </Flex>
                  </div>
                </div>
              </Flex>

              <MedicAdvice />

              <Flex className="justify-between w-full mb-8">
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onClick={() => router.back()}
                  size={isMobile ? 'md' : 'lg'}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  type="derma"
                  size={isMobile ? 'md' : 'lg'}
                  href={ROUTES.derma.multistep.secondaryConcern}
                >
                  continuar
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
