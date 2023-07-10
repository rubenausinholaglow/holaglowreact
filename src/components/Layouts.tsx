import { ReactNode } from 'react';

export const Flex = ({
  layout = 'row-left',
  className = '',
  children,
}: {
  layout:
    | 'row-left'
    | 'row-center'
    | 'row-right'
    | 'col-left'
    | 'col-center'
    | 'col-right';
  className?: string;
  children: ReactNode;
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

  const styles = `flex flex-${direction} ${justify} ${className}`;

  return <div className={styles}>{children}</div>;
};
