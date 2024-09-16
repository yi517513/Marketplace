import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import useModalConfig from "../hooks/Config/useModalConfig";
import { useSelector } from "react-redux";

const ModalContainer = ({ path = `ImageManager`, setParentData }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const Children = useModalConfig(selectedOption || path, setParentData);

  const selectOptionsConfig = [
    { value: null, label: "選擇功能" },
    { value: `ImageManager`, label: "圖片管理" },
    { value: `Login`, label: "登入" },
    { value: `Register`, label: "註冊" },
    { value: `Orders-buyer`, label: "買家訂單" },
    { value: `Products-seller`, label: "商品管理" },
    { value: `Shipment-seller`, label: "等待發貨" },
    { value: `History-buyer`, label: "購買紀錄" },
    { value: `History-seller`, label: "販賣紀錄" },
  ];

  return (
    <Modal
      isAuthenticated={isAuthenticated}
      options={selectOptionsConfig}
      path={selectedOption || path}
      Children={Children}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setModalType={setSelectedOption}
    />
  );
};

export default ModalContainer;
