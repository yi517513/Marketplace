import React from "react";
import NavBar from "../components/Common/NavBar";
import { useSelector } from "react-redux";
import useNotifications from "../hooks/Common/useNotifications";

const NavContainer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useNotifications();

  return <NavBar isAuthenticated={isAuthenticated} />;
};

export default NavContainer;
