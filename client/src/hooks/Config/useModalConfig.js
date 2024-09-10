import React from "react";
import UploadModal from "../../components/Modal/ImageManager";

const useModalConfig = (modalType) => {
  const ModalComponentMap = {
    [`UploadImage`]: UploadModal,
  };

  const ModalComponent = ModalComponentMap[modalType];

  return { ModalComponent };
};

export default useModalConfig;
