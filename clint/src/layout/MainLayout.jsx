import React from "react";
import Navbar from "../components/ui/navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div>
    {!shouldHideNavbar && <Navbar />}
    <div>
      <Outlet />
    </div>
  </div>
);
};

export default MainLayout;
