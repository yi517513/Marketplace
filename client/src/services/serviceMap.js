import TransactionService from "./transactionService";
import PaymentService from "./paymentService";
import UserService from "./userService";
import AuthService from "./authService";
import PublicService from "./publicService";
import ProductService from "./productService ";
import ImageService from "./imageService";

const serviceMap = () => {
  console.log(`using serviceMap`);
  const apiServicesMap = {
    login: AuthService.login,
    logout: AuthService.logout,
    refreshToken: AuthService.refreshAccessToken,
    checkAuth: AuthService.checkAuth,

    getAllProducts: PublicService.getAllProducts,
    getProduct: PublicService.getProduct,
    update: AuthService.sendVerifyCode,
    register: AuthService.register,
    getUserData: UserService.getProfile,
    updateProfile: UserService.updateProfile,
    postProduct: ProductService.postProduct,
    getProductById: ProductService.getProductById,
    updateProduct: ProductService.updateProduct,
    getUserOrders: TransactionService.getUserOrders,
    deleteOrder: PaymentService.deleteOrder,
    getPurchaseHistory: TransactionService.getPurchaseHistory,
    getSalesHistory: TransactionService.getSalesHistory,
    getUserProducts: ProductService.getUserProducts,
    toggleStatus: ProductService.toggleStatus,
    deleteProduct: ProductService.deleteProduct,
    getPendingShipment: TransactionService.getPendingShipment,
    confirmShipment: TransactionService.confirmShipment,
    getUserImages: ImageService.getUserImages,
    uploadImage: ImageService.uploadImage,
    deleteImage: ImageService.deleteImage,
    sendVerifyCode: AuthService.sendVerifyCode,
  };

  const getApiService = (action) => {
    return apiServicesMap[action] || null;
  };

  return getApiService;
};

export default serviceMap;
