import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/NavBar";
import Footer from "../components/Common/Footer";

const Layout = () => {
  console.log("Layout rendered");
  return (
    <div className="layout">
      <header className="header">
        <NavBar />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
