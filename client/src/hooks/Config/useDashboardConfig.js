import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setDataReady } from "../../redux/slices/loadingSlice";
import useDashboardItemMap from "../useDashboardItemMap";
import useFetchData from "../fetch-Data/useFetchData";
import useDashboardHandler from "../Handler/useDashboardHandler";

const useDashboardConfig = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const Component = useDashboardItemMap(currentPath);
  const { handlers } = useDashboardHandler(currentPath, setDashboardData);

  const fetchData = useFetchData(currentPath);

  useEffect(() => {
    setDashboardData([]);

    dispatch(setDataReady(false));

    fetchData(setDashboardData, userId);

    dispatch(setDataReady(true));
  }, [location.pathname, userId]);

  return { dashboardData, Component, handlers };
};

export default useDashboardConfig;
