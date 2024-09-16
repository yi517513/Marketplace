import React from "react";
import { Outlet } from "react-router-dom";
import NavContainer from "../containers/NavContainer";
import Footer from "../components/Common/Footer";

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <NavContainer />
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
