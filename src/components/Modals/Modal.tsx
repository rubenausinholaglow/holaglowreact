import { ReactNode } from 'react';

import { ModalBackground } from './ModalBackground';

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
