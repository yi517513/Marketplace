import React from "react";
import UserCenterNav from "../components/UserCenter/UserCenterNav";
import { Outlet } from "react-router-dom";

const UserCenterLayout = () => {
  return (
    <div className="user-center-layout">
      <aside className="user-center-nav">
        <UserCenterNav />
      </aside>
      <section className="user-center-content">
        <Outlet />
      </section>
    </div>
  );
};

export default UserCenterLayout;
