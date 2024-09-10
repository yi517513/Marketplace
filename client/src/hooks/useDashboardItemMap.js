import { PATHS } from "../utils/paths";
import Oders from "../components/UserCenter/Buyer/Oders";
import History from "../components/UserCenter/Profile/History";
import Products from "../components/UserCenter/Seller/Products";
import Shipment from "../components/UserCenter/Seller/Shipment";

const useDashboardItemMap = (currentPath) => {
  const componentMap = {
    [PATHS.ORDERS]: Oders,
    [PATHS.PURCHASE_HISTORY]: History,
    [PATHS.PRODUCTS]: Products,
    [PATHS.PENDING_SHIPMENT]: Shipment,
    [PATHS.SALES_HISTORY]: History,
  };

  const Component = componentMap[currentPath] || {};

  return Component;
};

export default useDashboardItemMap;
