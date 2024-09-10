import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PATHS } from "../../utils/paths";
import ListItem from "../UI/ListItem";
import useNotifications from "../../hooks/Common/useNotifications";

const NavBar = ({ isAuthenticated, handleLogout }) => {
  useNotifications();
  return (
    <nav className="commonNav">
      <ul>
        <ListItem label="首頁" to={PATHS.HOME} />
        {!isAuthenticated && <ListItem label="註冊" to={PATHS.REGISTER} />}
        {!isAuthenticated && <ListItem label="登入" to={PATHS.LOGIN} />}
        {isAuthenticated && <ListItem label="登出" onClick={handleLogout} />}
        <ListItem label="會員中心" to={PATHS.USER_CENTER} />
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={true}
        theme="light"
        transition={Bounce}
      />
    </nav>
  );
};

export default NavBar;
