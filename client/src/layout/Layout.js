import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/NavBar";
import Footer from "../components/Common/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="relative flex items-center justify-center h-[7vh] p-4 shadow-md ">
        <NavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-[3vh] text-center bg-dark-gray">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
