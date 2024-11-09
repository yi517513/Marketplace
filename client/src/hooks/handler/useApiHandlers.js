import useCreateApiHandler from "../api/useCreateApiHandler";
import { useCallback } from "react";
import { ROUTES } from "../../utils/paths";

// isModal設到store做全域變數
const useApiHandlers = (path) => {
  console.log(`using useApiHandlers`);
  const { createApiHandler } = useCreateApiHandler(path);

  const handleContactSeller = useCallback(() => {
    alert("製作聯繫賣家的組件");
  }, []);

  const apiHandlersMap = {
    [ROUTES.HOME]: {},
    [ROUTES.DETAIL]: {},
    [ROUTES.LOGIN]: {
      handleLogin: createApiHandler(`login`),
    },
    [ROUTES.REGISTER]: {
      handleRegister: createApiHandler(`register`),
    },
    [ROUTES.PROFILE]: {
      handleUpdateProfile: createApiHandler(`updateProfile`),
    },
    [ROUTES.ORDERS]: {
      handleDeleteOrder: createApiHandler(`deleteOrder`),
      handleContactSeller: handleContactSeller,
    },
    [ROUTES.PRODUCTS]: {
      handleToggleProductStatus: createApiHandler(`toggleStatus`),
      handleDeleteProduct: createApiHandler(`deleteProduct`),
    },
    [ROUTES.SHIPMENT]: {
      handleConfirmShipment: createApiHandler(`confirmShipment`),
      handleContactBuyer: handleContactSeller,
    },
    [ROUTES.PURCHASED]: {},
    [ROUTES.SOLD]: {},
    [ROUTES.CREATE]: {
      handlePostProduct: createApiHandler(`postProduct`),
    },
    [ROUTES.EDIT]: {
      handleUpdateProduct: createApiHandler(`updateProduct`),
    },
    Logout: {
      handleLogout: createApiHandler(`logout`),
    },
    ImageManager: {
      handleImageUpload: createApiHandler(`uploadImage`),
      handleImageDelete: createApiHandler(`deleteImage`),
    },
    VerifyCode: {
      handleSendVerifyCode: createApiHandler(`sendVerifyCode`),
    },
    RefreshToken: {
      handleRefreshToken: createApiHandler(`refreshToken`),
    },
    CheckAuth: {
      handleCheckAuth: createApiHandler(`checkAuth`),
    },
  };

  const apiHandlers = apiHandlersMap[path] || {};

  return { apiHandlers };
};

export default useApiHandlers;
