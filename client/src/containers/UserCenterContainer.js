import React from "react";
import UserCenterNav from "../components/UserCenter/UserCenterNav";

import { useSelector } from "react-redux";

const UserCenterContainer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return <UserCenterNav />;
};

export default UserCenterContainer;
