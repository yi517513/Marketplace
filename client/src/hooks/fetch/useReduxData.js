import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ApiToStoreMapping = {
  getAllProducts: `allProducts`,
  getProduct: `getProduct`,
  getUserData: `profile`,
  getUserOrders: `orderList`,
  getUserProducts: `productList`,
  getPendingShipment: `pendingList`,
  getPurchasedHistory: `purchaseHistory`,
  getSoldHistory: `soldHistory`,
  getProductById: `singleProduct`,
  getProduct: `singleProduct`,
  getUserImages: `ImageList`,
  default: null,
};

const useReduxData = (action) => {
  const [loading, setLoading] = useState(true);
  const key = ApiToStoreMapping[action];
  const data = useSelector((state) => state.data[key]);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return { loading, data };
};

export default useReduxData;
