import { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { SvgAdd } from 'app/icons/IconsDs';
import { Text } from 'designSystem/Texts/Texts';
import { twMerge } from 'tailwind-merge';

export function SimpleAccordion({
  trigger,
  triggerHasHtml = false,
  triggerStyles,
  iconSize = 24,
  iconStyles,
  className,
  children,
  isOpen = false,
}: {
  trigger: string;
  triggerHasHtml?: boolean;
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
              `group flex gap-2 items-center justify-between w-full ${triggerStyles}`
            )}
          >
            {triggerHasHtml ? (
              <p dangerouslySetInnerHTML={{ __html: trigger }}></p>
            ) : (
              trigger
            )}
            <SvgAdd
              height={iconSize}
              width={iconSize}
              className={`transition-transform origin-center group-radix-state-open:rotate-45 group-radix-state-open:duration-200 shrink-0 ${iconStyles}`}
            />
          </AccordionPrimitive.Trigger>
        ) : (
          <Text className={triggerStyles}>{trigger}</Text>
        )}
        <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

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
