import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white z-20 p-8 rounded-2xl shadow-md">
            {children}
          </div>
          <span
            className="fixed top-0 left-0 w-full h-full"
            onClick={onClose}
            data-testid="modal-overlay"
          />
        </div>
      )}
    </>
  );
};

export default Modal;
