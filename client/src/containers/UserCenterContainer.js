import React from "react";
import UserCenterNav from "../components/UserCenter/UserCenterNav";

import { useSelector } from "react-redux";

const UserCenterContainer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return <UserCenterNav isAuthenticated={isAuthenticated} />;
};

export default UserCenterContainer;
