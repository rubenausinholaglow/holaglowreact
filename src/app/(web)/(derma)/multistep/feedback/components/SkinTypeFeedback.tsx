import { isMobile } from 'react-device-detect';
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

import MedicAdvice from './MedicAdvice';

export default function SkinTypeFeedback() {
  const router = useRouter();

  const { skinType } = useDermaStore(state => state);

  const imgName =
    skinType === 1
      ? 'pielSeca.svg'
      : skinType === 3
      ? 'pielGrasa.svg'
      : 'pielMedia.svg';

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary500 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={7} />

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
                ¡Recibido! La base de tu crema será la que necesita tu piel
              </Text>
            </div>
            <div className="md:w-1/2">
              <Flex
                layout="col-left"
                className="items-center relative md:justify-center md:flex-row md:mt-4"
              >
                <Flex layout="col-left" className="relative z-10 py-4">
                  <Flex className="justify-center w-full mb-8">
                    <CheckHydration>
                      <Image
                        src={`/images/derma/multistep/skinTypeFeedback/${imgName}`}
                        alt="Pieles secas"
                        width={280}
                        height={264}
                        className=""
                      />
                    </CheckHydration>
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
                      href={ROUTES.derma.multistep.skinSensibility}
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
