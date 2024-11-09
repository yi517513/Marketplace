import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/NavBar";
import Footer from "../components/Common/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-center h-[8vh] mb-2  p-4 shadow-md ">
        <NavBar />
      </header>
      <main className="flex flex-1 flex-col ">
        <Outlet />
      </main>
      <footer className="p-4 text-center bg-dark-gray">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
