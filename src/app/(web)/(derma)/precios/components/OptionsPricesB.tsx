'use client';

import { isMobile } from 'react-device-detect';
import { Accordion } from '@radix-ui/react-accordion';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgAngleDown, SvgCircle } from 'app/icons/Icons';
import {
  SvgCheckSquare,
  SvgCheckSquareActive,
  SvgRadioChecked,
} from 'app/icons/IconsDs';
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
}: {
  isMultistep: boolean;
  selectedOption?: string;
  setSelectedOption?: (value: string) => void;
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
              className={`relative flex-grow md:w-1/2 rounded-2xl ${
                subscription.bgColor
              } ${index === 0 ? 'border border-derma-primary500/60' : ''}`}
              key={subscription.title}
            >
              <div className="px-4 pt-4 md:px-6 md:pt-6">
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
                    <SvgRadioChecked className="h-5 w-5 shrink-0 md:hidden" />
                  ) : (
                    <SvgCircle className="h-5 w-5 shrink-0 md:hidden" />
                  )}

                  <Text className="font-semibold md:text-2xl">
                    {subscription.title}
                  </Text>
                </Flex>
                <Text className="text-sm md:text-md mb-4">
                  {subscription.subtitle}
                </Text>
              </div>
              <AccordionItem
                value={isMobile ? index.toString() : 'isOpen'}
                className="h-full"
              >
                <AccordionTrigger
                  className={!isMobile ? 'pointer-events-none' : ''}
                >
                  <div
                    className="flex flex-col p-4 md:p-6 pt-0"
                    id="tmevent_derma_plans_expand_button"
                  >
                    <div className="flex justify-left items-center gap-2">
                      <Text className="text-xl font-semibold text-derma-primary500 md:text-3xl">
                        {subscription.price.value}
                      </Text>

                      <Text className="text-xs md:text-md text-derma-primary500 ">
                        {subscription.price.subtitle}
                      </Text>
                      <Flex className="ml-auto gap-2">
                        {subscription.price?.discount && (
                          <span className="bg-derma-primary500 text-md py-1 px-2 rounded-full text-white inline-block font-semibold">
                            {subscription.price.discount}
                          </span>
                        )}
                        <SvgAngleDown className="transition-transform bg-derma-secondary300 p-1 h-8 w-8 rounded-full group-data-[state=open]:rotate-180 md:hidden" />
                      </Flex>
                    </div>
                    {subscription.price?.oldValue && (
                      <Text className="text-sm text-hg-error line-through font-medium">
                        {subscription.price.oldValue}
                      </Text>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 md:p-6">
                    <Image
                      src={subscription.imgSrc}
                      alt={subscription.title}
                      height={538}
                      width={706}
                      className="w-3/4 mx-auto md:mb-4"
                      priority
                    />

                    <ul className=" md:mt-6 pt-6 flex flex-col gap-4 md:min-h-[200px]">
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
                              name={bullet.isEnabled ? bullet.icon : 'SvgCross'}
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
