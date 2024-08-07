import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import UserProfile from "./Profile/UserProfile";
import LoginLog from "./Profile/LoginLog";
import OTPApp from "./Profile/OTPApp";
import PublishForm from "./Seller/PublishForm";
import { Link } from "react-router-dom";
import ProductManage from "./Seller/ProductManage";

const UserCenterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    // 根據 URL 更新 activeComponent 和 activeMenu
    const path = location.pathname;
    if (path.includes("userProfile")) {
      setActiveComponent("UserData");
      setActiveMenu("profile");
    } else if (path.includes("LoginLog")) {
      setActiveComponent("LoginLog");
      setActiveMenu("profile");
    } else if (path.includes("OTPApp")) {
      setActiveComponent("OTPApp");
      setActiveMenu("profile");
    } else if (path.includes("publishForm")) {
      setActiveComponent("PublishForm");
      setActiveMenu("seller");
    } else if (path.includes("productManage")) {
      setActiveComponent("ProductManage");
      setActiveMenu("seller");
    }
  }, [location.pathname]);

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
      case "ProductManage":
        return <ProductManage />;
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
              <li>
                <Link to="/userCenter/publishForm">刊登出售</Link>
              </li>
              <li>
                <Link to="/userCenter/productManage">賣場管理</Link>
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
              <li>
                <Link to="/userCenter/userProfile">修改資料</Link>
              </li>
              <li>
                <a href="#option2">登入紀錄</a>
              </li>
              <li>
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
