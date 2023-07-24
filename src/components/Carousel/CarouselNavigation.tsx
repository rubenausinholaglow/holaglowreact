import { ReactNode } from 'react';
import { Flex } from 'components/Layouts/Layouts';
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
        `justify-center absolute top-1/2 -translate-y-[50%] bg-hg-lime text-hg-darkMalva rounded-full p-1 ${
          type === 'back' ? 'left' : 'right'
        }-4 ${className}`
      )}
    >
      {children}
    </Flex>
  );
};
