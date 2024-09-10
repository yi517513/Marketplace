import { useCallback } from "react";
import { PATHS } from "../../utils/paths";
import useNavigation from "../useNavigation";
import useAsyncAction from "../Common/useAsyncAction";
import useRouteServices from "../service/useRouteServices";

// api的刪除控制器應該回傳物品的id

const useDashboardHandler = (currentPath, setDashboardData) => {
  const { navigateTo } = useNavigation();
  const { asyncAction } = useAsyncAction();
  const { services } = useRouteServices(currentPath);

  const updatedCallback = (success, data) => {
    if (success) {
      setDashboardData(data);
    }
  };

  const deletedCallback = (success, dataId) => {
    if (success) {
      setDashboardData((prevData) =>
        prevData.filter((prevData) => prevData._id !== dataId)
      );
    }
  };

  // 刪除商品或訂單
  const handleDelete = useCallback(
    (payload) => {
      asyncAction(services.delete, payload._id, "正在刪除", deletedCallback);
    },
    [asyncAction, currentPath]
  );

  // 變更商品上下架狀態或確認出貨
  const handleUpdate = useCallback(
    (payload) => {
      asyncAction(services.update, payload, "正在更新", updatedCallback);
    },
    [asyncAction, currentPath]
  );

  const handleContactSeller = useCallback(() => {
    alert("製作聯繫賣家的組件");
  }, []);

  const handlersMap = {
    [PATHS.ORDERS]: {
      navigateTo: navigateTo,
      deleteOrder: handleDelete,
      contactSeller: handleContactSeller,
    },
    [PATHS.PRODUCTS]: {
      navigateTo: navigateTo,
      toggleProductStatus: handleUpdate,
      deleteProduct: handleDelete,
    },
    [PATHS.PENDING_SHIPMENT]: {
      navigateTo: navigateTo,
      confirmShipment: handleUpdate,
      contactBuyer: handleContactSeller,
    },
    [PATHS.PURCHASE_HISTORY]: {
      navigateTo: navigateTo,
    },
    [PATHS.SALES_HISTORY]: {
      navigateTo: navigateTo,
    },
  };

  const handlers = handlersMap[currentPath] || {};

  return { handlers };
};

export default useDashboardHandler;
