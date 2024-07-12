import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("您已成功登出");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="commonNav">
      <ul>
        <li onClick={() => navigate("/")}>
          <Link to="/">首頁</Link>
        </li>
        <li onClick={() => navigate("/register")}>
          <Link to="/register">註冊</Link>
        </li>
        <li onClick={() => navigate("/login")}>
          <Link to="/login">登入</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">登出</Link>
        </li>
        <li onClick={() => navigate("/userCenter")}>
          <Link to="/userCenter">會員中心</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
