'use client';

import { isMobile } from 'react-device-detect';
import { Accordion } from '@radix-ui/react-accordion';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgAngleDown } from 'app/icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
    <CheckHydration>
      <Accordion
        type="single"
        collapsible
        defaultValue={isMobile ? '99' : 'isOpen'}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          {SUBSCRIPTIONS.map((subscription, index) => (
            <li
              className={`relative flex-grow md:w-1/2 rounded-2xl ${subscription.bgColor}`}
              key={subscription.title}
            >
              <div className="p-4 pb-0 md:p-0">
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
                </Flex>
                <Text className="text-sm mb-4 md:hidden">
                  {subscription.subtitle}
                </Text>
              </div>
              <AccordionItem
                value={isMobile ? index.toString() : 'isOpen'}
                className="h-full"
              >
                <AccordionTrigger
                  className={!isMobile ? 'pointer-events-none hidden' : ''}
                >
                  <div className="flex flex-col p-4 pt-0 md:hidden">
                    <div className="flex justify-left items-center gap-2">
                      <Text className="text-xl font-semibold text-derma-primary500">
                        {subscription.price.value}
                      </Text>
                      {subscription.price?.oldValue && (
                        <Text className="text-sm text-hg-error line-through">
                          {subscription.price.oldValue}
                        </Text>
                      )}
                      <Flex className="ml-auto gap-2">
                        {subscription.price?.discount && (
                          <span className="bg-derma-primary500 text-md py-1 px-2 rounded-full text-white inline-block font-semibold">
                            {subscription.price.discount}
                          </span>
                        )}
                        <SvgAngleDown
                          className={`transition-transform bg-derma-secondary300 p-1 h-8 w-8 rounded-full group-data-[state=open]:rotate-180`}
                        />
                      </Flex>
                    </div>
                    <Text className="text-xs text-derma-primary500 md:hidden">
                      {subscription.price.subtitle}
                    </Text>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 md:p-6">
                    <Image
                      src={subscription.imgSrc}
                      alt={subscription.title}
                      height={125}
                      width={125}
                      className="mx-auto md:mb-4"
                      priority
                    />
                    <div className="md:min-h-[112px]">
                      <div className="hidden md:block">
                        <Text className="text-lg font-semibold hidden md:block">
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
                          <Text className="text-sm text-hg-error line-through mt-1">
                            {subscription.price.oldValue}
                          </Text>
                        )}
                      </div>
                      <Text className="text-sm text-derma-primary500 hidden md:block">
                        {subscription.price.subtitle}
                      </Text>
                    </div>
                    <ul className="md:border-t md:border-derma-secondary500 md:mt-6 pt-6 flex flex-col gap-4 md:min-h-[200px]">
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
                  </div>

                  {subscription.bottomBar && (
                    <div
                      className="bg-derma-primary300 p-4 py-3 rounded-b-2xl text-center text-sm mt-2"
                      dangerouslySetInnerHTML={{
                        __html: subscription.bottomBar,
                      }}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            </li>
          ))}
        </ul>
      </Accordion>
    </CheckHydration>
  );
}
