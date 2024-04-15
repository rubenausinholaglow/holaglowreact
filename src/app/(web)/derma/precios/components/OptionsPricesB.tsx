'use client';

import { isMobile } from 'react-device-detect';
import { multiValueCSS } from 'react-select/dist/declarations/src/components/MultiValue';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgAngleDown } from 'app/icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { SUBSCRIPTIONS } from '../../planes/mockedData';
import OptionsPricesSelectButton from './OptionsPricesSelectButton';

export default function OptionsPricesB({
  isMultistep,
  selectedOption,
  setSelectedOption,
  accordionValue,
  setAccordionValue,
}: {
  isMultistep: boolean;
  selectedOption?: string;
  setSelectedOption?: (value: string) => void;
  accordionValue?: string;
  setAccordionValue?: (value: string) => void;
}) {
  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-8">
      {SUBSCRIPTIONS.map((subscription, index) => (
        <CheckHydration key={subscription.title}>
          <li
            className={`relative flex flex-col p-4 justify-center rounded-2xl md:w-1/2 ${subscription.bgColor}`}
          >
            <Flex
              className="gap-2 w-full mb-1"
              onClick={() =>
                setSelectedOption
                  ? index.toString() === selectedOption
                    ? setSelectedOption('99')
                    : setSelectedOption(index.toString())
                  : null
              }
            >
              {index.toString() === selectedOption ? (
                <SvgCheckSquareActive className="h-6 w-6 shrink-0 md:hidden" />
              ) : (
                <SvgCheckSquare className="h-6 w-6 shrink-0 md:hidden" />
              )}
              <Text className="font-semibold md:hidden">
                {subscription.title}
              </Text>
              {subscription.tag?.text && (
                <p
                  className={`${subscription.tag.styles} shrink-0 md:absolute top-4 right-4`}
                >
                  {isMobile
                    ? subscription.tag.text.isMobile
                    : subscription.tag.text.isDesktop}
                </p>
              )}
            </Flex>
            <Text className="text-sm mb-4 md:hidden">
              {subscription.subtitle}
            </Text>

            <Accordion value={isMobile ? accordionValue : 'isOpen'}>
              <AccordionItem value={isMobile ? index.toString() : 'isOpen'}>
                <div
                  className="flex justify-between items-center md:hidden"
                  onClick={() =>
                    setAccordionValue
                      ? index.toString() === accordionValue
                        ? setAccordionValue('99')
                        : setAccordionValue(index.toString())
                      : null
                  }
                >
                  <Text className="text-xl font-semibold text-derma-primary500">
                    {subscription.price.value}
                  </Text>
                  <SvgAngleDown
                    className={`transition-transform bg-derma-secondary300 p-1 h-8 w-8 rounded-full ${
                      index.toString() === accordionValue ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <AccordionContent>
                  <Text className="text-xs text-derma-primary500 md:hidden">
                    {subscription.price.subtitle}
                  </Text>
                  <Image
                    src={subscription.imgSrc}
                    alt={subscription.title}
                    height={200}
                    width={200}
                    className="mx-auto mt-8 md:mb-4 md:mt-12"
                    priority
                  />
                  <Text className="text-lg font-semibold hidden md:block">
                    {subscription.title}
                  </Text>
                  <Text className="text-xl font-semibold text-derma-primary500 hidden md:block">
                    {subscription.price.value}
                  </Text>
                  <Text className="text-xs text-derma-primary500 hidden md:block">
                    {subscription.price.subtitle}
                  </Text>
                  <ul className="border-t md:border-derma-secondary500 mt-6 pt-6 flex flex-col gap-4">
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
                        <Text className="text-sm">{bullet.text}</Text>
                      </li>
                    ))}
                  </ul>
                  {isMultistep && !isMobile && (
                    <OptionsPricesSelectButton index={index} />
                  )}

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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </CheckHydration>
      ))}
    </ul>
  );
}
