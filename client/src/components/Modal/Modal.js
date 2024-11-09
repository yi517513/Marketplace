import React from "react";
import useModalSelect from "../../hooks/modal/useModalSelect";

const Modal = ({
  isOpen,
  onClose,
  customPath,
  SelectField,
  authTools,
  toggleRole,
}) => {
  console.log(`using Modal`);
  const Children = useModalSelect(customPath);
  if (!isOpen) return null;

  return (
    <div
      className="  flex fixed inset-0 bg-black bg-opacity-30 items-center justify-center z-10"
      onClick={onClose}
    >
      <div
        className="flex flex-col justify-center items-center 
        bg-white p-1 m-1 w-4/5 h-4/5 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-[6%] ">
          <h2 className="w-full text-dark-gray text-center  text-3xl">
            {customPath === null ? "選擇功能" : customPath}
          </h2>
        </div>
        <div className="tool flex justify-end w-full  h-[3%] ">
          {SelectField}
          {authTools}
          {toggleRole}
        </div>

        <div className="flex w-full  h-[90%]">{isOpen && <Children />}</div>
      </div>
    </div>
  );
};

export default Modal;
