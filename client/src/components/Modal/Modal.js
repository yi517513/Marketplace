import React from "react";
import SelectField from "../UI/SelectField";
import ListItem from "../UI/ListItem";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import LogoutContainer from "../../containers/LogoutContainer";

const Modal = ({
  isAuthenticated,
  options,
  path,
  Children,
  isOpen,
  onClose,
  setModalType,
}) => {
  if (!isOpen) return null;

  const handleSelectChange = (value) => {
    if (setModalType) {
      setModalType(value);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2>{path}</h2>
        </div>
        <div className="modal-tools">
          <SelectField options={options} onChange={handleSelectChange} />
          <ListItem
            label="登入"
            icon={faCircle}
            iconColor={isAuthenticated ? "#00ff00" : "#ff0000"}
          />
          <LogoutContainer className="modal-button" isModalType={true} />
        </div>

        <div className="modal-content">{isOpen && <Children />}</div>
      </div>
    </div>
  );
};

export default Modal;
