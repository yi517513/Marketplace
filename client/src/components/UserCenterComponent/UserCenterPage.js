import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import UserProfile from "./UserProfile";
import LoginLog from "./LoginLog";
import OTPApp from "./OTPApp";
import PublishForm from "./PublishForm";
import ImageModal from "./ImageModal";

const UserCenterPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated, loading]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "UserData":
        return <UserProfile />;
      case "LoginLog":
        return <LoginLog />;
      case "OTPApp":
        return <OTPApp />;
      case "OTPApp":
        return <OTPApp />;
      case "PublishForm":
        return <PublishForm />;
      default:
        return null;
    }
  };

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
              <li>
                <a href="#option1">訂單管理</a>
              </li>
              <li>
                <a href="#option2">購物車</a>
              </li>
              <li>
                <a href="#option3">交易完成</a>
              </li>
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
              <li onClick={() => setActiveComponent("PublishForm")}>
                <a>刊登出售</a>
              </li>
              <li>
                <a href="#option2">賣場管理</a>
              </li>
              <li>
                <a href="#option3">交易完成</a>
              </li>
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
              <li onClick={() => setActiveComponent("UserData")}>
                <a href="#option1">修改資料</a>
              </li>
              <li onClick={() => setActiveComponent("LoginLog")}>
                <a href="#option2">登入紀錄</a>
              </li>
              <li onClick={() => setActiveComponent("OTPApp")}>
                <a href="#option3">OTP安全鎖</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="component">{renderActiveComponent()}</div>
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
};

export default UserCenterPage;
