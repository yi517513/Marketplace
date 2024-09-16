import React from "react";
import ListItem from "../components/UI/ListItem";
import useLogoutConfig from "../hooks/Config/useLogoutConfig";

const LogoutContainer = ({ className, isModalType }) => {
  const handleLogout = useLogoutConfig(isModalType);

  return (
    <ListItem
      label="登出"
      to={`#`}
      onClick={handleLogout}
      className={className}
    />
  );
};

export default LogoutContainer;
