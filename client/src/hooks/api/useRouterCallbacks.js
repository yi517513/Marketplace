import { ROUTES } from "../../utils/paths";
import useStrategies from "../handler/useStrategies";

const useRouterCallbacks = (path) => {
  const strategies = useStrategies();

  const callbacksMap = {
    [ROUTES.HOME]: {
      optimisticCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
      successCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
      errorCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
    },
    [ROUTES.DETAIL]: {
      optimisticCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
      successCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
      errorCallbacks: {
        getAllProducts: () => strategies.noop(),
      },
    },
    [ROUTES.LOGIN]: {
      optimisticCallbacks: {
        login: ({ actionType }) => strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        login: ({ data: userId, message }) => {
          strategies.setSuccessNotify(message);
          strategies.setAuth(userId);
          strategies.navigateTo({ path: "HOME" });
        },
      },
      errorCallbacks: {
        login: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
    [ROUTES.REGISTER]: {
      optimisticCallbacks: {
        register: (actionType, verifyCode) => {
          strategies.setLoadingNotify(actionType);
          strategies.checkVerifyCode(verifyCode);
        },
      },
      successCallbacks: {
        register: () => strategies.navigateTo({ path: `LOGIN` }),
      },
      errorCallbacks: {
        register: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
    Logout: {
      optimisticCallbacks: {
        logout: (actionType) => strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        logout: ({ data: userId, message }) => {
          strategies.setSuccessNotify(message);
          strategies.cleanAuth(userId);
        },
      },
      errorCallbacks: {
        logout: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
    [ROUTES.PROFILE]: {
      optimisticCallbacks: {
        getUserData: () => strategies.noop(),
        updateProfile: (actionType, userData) => {
          strategies.updateState({ key: `profile`, data: userData });
          strategies.setLoadingNotify(actionType);
        },
      },
      successCallbacks: {
        getUserData: ({ data: userData }) =>
          strategies.setApiData({ key: `profile`, data: userData }),
        updateProfile: ({ message }) => strategies.setSuccessNotify(message),
      },
      errorCallbacks: {
        getUserData: (errorMessage) => strategies.setErrorNotify(errorMessage),
        updateProfile: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `profile` });
        },
      },
    },
    [ROUTES.ORDERS]: {
      optimisticCallbacks: {
        getUserOrders: () => strategies.noop(),
        deleteOrder: ({ payload: ordersInfo }) =>
          strategies.removeState(ordersInfo),
      },
      successCallbacks: {
        getUserOrders: ({ data: ordersInfo }) =>
          strategies.setApiData({ key: `userOrders`, data: ordersInfo }),
        deleteOrder: ({ message }) => strategies.setSuccessNotify(message),
      },
      errorCallbacks: {
        getUserOrders: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
        deleteOrder: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userOrders` });
        },
      },
    },
    [ROUTES.PRODUCTS]: {
      optimisticCallbacks: {
        getUserProducts: () => strategies.noop(),
        toggleStatus: ({ data: productInfo }) =>
          strategies.updateState({ key: `userProducts`, data: productInfo }),
        deleteProduct: ({ data: productId }) =>
          strategies.removeState({ key: `userProducts`, data: productId }),
      },
      successCallbacks: {
        getUserProducts: ({ data: productInfo }) =>
          strategies.setApiData({ key: `userProducts`, data: productInfo }),
        toggleStatus: ({ message }) => strategies.setSuccessNotify(message),
        deleteProduct: ({ message }) => strategies.setSuccessNotify(message),
      },
      errorCallbacks: {
        getUserProducts: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
        toggleStatus: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userProducts` });
        },
        deleteProduct: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userProducts` });
        },
      },
    },
    [ROUTES.SHIPMENT]: {
      optimisticCallbacks: {
        getPendingShipment: () => strategies.noop(),
        confirmShipment: ({ data: shipmentInfo }) =>
          strategies.updateState({
            key: `pendingShipment`,
            data: shipmentInfo,
          }),
      },
      successCallbacks: {
        getPendingShipment: ({ data: shipmentInfo }) =>
          strategies.setApiData({ key: `pendingShipment`, data: shipmentInfo }),
        confirmShipment: ({ message }) => strategies.setSuccessNotify(message),
      },
      errorCallbacks: {
        getPendingShipment: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
        confirmShipment: (errorMessage) => {
          strategies.rollback({ key: `pendingShipment` });
          strategies.setErrorNotify(errorMessage);
        },
      },
    },
    [ROUTES.PURCHASED]: {
      optimisticCallbacks: {
        getPurchaseHistory: () => strategies.noop(),
      },
      successCallbacks: {
        getPurchaseHistory: ({ data: purchaseInfo }) =>
          strategies.setApiData({
            key: `purchasedHistory`,
            data: purchaseInfo,
          }),
      },
      errorCallbacks: {
        getPurchaseHistory: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback(`purchasedHistory`);
        },
      },
    },
    [ROUTES.SOLD]: {
      optimisticCallbacks: {
        getSalesHistory: () => strategies.noop(),
      },
      successCallbacks: {
        getSalesHistory: ({ data }) =>
          strategies.setApiData({ key: `soldHistory`, data }),
      },
      errorCallbacks: {
        getSalesHistory: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `soldHistory` });
        },
      },
    },

    [ROUTES.CREATE]: {
      optimisticCallbacks: {
        postProduct: (actionType) => strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        postProduct: (productId) =>
          strategies.navigateTo({ path: `DETAIL`, slug: productId }),
      },
      errorCallbacks: {
        postProduct: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
    [ROUTES.EDIT]: {
      optimisticCallbacks: {
        getProductById: () => strategies.noop(),
        updateProduct: ({ actionType }) =>
          strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        getProductById: ({ data: productInfo }) =>
          strategies.setApiData({ key: `productEdit`, data: productInfo }),
        updateProduct: (productId) =>
          strategies.navigateTo({ path: `DETAIL`, slug: productId }),
      },
      errorCallbacks: {
        getProductById: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
        updateProduct: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
      },
    },
    VerifyCode: {
      optimisticCallbacks: {
        sendVerifyCode: ({ actionType }) =>
          strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        sendVerifyCode: ({ data: verifyCode, message }) => {
          strategies.setSuccessNotify(message);
          strategies.setVerifyCode(verifyCode);
          strategies.startCountdown(6);
        },
      },
      errorCallbacks: {
        sendVerifyCode: (errorMessage) =>
          strategies.setErrorNotify(errorMessage),
      },
    },

    RefreshToken: {
      optimisticCallbacks: {
        refreshToken: () => strategies.noop(),
      },
      successCallbacks: {
        refreshToken: () => strategies.noop(),
      },
      errorCallbacks: {
        refreshToken: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
    ImageManager: {
      optimisticCallbacks: {
        getUserImages: () => strategies.noop(),
        uploadImage: ({ actionType }) =>
          strategies.setLoadingNotify(actionType),
        deleteImage: ({ actionType, payload }) => {
          strategies.setLoadingNotify(actionType);
          strategies.removeState({
            key: { parentKey: `userImages` },
            data: payload,
          });
        },
      },
      successCallbacks: {
        getUserImages: ({ data: images }) => {
          console.log(images);
          strategies.setApiData({ key: `userImages`, data: images });
        },
        uploadImage: ({ data: newImage, message }) => {
          console.log(newImage);
          strategies.setSuccessNotify(message);
          strategies.appendState({
            key: { parentKey: `userImages`, childKey: null },
            data: newImage,
          });
        },
        deleteImage: ({ message }) => {
          strategies.setSuccessNotify(message);
        },
      },
      errorCallbacks: {
        getUserImages: () => strategies.noop(),
        uploadImage: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
        },
        deleteImage: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userImages` });
        },
      },
    },
    CheckAuth: {
      optimisticCallbacks: {
        checkAuth: ({ actionType }) => strategies.setLoadingNotify(actionType),
      },
      successCallbacks: {
        checkAuth: ({ data: userId }) => strategies.checkAuth(userId),
      },
      errorCallbacks: {
        checkAuth: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    },
  };

  const { optimisticCallbacks, successCallbacks, errorCallbacks } =
    callbacksMap[path] || {};

  return { optimisticCallbacks, successCallbacks, errorCallbacks };
};

export default useRouterCallbacks;
