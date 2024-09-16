import useServices from "./useServices";
import useAsyncAction from "../api/useAsyncAction";
import { useParams } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const useFetchData = (path) => {
  const { productId } = useParams();
  const { services } = useServices(path);
  const { asyncAction } = useAsyncAction();

  const fetchAction = (services, payload, setData) => {
    asyncAction(services.fetchData, payload, {}, (success, data) => {
      if (success) {
        setData(data);
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

  // 首頁數據獲取
  const homeFetchData = (setProducts) => {
    fetchAction(services, {}, setProducts);
  };

  // EditProduct數據獲取
  const editProductFetchData = (setProductInfo, productId) => {
    fetchAction(services, productId, setProductInfo);
  };

  // ImageManager數據獲取
  const ImageManagerFetchData = (setPreviousImages) => {
    fetchAction(services, {}, setPreviousImages);
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
    [`ImageManager`]: ImageManagerFetchData,
  };

  const fetchData = fetchDataMap[path] || {};

  return fetchData;
};

export default useFetchData;
