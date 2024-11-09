import { useCallback, useMemo } from "react";
import useStrategies from "../handler/useStrategies";

const useApiCallback = (action) => {
  console.log(`using useApiCallback`);
  const strategies = useStrategies();

  const apiCallbackMap = useMemo(() => {
    console.log(`apiCallbackMap is being init`);
    return {
      getAllProducts: {
        optimistic: () => strategies.noop(),
        successCb: () => strategies.noop(),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      register: {
        optimistic: (verifyCode) => {
          strategies.checkVerifyCode(verifyCode);
        },
        successCb: () => strategies.navigateTo({ path: `LOGIN` }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      login: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: userId, message }) => {
          strategies.setSuccessNotify(message);
          strategies.setAuth(userId);
          strategies.navigateTo({ path: "HOME" });
        },
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      logout: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: userId, message }) => {
          strategies.setSuccessNotify(message);
          strategies.cleanAuth(userId);
        },
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      sendVerifyCode: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: verifyCode, message }) => {
          strategies.setSuccessNotify(message);
          strategies.setVerifyCode(verifyCode);
          strategies.startCountdown(6);
        },
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      RefreshToken: {
        optimistic: () => strategies.noop(),
        successCb: () => strategies.noop(),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      deleteImage: {
        optimistic: (payload) => {
          strategies.removeState({
            key: { parentKey: `userImages` },
            data: payload,
          });
        },
        successCb: ({ message }) => {
          strategies.setSuccessNotify(message);
        },
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userImages` });
        },
      },

      uploadImage: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: newImage, message }) => {
          console.log(newImage);
          strategies.setSuccessNotify(message);
          strategies.appendState({
            key: { parentKey: `userImages`, childKey: null },
            data: newImage,
          });
        },
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
        },
      },

      getUserImages: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: images }) => {
          console.log(images);
          strategies.setApiData({ key: `userImages`, data: images });
        },
        errorCb: () => strategies.noop(),
      },

      checkAuth: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: userId }) => strategies.checkAuth(userId),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      getUserData: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: userData }) =>
          strategies.setApiData({ key: `profile`, data: userData }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      updateProfile: {
        optimistic: (userData) => {
          strategies.updateState({ key: `profile`, data: userData });
        },
        successCb: ({ message }) => strategies.setSuccessNotify(message),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `profile` });
        },
      },

      getUserOrders: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: ordersInfo }) =>
          strategies.setApiData({ key: `userOrders`, data: ordersInfo }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      deleteOrder: {
        optimistic: (ordersInfo) => strategies.removeState(ordersInfo),
        successCb: ({ message }) => strategies.setSuccessNotify(message),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userOrders` });
        },
      },

      getUserProducts: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: productInfo }) =>
          strategies.setApiData({ key: `userProducts`, data: productInfo }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      toggleStatus: {
        optimistic: (productInfo) =>
          strategies.updateState({ key: `userProducts`, data: productInfo }),
        successCb: ({ message }) => strategies.setSuccessNotify(message),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userProducts` });
        },
      },

      deleteProduct: {
        optimistic: (productId) =>
          strategies.removeState({ key: `userProducts`, data: productId }),
        successCb: ({ message }) => strategies.setSuccessNotify(message),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `userProducts` });
        },
      },

      getPendingShipment: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: shipmentInfo }) =>
          strategies.setApiData({ key: `pendingShipment`, data: shipmentInfo }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      confirmShipment: {
        optimistic: (shipmentInfo) =>
          strategies.updateState({
            key: `pendingShipment`,
            data: shipmentInfo,
          }),
        successCb: ({ message }) => strategies.setSuccessNotify(message),
        errorCb: (errorMessage) => {
          strategies.rollback({ key: `pendingShipment` });
          strategies.setErrorNotify(errorMessage);
        },
      },

      getPurchaseHistory: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: purchaseInfo }) =>
          strategies.setApiData({
            key: `purchasedHistory`,
            data: purchaseInfo,
          }),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback(`purchasedHistory`);
        },
      },

      getSalesHistory: {
        optimistic: () => strategies.noop(),
        successCb: ({ data }) =>
          strategies.setApiData({ key: `soldHistory`, data }),
        errorCb: (errorMessage) => {
          strategies.setErrorNotify(errorMessage);
          strategies.rollback({ key: `soldHistory` });
        },
      },

      postProduct: {
        optimistic: () => strategies.noop(),
        successCb: (productId) =>
          strategies.navigateTo({ path: `DETAIL`, slug: productId }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      getProductById: {
        optimistic: () => strategies.noop(),
        successCb: ({ data: productInfo }) =>
          strategies.setApiData({ key: `productEdit`, data: productInfo }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },

      updateProduct: {
        optimistic: () => strategies.noop(),
        successCb: (productId) =>
          strategies.navigateTo({ path: `DETAIL`, slug: productId }),
        errorCb: (errorMessage) => strategies.setErrorNotify(errorMessage),
      },
    };
  }, [action]);

  const getApiCallback = useCallback(
    (action) => {
      return apiCallbackMap[action] || {};
    },
    [action]
  );

  return getApiCallback;
};

export default useApiCallback;
