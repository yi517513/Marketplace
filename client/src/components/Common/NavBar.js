import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleLogout = async () => {
    alert("您已成功登出");
    try {
      await AuthService.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error.response.data.errorMessage);
    }
  };

  return (
    <nav className="commonNav">
      <ul>
        <li onClick={() => navigate("/")}>
          <Link to="/">首頁</Link>
        </li>
        {!isAuthenticated && (
          <li onClick={() => navigate("/register")}>
            <Link to="/register">註冊</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li onClick={() => navigate("/login")}>
            <Link to="/login">登入</Link>
          </li>
        )}
        {isAuthenticated && (
          <li onClick={handleLogout}>
            <Link to="/">登出</Link>
          </li>
        )}
        <li onClick={() => navigate("/userCenter")}>
          <Link to="/userCenter">會員中心</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
