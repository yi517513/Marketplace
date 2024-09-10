import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import useNavigation from "../../hooks/useNavigation";
import { useLocation } from "react-router-dom";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";

const UserCenterNav = ({ isAuthenticated }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("UserCenterNav rendered");

  const { navigateTo } = useNavigation();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setIsModalOpen(true);
  //   }
  //   setActiveMenu("buyer");
  // }, [isAuthenticated]);

  // const closeModal = useCallback(() => {
  //   setIsModalOpen(false);
  //   navigateTo(PATHS.LOGIN);
  // }, [navigateTo]);

  const toggleMenu = useCallback((menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  }, []);

  const renderMenuItem = useCallback(
    (activePath, label) => (
      <ListItem
        label={label}
        className={`${currentPath === activePath ? "active" : ""}`}
        to={activePath}
      />
    ),
    [currentPath, navigateTo]
  );

  const isActiveBuyerMenu = activeMenu === "buyer";
  const isActiveSellerMenu = activeMenu === "seller";
  const isActiveProfileMenu = activeMenu === "profile";

  return (
    <div className="leftMenu">
      <div className="dropdown">
        <Button label="我是買家" onClick={() => toggleMenu("buyer")} />
        {/* <button className="dropdown-button" onClick={() => toggleMenu("buyer")}>
          我是買家
        </button> */}
        {isActiveBuyerMenu && (
          <ul className="dropdown-menu">
            {renderMenuItem("#", "購物車")}
            {renderMenuItem(PATHS.ORDERS, "訂單管理")}
            {renderMenuItem(PATHS.PURCHASE_HISTORY, "交易完成")}
          </ul>
        )}
      </div>
      <div className="dropdown">
        <Button label="我是賣家" onClick={() => toggleMenu("seller")} />
        {/* <button
          className="dropdown-button"
          onClick={() => toggleMenu("seller")}
        >
          我是賣家
        </button> */}
        {isActiveSellerMenu && (
          <ul className="dropdown-menu">
            {renderMenuItem(PATHS.CREATE, "刊登出售")}
            {renderMenuItem(PATHS.PRODUCTS, "賣場管理")}
            {renderMenuItem(PATHS.PENDING_SHIPMENT, "等待發貨")}
            {renderMenuItem(PATHS.SALES_HISTORY, "交易完成")}
          </ul>
        )}
      </div>
      <div className="dropdown">
        <Button label="會員資料" onClick={() => toggleMenu("profile")} />
        {/* <button
          className="dropdown-button"
          onClick={() => toggleMenu("profile")}
        >
          會員資料
        </button> */}
        {isActiveProfileMenu && (
          <ul className="dropdown-menu">
            {renderMenuItem(PATHS.PROFILE, "修改資料")}
            {renderMenuItem("#", "登入紀錄")}
            {renderMenuItem("#", "OTP安全鎖")}
          </ul>
        )}
      </div>

      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="請登入會員"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>請登入會員</h2>
        <button onClick={closeModal}>確定</button>
      </Modal> */}
    </div>
  );
};

export default UserCenterNav;
