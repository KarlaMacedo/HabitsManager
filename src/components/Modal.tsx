// Modal.tsx
import React from "react";

interface ModalProps {//estructura de la modal
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;//si no esta abierta no se renderiza

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-10 w-full xs:w-11/12 sm:w-10/12 md:w-10/12 lg:w-9/12 xl:w-8/12 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
        {children}
      </div>
    </div>
  );
};
