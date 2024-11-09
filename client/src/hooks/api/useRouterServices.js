import TransactionService from "../../services/transactionService";
import PaymentService from "../../services/paymentService";
import UserService from "../../services/userService";
import AuthService from "../../services/authService";
import PublicService from "../../services/publicService";
import ProductService from "../../services/productService ";
import ImageService from "../../services/imageService";

import { ROUTES } from "../../utils/paths";

const useRouterServices = (path) => {
  const routerServicesMap = {
    [ROUTES.HOME]: {
      getAllProducts: PublicService.getAllProducts,
    },
    [ROUTES.DETAIL]: {
      getProduct: PublicService.getProduct,
    },
    [ROUTES.REGISTER]: {
      update: AuthService.sendVerifyCode,
      register: AuthService.register,
    },
    [ROUTES.LOGIN]: {
      login: AuthService.login,
    },
    [ROUTES.PROFILE]: {
      getUserData: UserService.getProfile,
      updateProfile: UserService.updateProfile,
    },
    [ROUTES.CREATE]: {
      postProduct: ProductService.postProduct,
    },

    [ROUTES.EDIT]: {
      getProductById: ProductService.getProductById,
      updateProduct: ProductService.updateProduct,
    },
    [ROUTES.ORDERS]: {
      getUserOrders: TransactionService.getUserOrders,
      deleteOrder: PaymentService.deleteOrder,
    },
    [ROUTES.PURCHASED]: {
      getPurchaseHistory: TransactionService.getPurchaseHistory,
    },
    [ROUTES.SOLD]: {
      getSalesHistory: TransactionService.getSalesHistory,
    },
    [ROUTES.PRODUCTS]: {
      getUserProducts: ProductService.getUserProducts,
      toggleStatus: ProductService.toggleStatus,
      deleteProduct: ProductService.deleteProduct,
    },
    [ROUTES.SHIPMENT]: {
      getPendingShipment: TransactionService.getPendingShipment,
      confirmShipment: TransactionService.confirmShipment,
    },
    ImageManager: {
      getUserImages: ImageService.getUserImages,
      uploadImage: ImageService.uploadImage,
      deleteImage: ImageService.deleteImage,
    },
    VerifyCode: {
      sendVerifyCode: AuthService.sendVerifyCode,
    },
    Logout: {
      logout: AuthService.logout,
    },
    RefreshToken: {
      refreshToken: AuthService.refreshAccessToken,
    },
    CheckAuth: {
      checkAuth: AuthService.checkAuth,
    },
  };

  const routerServices = routerServicesMap[path] || {};

  return { routerServices };
};

export default useRouterServices;
