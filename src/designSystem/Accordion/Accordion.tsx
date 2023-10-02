import { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { SvgAdd } from 'icons/IconsDs';
import { twMerge } from 'tailwind-merge';

export function SimpleAccordion({
  trigger,
  triggerStyles,
  iconSize = 24,
  iconStyles,
  className,
  children,
  isOpen = false,
}: {
  trigger: string;
  triggerStyles?: string;
  iconSize?: number;
  iconStyles?: string;
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      className={twMerge(`w-full ${className}`)}
      collapsible
      defaultValue={isOpen ? 'item' : ''}
    >
      <AccordionPrimitive.Item value="item" className="w-full">
        {!isOpen ? (
          <AccordionPrimitive.Trigger
            className={twMerge(
              `group flex items-center justify-between w-full ${triggerStyles}`
            )}
          >
            {trigger}
            <SvgAdd
              height={iconSize}
              width={iconSize}
              className={`transition-transform origin-center group-radix-state-open:rotate-45 group-radix-state-open:duration-200 shrink-0 ${iconStyles}`}
            />
          </AccordionPrimitive.Trigger>
        ) : (
          <>{trigger}</>
        )}
        <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export function Accordion({
  className = '',
  isOpen = false,
  children,
}: {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      className={twMerge(`w-full ${className}`)}
      collapsible
      defaultValue={isOpen ? 'item' : ''}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

export function AccordionItem({
  className = '',
  children,
  value,
}: {
  className?: string;
  children: ReactNode;
  value: string;
}) {
  return (
    <AccordionPrimitive.Item
      className={`w-full group ${className}`}
      value={value}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

export function AccordionTrigger({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <AccordionPrimitive.Trigger className={`w-full group ${className}`}>
      {children}
    </AccordionPrimitive.Trigger>
  );
}

export function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <AccordionPrimitive.Content
      className={twMerge(
        `overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp ${
          className ? className : ''
        }`
      )}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}
