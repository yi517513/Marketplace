import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../../utils/paths";
import ListItem from "../UI/ListItem";
import Logout from "../Auth/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../../redux/slices/commonSlice";
// import useNotifications from "../../hooks/Common/useNotifications";

const NavBar = () => {
  console.log(`render NavBar`);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // useNotifications();
  return (
    <nav>
      <ul className="flex justify-center">
        <ListItem
          label="首頁"
          to={ROUTES.HOME}
          className="nav-li "
          linkClassName="nav-item"
        />
        {!isAuthenticated && (
          <ListItem
            label="註冊"
            to={ROUTES.REGISTER}
            className="nav-li"
            linkClassName="nav-item"
          />
        )}
        {!isAuthenticated && (
          <ListItem
            label="登入"
            to={ROUTES.LOGIN}
            className="nav-li"
            linkClassName="nav-item"
          />
        )}
        {isAuthenticated && (
          <Logout className="nav-li" linkClassName="nav-item" />
        )}
        <ListItem
          label="會員中心"
          to={ROUTES.USER_CENTER}
          className="nav-li"
          linkClassName="nav-item"
        />
        <ListItem
          label="Modal"
          to="#"
          onClick={() => dispatch(setIsModal(true))}
          className="nav-li"
          linkClassName="nav-item"
        />
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
