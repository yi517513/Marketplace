import React from "react";
import useDashboardConfig from "../hooks/Config/useDashboardConfig";

const Dashboard = () => {
  const { dashboardData, Component, handlers } = useDashboardConfig();

  return <Component data={dashboardData} {...handlers} />;
};

export default Dashboard;
