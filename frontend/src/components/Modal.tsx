import React, { type ReactNode } from "react";
import { ImCross } from "react-icons/im";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<modalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 shadow-xl">
        <div className="bg-white flex flex-col rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div>
            <div className="flex justify-end" onClick={onClose}>
                <ImCross className="text-gray-500 text-xs cursor-pointer" />
            </div>
            <div>
                {children}
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
