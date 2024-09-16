import React from "react";
import UserCenterContainer from "../containers/UserCenterContainer";
import { Outlet } from "react-router-dom";

const UserCenterLayout = () => {
  return (
    <div className="user-center-layout">
      <aside className="user-center-nav">
        <UserCenterContainer />
      </aside>
      <section className="user-center-content">
        <Outlet />
      </section>
    </div>
  );
};

export default UserCenterLayout;
