import React, { useState, useCallback } from "react";
import { PATHS } from "../../utils/paths";
import { useLocation } from "react-router-dom";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";

const UserCenterNav = ({ isAuthenticated }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = useCallback((menu) => {
    setIsOpenMenu((prevMenu) => (prevMenu === menu ? null : menu));
  }, []);

  const renderMenuItem = useCallback(
    (activePath, label) => (
      <ListItem
        label={label}
        className={`${currentPath === activePath ? "activeOption" : ""}`}
        to={activePath}
      />
    ),
    [currentPath]
  );

  const isActiveBuyerMenu = isOpenMenu === "buyer";
  const isActiveSellerMenu = isOpenMenu === "seller";
  const isActiveProfileMenu = isOpenMenu === "profile";

  return (
    <div className="userCenterNav-container">
      <div className="userCenterNav-dropdown">
        <Button label="我是買家" onClick={() => toggleMenu("buyer")} />
        {isActiveBuyerMenu && (
          <ul className="userCenterNav-dropdown__menu">
            {renderMenuItem("#", "購物車")}
            {renderMenuItem(PATHS.ORDERS, "訂單管理")}
          </ul>
        )}
      </div>
      <div className="userCenterNav-dropdown">
        <Button label="我是賣家" onClick={() => toggleMenu("seller")} />
        {isActiveSellerMenu && (
          <ul className="userCenterNav-dropdown__menu">
            {renderMenuItem(PATHS.CREATE, "刊登出售")}
            {renderMenuItem(PATHS.PRODUCTS, "賣場管理")}
            {renderMenuItem(PATHS.PENDING_SHIPMENT, "等待發貨")}
          </ul>
        )}
      </div>
      <div className="userCenterNav-dropdown">
        <Button label="會員資料" onClick={() => toggleMenu("profile")} />
        {isActiveProfileMenu && (
          <ul className="userCenterNav-dropdown__menu">
            {renderMenuItem(PATHS.PROFILE, "修改資料")}
            {renderMenuItem("#", "登入紀錄")}
            {renderMenuItem(PATHS.HISTORY, "交易紀錄")}
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
