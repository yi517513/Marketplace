import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../../utils/paths";
import { LogoutNav } from "../UI/ActionUI";
import { useDispatch } from "react-redux";
import { setIsModal } from "../../redux/slices/commonSlice";
import { NavItem, ListItem } from "../UI/BaseUI";
import { useAuth } from "../../context/AuthContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useBreakpoint from "../../hooks/RWD/useBreakpoint";
import SideNav_sm from "../UserCenter/SideNavContent/SideNav_sm";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint();

  return (
    <nav className="w-full flex items-center justify-around">
      <div>{!breakpoint("md") && isAuthenticated && <SideNav_sm />}</div>
      <ul className="flex justify-center items-center h-[6vh] lg:grid lg:grid-cols-3">
        <div className="col-start-2 flex justify-center items-center h-full gap-6 rwd-text-lg">
          <NavItem
            label="首頁"
            to={ROUTES.HOME}
            className="hover:hover text-gray-500"
          />
          {!isAuthenticated && (
            <NavItem
              label="註冊"
              to={ROUTES.REGISTER}
              className="hover:hover text-gray-500"
            />
          )}
          {!isAuthenticated && (
            <NavItem
              label="登入"
              to={ROUTES.LOGIN}
              className="hover:hover text-gray-500"
            />
          )}
          {isAuthenticated && (
            <LogoutNav label="登出" className="hover:hover text-gray-500" />
          )}
          <ListItem
            label="Modal"
            onClick={() => dispatch(setIsModal(true))}
            className="hover:hover text-gray-500"
          />
        </div>
        <div className="col-start-3 flex justify-end items-center h-full">
          <NavItem
            to={ROUTES.USER_CENTER}
            className="hover:hover text-gray-500 h-full w-12"
            icon={faUser}
          />
        </div>
      </ul>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={50000}
          closeOnClick
          theme="light"
          transition={Bounce}
          // toastClassName={"w-full"}
        />
      </div>
    </nav>
  );
};

export default NavBar;
