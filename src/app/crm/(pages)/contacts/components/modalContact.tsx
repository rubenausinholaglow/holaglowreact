import React from 'react';
import { SvgClose } from 'app/icons/Icons';

interface ModalContactProps {
  isOpen: boolean;
  closeModal: (modal: boolean) => void;
  children: React.ReactNode;
}

const ModalContact: React.FC<ModalContactProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-4 rounded-md z-10">
        <button
          className="flex justify-right align-right text-black"
          onClick={() => closeModal(!isOpen)}
        >
          <SvgClose className="mb-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalContact;
