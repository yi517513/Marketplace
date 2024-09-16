import { PATHS } from "../../utils/paths";
import Oders from "../../components/UserCenter/Dashboard/Oders";
import History from "../../components/UserCenter/Dashboard/History";
import Products from "../../components/UserCenter/Dashboard/Products";
import Shipment from "../../components/UserCenter/Dashboard/Shipment";

const useChildren = (currentPath) => {
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

export default useChildren;
