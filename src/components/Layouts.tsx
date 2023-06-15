import { ReactNode } from 'react';

export const Flex = ({
  layout = 'left-row',
  className = '',
  children,
}: {
  layout: 'left-row' | 'center-row' | 'right-row' | 'left-col' | 'center-col' | 'right-col';
  className?: string;
  children: ReactNode;
}) => {
  const direction = layout.split('-')[1];
  const justify =
    layout.split('-')[0] === 'left'
      ? 'justify-start'
      : layout.split('-')[0] === 'center'
      ? 'justify-center'
      : 'justify-end';

  const styles = `flex flex-${direction} ${justify} ${className}`;

  return <div className={styles}>{children}</div>;
};
