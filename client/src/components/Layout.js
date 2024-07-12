import React from "react";
import { Outlet } from "react-router-dom";
import NavComponent from "./NavComponent";
import FooterComponent from "./FooterComponent";

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <NavComponent />
      </header>
      <main className="main">
        <Outlet />{" "}
      </main>
      <footer className="footer">
        <FooterComponent />{" "}
      </footer>
    </div>
  );
};

export default Layout;
