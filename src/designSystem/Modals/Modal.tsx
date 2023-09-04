import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const ModalBackground = ({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`${
        isVisible
          ? 'opacity-1 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-all fixed top-0 right-0 bottom-0 w-full bg-hg-black/50 z-20 `}
      onClick={onClick}
    ></div>
  );
};

export const Modal = ({
  isVisible,
  width,
  className,
  children,
  ...rest
}: {
  isVisible: boolean;
  width: string;
  className?: string;
  children: ReactNode;
  [key: string]: any;
}) => {
  return (
    <div
      className={twMerge(
        `text-hg-black transition-all fixed top-0 right-0 bottom-0 bg-white z-20 shadow-centered overflow-y-auto
          ${width ? width : 'w-full'}
          ${isVisible ? 'translate-x-[0%]' : 'translate-x-[105%]'}
          ${className ? className : ''}`
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
