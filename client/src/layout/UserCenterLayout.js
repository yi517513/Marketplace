import React from "react";
import UserCenter from "../components/UserCenter/UserCenter";
import { Outlet } from "react-router-dom";

const UserCenterLayout = () => {
  return (
    <section className="flex flex-1 w-full p-2 bg-gray-100">
      <aside
        className="flex flex-col flex-0 w-full ml-4"
        style={{ flexBasis: `10%` }}
      >
        <UserCenter />
      </aside>
      <section
        className="flex flex-col flex-1 w-full p-2 mx-2 items-center"
        style={{ flexBasis: `80%` }}
      >
        <Outlet />
      </section>
    </section>
  );
};

export default UserCenterLayout;
