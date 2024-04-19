import { isMobileSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { SUBSCRIPTIONS } from '../../planes/mockedData';
import OptionsPricesSelectButton from './OptionsPricesSelectButton';

export default function OptionsPrices({
  isMultistep,
}: {
  isMultistep?: boolean;
}) {
  return (
    <div className="bg-derma-secondary300 py-4">
      <Container className="px-0 md:px-4 ">
        <div className="px-4 bg-derma-primary300/20 py-4 rounded-3xl -mt-4 md:p-6">
          {isMultistep && (
            <>
              <Title size="xldr" className="text-derma-primary font-light">
                Elige tu plan
              </Title>
              <Text className="">
                Selecciona el nivel de seguimiento médico y la frecuencia de
                entrega de tus cremas
              </Text>
            </>
          )}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-8">
            {[SUBSCRIPTIONS[0], SUBSCRIPTIONS[1]].map((subscription, index) => (
              <li
                className={`relative flex-grow md:w-1/2 rounded-2xl ${subscription.bgColor}`}
                key={subscription.title}
              >
                <div className="p-4 md:p-6">
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
                    <span>{subscription.price.value}</span>
                    {subscription.price?.discount && (
                      <span className="bg-derma-primary500 text-md py-1 px-3 rounded-full text-white inline-block relative bottom-1.5 ml-4">
                        {subscription.price.discount}
                      </span>
                    )}
                  </Text>
                  {subscription.price?.oldValue && (
                    <Text className="text-sm text-hg-error line-through">
                      {subscription.price.value}
                    </Text>
                  )}
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
                </div>
                {subscription.bottomBar && (
                  <div
                    className="bg-derma-primary300 p-4 py-3 rounded-b-2xl text-center"
                    dangerouslySetInnerHTML={{
                      __html: subscription.bottomBar,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
          {!isMultistep && (
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
          )}
        </div>
      </Container>
    </div>
  );
}
