import { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { twMerge } from 'tailwind-merge';

export function Accordion({
  type = 'single',
  className = '',
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  children,
  ...rest
}: {
  type?: 'single' | 'multiple';
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  children: ReactNode;
}) {
  return (
    <AccordionPrimitive.Root
      onValueChange={onValueChange}
      type={type as 'single'}
      className={twMerge(`w-full ${className}`)}
      collapsible={collapsible}
      {...(value && { value })}
      {...(defaultValue && { defaultValue })}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

export function AccordionItem({
  className = '',
  children,
  value = 'value',
}: {
  className?: string;
  children: ReactNode;
  value?: string;
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
