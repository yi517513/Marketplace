import React, { useState, useCallback } from "react";
import { ROUTES } from "../../utils/paths";
import { useLocation } from "react-router-dom";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import RoleSwitch from "../UI/StatusSwitch";

const UserCenter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // true為`Login` false為`Register`
  const [customPath, setCustomPath] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(!isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const location = useLocation();
  const path = location.pathname;

  const toggleMenu = useCallback((menu) => {
    setIsMenuOpen((prevMenu) => (prevMenu === menu ? null : menu));
  }, []);

  const renderMenuItem = useCallback(
    (activePath, label) => (
      <ListItem
        label={label}
        className={`mt-2 p-2 w-full text-center hover:bg-gray-400 hover:text-gray-50 hover:rounded-2xl active:bg-gray-500 ${
          path === activePath ? "bg-gray-400 text-gray-50 rounded-2xl" : ""
        }`}
        to={activePath}
      />
    ),
    [path]
  );

  const isActiveBuyerMenu = isMenuOpen === "buyer";
  const isActiveSellerMenu = isMenuOpen === "seller";
  const isActiveProfileMenu = isMenuOpen === "profile";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <Button
          label="我是買家"
          onClick={() => toggleMenu("buyer")}
          className="mt-1 py-3"
        />
        {isActiveBuyerMenu && (
          <ul className="flex flex-col items-center justify-center mb-2 w-full">
            {renderMenuItem("#", "購物車")}
            {renderMenuItem(ROUTES.ORDERS, "訂單管理")}
          </ul>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button
          label="我是賣家"
          onClick={() => toggleMenu("seller")}
          className="mt-1 py-3"
        />
        {isActiveSellerMenu && (
          <ul className="flex flex-col items-center justify-center mb-2 w-full">
            {renderMenuItem(ROUTES.CREATE, "刊登出售")}
            {renderMenuItem(ROUTES.PRODUCTS, "賣場管理")}
            {renderMenuItem(ROUTES.SHIPMENT, "等待發貨")}
          </ul>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button
          label="會員資料"
          onClick={() => toggleMenu("profile")}
          className="mt-1 py-3"
        />
        {isActiveProfileMenu && (
          <ul className="flex flex-col items-center justify-center mb-2 w-full">
            {renderMenuItem(ROUTES.PROFILE, "修改資料")}
            {renderMenuItem(ROUTES.PURCHASED, "購買紀錄")}
            {renderMenuItem(ROUTES.SOLD, "出售紀錄")}
          </ul>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customPath={customPath ? `Login` : `Register`}
        toggleRole={
          <RoleSwitch
            labelA="登入"
            labelB="註冊"
            role={customPath}
            setRole={setCustomPath}
          />
        }
      />
    </div>
  );
};

export default UserCenter;
