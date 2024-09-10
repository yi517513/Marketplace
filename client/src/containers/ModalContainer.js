import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import useModalConfig from "../hooks/Config/useModalConfig";
import ImageManager from "../components/Modal/ImageManager";

// 如果modalType為ImageManager，則props需要有父組件的圖片狀態。
// 在handleOnSelect與handleImageUpload中需要更新父組件的圖片狀態
const ModalContainer = ({ modalType = `ImageManager` }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { handlers } = useModalConfig(modalType);

  // Children由useModalConfig來決定
  const Children = ImageManager;

  // handlers由useModalConfig來決定
  // handlers為Children使用到的操作
  // 以ImageManager為例，handlers包含了 圖片的上傳、刪除、選擇等操作

  return (
    <Modal
      title={modalType}
      Children={Children}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      {...handlers}
    />
  );
};

export default ModalContainer;
