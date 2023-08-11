import { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { SvgAdd } from 'icons/IconsDs';
import { twMerge } from 'tailwind-merge';

export default function Accordion({
  trigger,
  triggerStyles,
  iconSize = 14,
  className,
  children,
}: {
  trigger: string;
  triggerStyles?: string;
  iconSize?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue="item-1"
      className={twMerge(`w-full ${className}`)}
      collapsible
    >
      <AccordionPrimitive.Item value="item" className="w-full">
        <AccordionPrimitive.Header className="w-full">
          <AccordionPrimitive.Trigger
            className={twMerge(
              `group flex items-center justify-between w-full ${triggerStyles}`
            )}
          >
            {trigger}
            <SvgAdd
              height={iconSize}
              width={iconSize}
              className="transition-transform origin-center rotate-45 group-radix-state-open:rotate-90 group-radix-state-open:duration-200 mr-1"
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
