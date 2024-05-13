import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

import MedicAdvice from './MedicAdvice';

export default function SkinColorFeedback() {
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
          ¡Cada piel es única! Ajustaremos la composición de tu crema para que
          sea compatible con tu piel
        </Text>
      </div>
      <div id="tm_derma_step0" className="w-full md:w-1/2">
        <Flex className="flex-col items-center justify-center py-12 gap-12">
          <Image
            alt="sensibilidad"
            src="/images/derma/multistep/skinColorFeedback/sensibilidad.svg"
            height={358}
            width={76}
            className="w-full"
          />
          <Image
            alt="color de piel"
            src="/images/derma/multistep/skinColorFeedback/color.svg"
            height={358}
            width={76}
            className="w-full"
          />
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
            href={ROUTES.derma.multistep.somethingElse}
          >
            continuar
          </Button>
        </Flex>
      </div>
    </>
  );
}
