import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
const Layout = () => {
  return (
    <div className="min-h-screen" id="root">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
