import React from "react";
import useStaticRoute from "../../hooks/router/useStaticRoute";
import SideNav_md from "./SideNavContent/SideNav_md";
import SideNav_sm from "./SideNavContent/SideNav_sm";
import useBreakpoint from "../../hooks/RWD/useBreakpoint";

const SideNavContentMap = {
  xl: SideNav_md,
  lg: SideNav_md,
  md: SideNav_md,
  sm: null,
};

const SideNav = () => {
  const { windowSize } = useBreakpoint();
  const staticRoute = useStaticRoute();

  const SideNavContent = SideNavContentMap[windowSize];

  return (
    <div className="w-full h-full">
      {SideNavContent && <SideNavContent staticRoute={staticRoute} />}
    </div>
  );
};

export default SideNav;
