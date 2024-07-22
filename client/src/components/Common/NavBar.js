import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { logout, setNotification } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToastNotifications from "../../hooks/useToastNotifications";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useToastNotifications();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      dispatch(logout());
      dispatch(
        setNotification({
          visible: true,
          message: "你已成功登出",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          visible: true,
          message: "伺服器發生錯誤",
          type: "error",
        })
      );
      console.log(error.response.data);
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </nav>
  );
};

export default NavBar;
