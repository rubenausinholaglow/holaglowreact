import { multiValueCSS } from 'react-select/dist/declarations/src/components/MultiValue';
import { isMobileSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { SUBSCRIPTIONS } from '../../planes/mockedData';

export default function OptionsPrices() {
  return (
    <div className="bg-derma-secondary300 py-4">
      <Container className="px-0 md:px-4 ">
        <div className="px-4 bg-derma-primary300/20 py-4 rounded-3xl -mt-4 md:p-6">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-8">
            {SUBSCRIPTIONS.map((subscription, index) => (
              <li
                className={`relative flex flex-col p-4 pt-8 md:p-6 md:pt-16 justify-center rounded-2xl md:w-1/2 ${subscription.bgColor}`}
                key={subscription.title}
              >
                {subscription.tag?.text && (
                  <p
                    className={`absolute top-4 right-4 md:top-6 md_right-6 ${subscription.tag.styles}`}
                  >
                    {subscription.tag.text}
                  </p>
                )}
                <Image
                  src={subscription.imgSrc}
                  alt={subscription.title}
                  height={200}
                  width={200}
                  className={`mb-4 mx-auto ${
                    index === 0 && isMobileSSR() ? 'mt-8' : ''
                  }`}
                />
                <Text className="text-lg md:text-xl font-semibold mb-2">
                  {subscription.title}
                </Text>
                <Text className="text-3xl font-bold text-derma-primary500">
                  {subscription.price.value}
                </Text>
                <Text className="text-sm text-derma-primary500">
                  {subscription.price.subtitle}
                </Text>
                <ul className="border-t border-hg-black100 mt-4 py-4 flex flex-col gap-4 ">
                  {subscription.bullets.map(bullet => (
                    <li
                      key={bullet.text}
                      className="flex gap-3 items-start w-full"
                    >
                      <div
                        className={`flex justify-center items-center rounded-full h-8 w-8 -mt-1 ${
                          bullet.isEnabled
                            ? 'bg-derma-primary/20 text-hg-black'
                            : 'bg-hg-black100 text-hg-error'
                        }`}
                      >
                        <DynamicIcon
                          family="default"
                          name={bullet.icon}
                          height={bullet.isEnabled ? 20 : 14}
                          width={bullet.isEnabled ? 20 : 14}
                        />
                      </div>
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Flex className="justify-center">
            <Button
              type="derma"
              size="xl"
              customStyles="px-16"
              href={ROUTES.derma.multistep.start}
            >
              Empezar análisis de piel
            </Button>
          </Flex>
        </div>
      </Container>
    </div>
  );
}
