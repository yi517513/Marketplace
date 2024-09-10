import React from "react";
import NavBar from "../components/Common/NavBar";
import { useSelector } from "react-redux";
import useNavConfig from "../hooks/Config/useNavConfig";
import useNotifications from "../hooks/Common/useNotifications";

const NavContainer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = useNavConfig();

  useNotifications();

  return (
    <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
  );
};

export default NavContainer;
