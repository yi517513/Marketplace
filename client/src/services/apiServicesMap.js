import TransactionService from "./transactionService";
import PaymentService from "./paymentService";
import UserService from "./userService";
import AuthService from "./authService";
import PublicService from "./publicService";
import ProductService from "./productService ";
import ImageService from "./imageService";

const apiServicesMap = (action) => {
  const apiServicesMap = {
    // Auth
    login: AuthService.login,
    logout: AuthService.logout,
    refreshToken: AuthService.refreshAccessToken,
    checkAuth: AuthService.checkAuth,

    // Payment
    deleteOrder: PaymentService.deleteOrder,
    createOrder: PaymentService.createOrder,

    getAllProducts: PublicService.getAllProducts,
    getProduct: PublicService.getProduct,
    update: AuthService.sendVerifyCode,
    register: AuthService.register,
    getUserData: UserService.getProfile,
    updateProfile: UserService.updateProfile,
    postProduct: ProductService.postProduct,
    getProductById: ProductService.getProductById,
    editProduct: ProductService.editProduct,
    getUserOrders: TransactionService.getUserOrders,

    getPurchasedHistory: TransactionService.getPurchasedHistory,
    getSoldHistory: TransactionService.getSoldHistory,
    getUserProducts: ProductService.getUserProducts,
    deleteProduct: ProductService.deleteProduct,
    getPendingShipment: TransactionService.getPendingShipment,
    confirmShipment: TransactionService.confirmShipment,
    getUserImages: ImageService.getUserImages,
    uploadImage: ImageService.uploadImage,
    deleteImage: ImageService.deleteImage,
    sendVerifyCode: AuthService.sendVerifyCode,
  };

  if (!apiServicesMap[action]) {
    throw new Error(`No actionService for action: ${action}`);
  }

  return apiServicesMap[action];
};

export default apiServicesMap;
