import { ReactNode } from 'react';

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
  children,
}: {
  isVisible: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={`text-hg-black transition-all fixed top-0 right-0 bottom-0 w-3/4 bg-white z-20 shadow-centered overflow-y-auto ${
        isVisible ? 'translate-x-[0%]' : 'translate-x-[105%]'
      }`}
    >
      {children}
    </div>
  );
};
