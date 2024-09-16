import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setDataReady } from "../../redux/slices/loadingSlice";
import useDashboardItemMap from "../map/useChildren";
import useFetchData from "../map/useFetchData";
import useDashboardHandler from "../Handler/useDashboardHandler";
import { PATHS } from "../../utils/paths";

const useDashboardConfig = (path, role) => {
  const [apiData, setDApiData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const location = useLocation();

  let currentPath = path || location.pathname;
  const isHistoryPage = currentPath === PATHS.HISTORY;

  if (isHistoryPage) {
    currentPath = role ? PATHS.PURCHASE_HISTORY : PATHS.SALES_HISTORY;
  }

  const Children = useDashboardItemMap(currentPath);
  const { handlers } = useDashboardHandler(currentPath, setDApiData);
  const fetchData = useFetchData(currentPath);

  useEffect(() => {
    setDApiData([]);
    dispatch(setDataReady(false));

    fetchData(setDApiData, userId);

    dispatch(setDataReady(true));
  }, [currentPath, userId]);

  return {
    apiData,
    Children,
    handlers,
    isHistoryPage,
  };
};

export default useDashboardConfig;
