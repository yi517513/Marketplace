import React from "react";
import SideNav from "../components/UserCenter/SideNav";
import { Outlet } from "react-router-dom";
import { UserAccessModal } from "../components/UI/ActionUI";
import { useAuth } from "../context/AuthContext";

const UserCenterLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative flex flex-1 w-full min-h-[90vh] px-2 bg-gray-100 gap-2">
      <aside className="border-slate-300 rounded-2xl md:flex md:p-2 lg:basis-[10%] md:border">
        <SideNav />
      </aside>
      <section className="flex flex-col flex-1 p-2 w-full items-center lg:basis-[90%] border border-slate-300 rounded-2xl">
        <Outlet />
      </section>
      <div>
        <UserAccessModal isAuthenticated={isAuthenticated} />
      </div>
    </section>
  );
};

export default UserCenterLayout;
