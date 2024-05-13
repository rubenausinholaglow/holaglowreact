import { isMobile } from 'react-device-detect';
import ROUTES from '@utils/routes';
import { SvgArrow, SvgVerify } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

import { PAINS_AND_SYMPTOMS } from '../../multistepConfig';
import MedicAdvice from './MedicAdvice';

export default function PainFeedback() {
  const { pain } = useDermaStore(state => state);

  const filteredFeedback = PAINS_AND_SYMPTOMS.filter(
    item => item.value === pain
  )[0];

  console.log(pain, filteredFeedback);

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
          ¡Entendido! Una crema efectiva para{' '}
          <span className="font-semibold">
            {filteredFeedback.name.toLocaleLowerCase()}
          </span>{' '}
          contiene:
        </Text>
      </div>
      <div id="tm_derma_step0" className="md:w-1/2">
        <Flex
          layout="col-left"
          className="items-center relative md:justify-center md:flex-row md:mt-12"
        >
          <Flex layout="col-left" className="relative z-10 py-4">
            <Flex className="justify-center w-full -ml-8">
              {filteredFeedback?.feedback &&
                filteredFeedback.feedback.ingredients.map(item => (
                  <Image
                    key={item.name}
                    src={item.imgUrl}
                    alt={item.name}
                    width={144}
                    height={144}
                    className="-mr-16"
                  />
                ))}
            </Flex>

            <ul className="flex flex-col gap-4 md:gap-6 w-full mb-8 md:mb-16 text-sm md:text-lg">
              {filteredFeedback?.feedback &&
                filteredFeedback.feedback.ingredients.map(item => (
                  <li className="flex items-start gap-3 w-full" key={item.name}>
                    <SvgVerify className="text-derma-primary500 shrink-0" />
                    <div>
                      <Text className="font-semibold mb-1">{item.name}</Text>
                      <Text>{item.subtitle}</Text>
                      {item.extraInfo && (
                        <Text className="text-xs md:text-md text-hg-black500">
                          {item.extraInfo}
                        </Text>
                      )}
                    </div>
                  </li>
                ))}
            </ul>

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
                href={ROUTES.derma.multistep.skinType}
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
