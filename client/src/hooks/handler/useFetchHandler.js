import useCreateApiHandler from "../api/useCreateApiHandler";
import { ROUTES } from "../../utils/paths";

const useFetchHandler = (path) => {
  console.log(`using useFetchHandler`);
  const { createApiHandler } = useCreateApiHandler(path);

  const apiFetchMap = {
    [ROUTES.HOME]: createApiHandler(`getAllProducts`),
    [ROUTES.DETAIL]: createApiHandler(`getProduct`),
    [ROUTES.PROFILE]: createApiHandler(`getUserData`),
    [ROUTES.ORDERS]: createApiHandler(`getUserOrders`),
    [ROUTES.PRODUCTS]: createApiHandler(`getUserProducts`),
    [ROUTES.SHIPMENT]: createApiHandler(`getPendingShipment`),
    [ROUTES.PURCHASED]: createApiHandler(`getPurchaseHistory`),
    [ROUTES.SOLD]: createApiHandler(`getSalesHistory`),
    [ROUTES.EDIT]: createApiHandler(`getProductById`),
    ImageManager: createApiHandler(`getUserImages`),
  };

  const fetchHandler = apiFetchMap[path] || null;

  return { fetchHandler };
};

export default useFetchHandler;
