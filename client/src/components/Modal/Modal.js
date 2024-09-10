import React from "react";

const Modal = ({ title, Children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-content">
          <Children isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
