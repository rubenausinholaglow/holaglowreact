import { ReactNode } from 'react';

export const Flex = ({
  layout = 'row-left',
  className = '',
  children,
}: {
  layout: 'row-left' | 'row-center' | 'row-right' | 'col-left' | 'col-center' | 'col-right';
  className?: string;
  children: ReactNode;
}) => {
  const direction = layout.split('-')[0];
  const justify =
    layout.split('-')[1] === 'left'
      ? 'justify-start'
      : layout.split('-')[1] === 'center'
      ? 'justify-center'
      : 'justify-end';

  const alignItems = direction === 'row' ? 'items-center' : 'items-left';

  const styles = `flex flex-${direction} ${justify} ${alignItems} ${className}`;

  return <div className={styles}>{children}</div>;
};
