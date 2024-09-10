import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import useNavigation from "../../hooks/useNavigation";
import Dashboard from "./Management";
import { useLocation } from "react-router-dom";

const UserCenter = React.memo(() => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const { navigateTo } = useNavigation();
  console.log(PATHS);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
    setActiveMenu("buyer");
  }, [isAuthenticated]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    navigateTo(PATHS.LOGIN);
  }, [navigateTo]);

  const toggleMenu = useCallback((menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  }, []);

  const renderMenuItem = useCallback(
    (activePath, label) => (
      <li
        className={`${path === activePath ? "active-menu" : ""}`}
        onClick={() => navigateTo(activePath)}
      >
        <Link to="#">{label}</Link>
      </li>
    ),
    [navigateTo, path]
  );

  return (
    <div className="userCenter-area">
      <div className="leftMenu">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => toggleMenu("buyer")}
          >
            我是買家
          </button>
          {activeMenu === "buyer" && (
            <ul className="dropdown-menu">
              {renderMenuItem("#", "購物車")}
              {renderMenuItem(PATHS.ORDERS, "訂單管理")}
              {renderMenuItem(PATHS.PURCHASE_HISTORY, "交易完成")}
            </ul>
          )}
        </div>
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => toggleMenu("seller")}
          >
            我是賣家
          </button>
          {activeMenu === "seller" && (
            <ul className="dropdown-menu">
              {renderMenuItem(PATHS.CREATE, "刊登出售")}
              {renderMenuItem(PATHS.PRODUCTS, "賣場管理")}
              {renderMenuItem(PATHS.PENDING_SHIPMENT, "等待發貨")}
              {renderMenuItem(PATHS.SALES_HISTORY, "交易完成")}
            </ul>
          )}
        </div>
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => toggleMenu("profile")}
          >
            會員資料
          </button>
          {activeMenu === "profile" && (
            <ul className="dropdown-menu">
              {renderMenuItem(PATHS.PROFILE, "修改資料")}
              {renderMenuItem("#", "登入紀錄")}
              {renderMenuItem("#", "OTP安全鎖")}
            </ul>
          )}
        </div>
      </div>
      <div className="component">
        <Dashboard />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="請登入會員"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>請登入會員</h2>
        <button onClick={closeModal}>確定</button>
      </Modal>
    </div>
  );
});

export default UserCenter;
