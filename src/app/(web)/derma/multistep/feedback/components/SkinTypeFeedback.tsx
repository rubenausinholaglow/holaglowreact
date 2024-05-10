import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgArrow, SvgVerify } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

import MedicAdvice from './MedicAdvice';

export default function SkinTypeFeedback() {
  const { skinType } = useDermaStore(state => state);

  const imgName =
    skinType === 1
      ? 'pielSeca.svg'
      : skinType === 2
      ? 'pielMedia.svg'
      : 'pielGrasa.svg';

  return (
    <>
      <div className="relative rounded-3xl md:rounded-2xl w-full md:w-1/2 md:mt-12">
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
      <div id="tm_derma_step0" className="md:w-1/2">
        <Flex
          layout="col-left"
          className="items-center relative md:justify-center md:flex-row md:mt-12"
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

            <Flex className="justify-between w-full">
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
                href={ROUTES.derma.multistep.skinSensibility}
              >
                continuar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
