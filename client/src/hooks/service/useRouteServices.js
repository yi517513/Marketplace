import { useParams } from "react-router-dom";

import ProductService from "../../services/productService ";
import TransactionService from "../../services/transactionService";
import PaymentService from "../../services/paymentService";
import UserService from "../../services/userService";
import AuthService from "../../services/authService";

import { PATHS } from "../../utils/paths";

const useRouteServices = (currentPath) => {
  const { productId } = useParams();
  const routeServiceMap = {
    [PATHS.HOME]: {
      fetchData: ProductService.getAllProducts,
      create: null,
      update: null,
      delete: null,
      auth: null,
    },
    [PATHS.REGISTER]: {
      fetchData: null,
      create: null,
      update: AuthService.sendVerifyCode,
      delete: null,
      auth: AuthService.register,
    },
    [PATHS.LOGIN]: {
      fetchData: null,
      create: null,
      update: null,
      delete: null,
      auth: AuthService.login,
    },
    [PATHS.PROFILE]: {
      fetchData: UserService.getProfile,
      create: null,
      update: UserService.updateProfile,
      delete: null,
      auth: null,
    },
    [PATHS.CREATE]: {
      fetchData: null,
      create: ProductService.postProduct,
      update: null,
      delete: null,
      auth: null,
    },

    [`${PATHS.EDIT}/${productId}`]: {
      fetchData: ProductService.getProduct,
      create: null,
      update: ProductService.updateProduct,
      delete: null,
      auth: null,
    },
    [PATHS.ORDERS]: {
      fetchData: TransactionService.getOrders,
      create: null,
      update: null,
      delete: PaymentService.deleteOrder,
      auth: null,
    },
    [PATHS.PURCHASE_HISTORY]: {
      fetchData: TransactionService.getPurchaseHistory,
      create: null,
      update: null,
      delete: null,
      auth: null,
    },
    [PATHS.SALES_HISTORY]: {
      fetchData: TransactionService.getSalesHistory,
      create: null,
      update: null,
      delete: null,
      auth: null,
    },
    [PATHS.PRODUCTS]: {
      fetchData: ProductService.getUserProducts,
      create: null,
      update: ProductService.toggleStatus,
      delete: ProductService.deleteProduct,
      auth: null,
    },
    [PATHS.PENDING_SHIPMENT]: {
      fetchData: TransactionService.getPendingShipment,
      create: null,
      update: TransactionService.confirmShipment,
      delete: null,
      auth: null,
    },
  };

  const services = routeServiceMap[currentPath] || null;

  return { services };
};

export default useRouteServices;
