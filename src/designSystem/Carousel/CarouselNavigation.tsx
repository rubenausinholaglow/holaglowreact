import { ReactNode } from 'react';
import { Flex } from 'designSystem/Layouts/Layouts';
import { twMerge } from 'tailwind-merge';

export const CarouselNavigation = ({
  type,
  className,
  children,
}: {
  type: 'back' | 'next';
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      layout="col-center"
      className={twMerge(
        `justify-center absolute -bottom-14 ${
          type === 'back' ? 'left-4' : 'right-4'
        } ${className}`
      )}
    >
      {children}
    </Flex>
  );
};
