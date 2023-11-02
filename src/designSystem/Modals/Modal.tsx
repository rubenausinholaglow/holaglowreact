'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useGlobalStore } from 'app/stores/globalStore';
import { Container } from 'designSystem/Layouts/Layouts';
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
  type = 'right',
  hideModalBackground = false,
  children,
  ...rest
}: {
  isVisible: boolean;
  setIsVisible?: (value: boolean) => void;
  width?: string;
  height?: string;
  className?: string;
  type?: 'right' | 'bottom' | 'center';
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

  let animationStyles = `
    ${type === 'right' ? 'translate-x-[105%]' : ' '}
    ${type === 'bottom' ? 'translate-y-[105%]' : ' '}
    ${type === 'center' ? 'translate-y-[200%]' : ' '}
  `;

  if (isVisible && isModalOpen) {
    animationStyles = `
      ${type === 'right' ? 'translate-x-[0%]' : ''}
      ${type === 'bottom' ? 'translate-y-[0%]' : ''}
      ${type === 'center' ? 'translate-y-[0%]' : ''}
    `;
  }

  if (type === 'center') {
    return (
      <div
        className={`transition-all fixed inset-0 z-50 ${animationStyles}`}
        onClick={() => setIsModalOpen(false)}
      >
        <Container className="h-full relative">
          <div
            className={twMerge(
              `transition-all mx-auto bg-white rounded-2xl relative top-1/2 -translate-y-1/2
              ${width ? width : 'w-full'}
              ${height ? height : 'h-full'}
              ${className ? className : ''}`
            )}
            {...rest}
          >
            {children}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        `text-hg-black transition-all fixed right-0 bottom-0 bg-white z-50 shadow-centered-black overflow-y-auto
          ${type === 'right' ? 'top-0' : ''}
          ${type === 'bottom' ? '' : ''}
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
