import useRouteServices from "../service/useRouteServices";
import useAsyncAction from "../Common/useAsyncAction";
import { useParams } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const useFetchData = (currentPath) => {
  const { productId } = useParams();
  const { services } = useRouteServices(currentPath);
  const { asyncAction } = useAsyncAction();

  const fetchAction = (services, payload, successCallback) => {
    asyncAction(services.fetchData, payload, {}, (success, data) => {
      if (success) {
        successCallback(data);
      }
    });
  };

  // Profile數據獲取
  const profileFetchData = (setUserProfile) => {
    fetchAction(services, {}, setUserProfile);
  };

  // Dashboard數據獲取 (多個路由)
  const dashboardFetchData = (setDashboardData, userId) => {
    fetchAction(services, userId, setDashboardData);
  };

  // EditProduct數據獲取
  const editProductFetchData = (setProductInfo, productId) => {
    fetchAction(services, productId, setProductInfo);
  };

  // 首頁數據獲取
  const homeFetchData = (setProducts) => {
    fetchAction(services, {}, setProducts);
  };

  const fetchDataMap = {
    [PATHS.HOME]: homeFetchData,
    [PATHS.PROFILE]: profileFetchData,
    [PATHS.ORDERS]: dashboardFetchData,
    [PATHS.PRODUCTS]: dashboardFetchData,
    [PATHS.PENDING_SHIPMENT]: dashboardFetchData,
    [PATHS.PURCHASE_HISTORY]: dashboardFetchData,
    [PATHS.SALES_HISTORY]: dashboardFetchData,
    [`${PATHS.EDIT}/${productId}`]: editProductFetchData,
  };

  const fetchData = fetchDataMap[currentPath] || {};

  return fetchData;
};

export default useFetchData;
