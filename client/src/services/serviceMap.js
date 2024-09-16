import TransactionService from "./transactionService";
import PaymentService from "./paymentService";
import UserService from "./userService";
import AuthService from "./authService";
import PublicService from "./publicService";
import ProductService from "./productService ";
import ImageService from "./imageService";

import { PATHS } from "../utils/paths";

export const serviceMap = {
  [PATHS.HOME]: {
    fetchData: PublicService.getAllProducts,
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

  [`${PATHS.EDIT}/:productId`]: {
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
  [`ImageManager`]: {
    fetchData: ImageService.getImages,
    create: ImageService.uploadImage,
    update: null,
    delete: ImageService.deleteImage,
    auth: null,
  },
  [`VerifyCode`]: {
    fetchData: null,
    create: null,
    update: null,
    delete: null,
    auth: AuthService.sendVerifyCode,
  },
};
