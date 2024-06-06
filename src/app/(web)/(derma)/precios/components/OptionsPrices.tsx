'use client';

import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { SUBSCRIPTIONS } from '../../planes/mockedData';
import OptionsPricesSelectButton from './OptionsPricesSelectButton';

export function RoutineCard({ routine, pain }: { routine: any; pain?: any }) {
  console.log(pain);

  return (
    <li
      className={`relative flex-grow w-full rounded-2xl ${routine?.bgColor}`}
      key={routine.title}
    >
      <div className="p-4 md:py-12 md:px-6 w-full flex flex-col md:flex-row md:items-center ">
        {routine?.imgSrc && (
          <div className="w-full md:w-1/2">
            <Image
              src={routine.imgSrc}
              alt={routine.title}
              height={538}
              width={706}
              className="mb-4 mx-auto mt-2 w-4/5"
            />
          </div>
        )}
        <div className="w-full md:w-1/2">
          <Text className="text-lg md:text-xl font-semibold">
            {routine.title}
            {pain?.name ? ` para ${pain?.name.toLocaleLowerCase()}` : ''}
          </Text>
          <Text className="text-hg-black400 mb-2 text-sm md:text-md">
            Este pack te servirá para los próximos 3 meses
          </Text>
          <Text className="text-3xl font-bold text-derma-primary500">
            <span>{routine.price.value}</span>
          </Text>
          <Text className="text-sm text-derma-primary500">
            {routine.price.subtitle}
          </Text>
          <ul className="border-t border-hg-black100 mt-4 py-4 flex flex-col gap-4 ">
            {routine.bullets.map((bullet: any, index: number) => (
              <li key={bullet.text} className="flex gap-3 items-start w-full">
                <div
                  className={`flex justify-center items-center rounded-full h-8 w-8 -mt-1 text-left ${
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
                <Text>
                  {bullet.text}
                  {index === 0 && pain?.name
                    ? ` para ${pain?.name.toLocaleLowerCase()}`
                    : ''}
                </Text>
              </li>
            ))}
          </ul>
          {pain && (
            <Flex className="mt-8 w-full items-center justify-center md:justify-start">
              <OptionsPricesSelectButton index={0} />
            </Flex>
          )}
        </div>
      </div>
    </li>
  );
}

export default function OptionsPrices({ pain }: { pain?: any }) {
  console.log(pain);

  return (
    <div className="bg-derma-secondary300 py-4">
      <Container className={`px-0 ${pain ? '' : 'md:px-4'}`}>
        <div className="px-4 bg-derma-primary300/20 py-4 rounded-3xl -mt-4 md:p-6">
          {/* {pain && (
            <>
              <Title size="xldr" className="text-derma-primary font-light">
                Elige tu plan
              </Title>
              <Text className="">
                Selecciona el nivel de seguimiento médico y la frecuencia de
                entrega de tus cremas
              </Text>
            </>
          )} */}
          <ul
            className={`flex flex-col md:flex-row gap-4 md:gap-6 w-full ${
              pain ? '' : 'mb-8'
            }`}
          >
            {[SUBSCRIPTIONS[0]].map((subscription, index) => (
              <RoutineCard
                key={subscription.title}
                routine={subscription}
                pain={pain}
              />
            ))}
          </ul>
          {!pain && (
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
