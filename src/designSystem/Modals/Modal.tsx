'use client';

import { ReactNode, useEffect } from 'react';
import { useGlobalStore } from 'app/stores/globalStore';
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
      } transition-all fixed top-0 right-0 bottom-0 w-full bg-hg-black/50 z-40 `}
      onClick={onClick}
    ></div>
  );
};

export const Modal = ({
  isVisible,
  setIsVisible,
  width,
  height,
  className,
  from = 'right',
  hideModalBackground = false,
  children,
  ...rest
}: {
  isVisible: boolean;
  setIsVisible?: (value: boolean) => void;
  width?: string;
  height?: string;
  className?: string;
  from?: 'right' | 'bottom';
  children: ReactNode;
  [key: string]: any;
}) => {
  const { isModalOpen, setIsModalOpen, setShowModalBackground } =
    useGlobalStore(state => state);

  useEffect(() => {
    if (!hideModalBackground) {
      setShowModalBackground(isVisible);
    }

    setIsModalOpen(isVisible);
  }, [isVisible]);

  const animationStyles =
    isVisible && isModalOpen
      ? from === 'right'
        ? 'translate-x-[0%]'
        : from === 'bottom'
        ? 'translate-y-[0%]'
        : ''
      : `${from === 'right' ? 'translate-x-[105%]' : 'translate-y-[105%]'}`;

  return (
    <div
      className={twMerge(
        `text-hg-black transition-all fixed right-0 bottom-0 bg-white z-50 shadow-centered overflow-y-auto
          ${from === 'right' ? 'top-0' : ''}
          ${width ? width : 'w-full'}
          ${height ? height : 'h-full'}
          ${animationStyles}
          ${className ? className : ''}`
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
