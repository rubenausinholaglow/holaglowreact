import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const Container = ({
  isHeader = false,
  className,
  children,
}: {
  isHeader?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        `w-full px-4 mx-auto ${isHeader ? 'max-w-full' : 'max-w-xl'} ${
          className ? className : ''
        } `
      )}
    >
      {children}
    </div>
  );
};

export const Flex = ({
  layout = 'row-left',
  className = '',
  children,
  onClick = undefined,
  ...rest
}: {
  layout?:
    | 'row-left'
    | 'row-center'
    | 'row-right'
    | 'row-between'
    | 'col-left'
    | 'col-center'
    | 'col-right';
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const direction = layout.split('-')[0];

  const FLEXCONFIG = [
    {
      layout: 'row-left',
      classes: 'justify-start items-center',
    },
    {
      layout: 'row-center',
      classes: 'justify-center items-center',
    },
    {
      layout: 'row-right',
      classes: 'justify-end items-center',
    },
    {
      layout: 'row-between',
      classes: 'justify-between items-center',
    },
    {
      layout: 'col-left',
      classes: 'items-start',
    },
    {
      layout: 'col-center',
      classes: 'items-center text-center',
    },
    {
      layout: 'col-right',
      classes: 'items-end',
    },
  ];

  const justify = FLEXCONFIG.filter(
    flexLayout => flexLayout.layout === layout
  )[0]?.classes;

  return (
    <div
      className={twMerge(`flex flex-${direction} ${justify} ${className}`)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};
