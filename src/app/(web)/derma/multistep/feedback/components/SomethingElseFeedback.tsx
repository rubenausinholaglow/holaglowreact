import { isMobile } from 'react-device-detect';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { SvgStethoscope } from 'app/icons/Icons';
import { SvgArrow, SvgVerify } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import router from 'next/router';

import { DERMA_INGREDIENTS } from '../../multistepConfig';
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
          ¡Muy bien! Completaremos tu crema con los ingredientes activos
          necesarios
        </Text>
      </div>
      <div id="tm_derma_step0" className="md:w-1/2">
        <Flex
          layout="col-left"
          className="items-center relative md:justify-center md:flex-row md:mt-12"
        >
          <Flex layout="col-left" className="relative z-10 py-4">
            olakease
            {/* <FullWidthCarousel className="pb-8" isDerma>
              {DERMA_INGREDIENTS.map(ingredient => (
                <Flex
                  layout="col-left"
                  className="w-full pr-6 gap-2"
                  key={ingredient.name}
                >
                  <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 mb-2 py-4 overflow-hidden">
                    <Image
                      alt={ingredient.name}
                      src={ingredient.imgSrc}
                      fill
                      className="scale-110 object-contain"
                    />
                  </Flex>

                  <Text className="text-lg font-semibold">
                    {ingredient.name}
                  </Text>
                  <Text className="">
                    Concentración{' '}
                    <span className="font-semibold">
                      {ingredient.concentration}
                    </span>
                  </Text>

                  <ul className="flex gap-2">
                    {ingredient.tags.map(tag => (
                      <li
                        key={tag}
                        className="px-2 py-1 rounded-full bg-derma-primary100 text-derma-primary text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Text className="text-sm text-hg-black500">
                    {ingredient.description}
                  </Text>
                </Flex>
              ))}
            </FullWidthCarousel> */}
          </Flex>
        </Flex>
      </div>
    </>
  );
}
