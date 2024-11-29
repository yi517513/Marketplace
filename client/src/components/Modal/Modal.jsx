import React, { useEffect, useState } from "react";
import useModalSelect from "../../hooks/modal/useModalSelect";

const Modal = ({ isOpen, onClose, modalType, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const ModalContent = useModalSelect(modalType);

  // 關閉前透過setTimeout延遲onClose，達到卸載modal時的特效
  const handleCloseModal = () => {
    if (!onClose) return;
    setTimeout(() => onClose(), 780);
    setIsVisible(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${isVisible ? `animate-fade-in` : `animate-fade-out`} 
      flex fixed inset-0 bg-black bg-opacity-30 items-center justify-center z-10`}
      onClick={handleCloseModal}
    >
      <div
        className="flex flex-col justify-center items-center 
        bg-white p-1 m-1 w-4/5 h-[80vh] rounded-2xl shadow-lg
        
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-3  w-full h-[8%] m-2">
          <h2 className="col-start-2 w-full text-dark-gray text-center text-2xl">
            {modalType === null ? "選擇功能" : modalType}
          </h2>
          <div className="col-start-3 flex justify-end w-full  pr-4">
            {children}
          </div>
        </div>

        <div className="flex justify-center w-full h-[92%] border-box overflow-y-auto">
          {isOpen && <ModalContent />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
