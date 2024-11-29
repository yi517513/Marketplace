import {
  setAuth,
  cleanAuth,
  checkAuth,
  setVerifyCode,
  checkVerify,
} from "../../redux/slices/authSlice";
import {
  setApiData,
  updateState,
  removeState,
  appendState,
  rollback,
} from "../../redux/slices/dataSlice";

export const apiCallbacks = ({ dispatch, startCountdown, navigateTo }) => ({
  getAllProducts: {
    optimistic: () => {},
    successCb: ({ data: products }) =>
      dispatch(setApiData({ key: `allProducts`, data: products })),
    errorCb: () => {},
  },

  register: {
    optimistic: () => {
      /* strategies.checkVerifyCode(verifyCode);*/
    },
    successCb: () => navigateTo({ path: `LOGIN` }),
    errorCb: () => {},
  },

  login: {
    optimistic: () => {},
    successCb: ({ data: userId }) => {
      dispatch(setAuth({ userId }));
      navigateTo({ path: "HOME" });
    },
    errorCb: () => {},
  },

  logout: {
    optimistic: () => {},
    successCb: ({ data: userId }) => dispatch(cleanAuth(userId)),
    errorCb: () => {},
  },

  sendVerifyCode: {
    optimistic: () => {},
    successCb: ({ data: verifyCode }) => {
      dispatch(setVerifyCode({ verifyCode }));
      startCountdown(6);
    },
    errorCb: () => {},
  },

  refreshToken: {
    optimistic: () => {},
    successCb: () => {},
    errorCb: () => {},
  },

  deleteImage: {
    optimistic: (payload) =>
      dispatch(
        removeState({
          storePath: ["ImageList"],
          data: payload,
        })
      ),
    successCb: () => {},
    errorCb: () => dispatch(rollback({ key: `ImageList` })),
  },

  uploadImage: {
    optimistic: () => {},
    successCb: ({ data: newImage }) =>
      dispatch(
        appendState({
          storePath: [`ImageList`],
          data: newImage,
        })
      ),

    errorCb: () => {},
  },

  getUserImages: {
    optimistic: () => {},
    successCb: ({ data: images }) =>
      dispatch(setApiData({ key: `ImageList`, data: images })),
    errorCb: () => {},
  },

  checkAuth: {
    optimistic: () => {},
    successCb: ({ data: userId }) => dispatch(checkAuth({ userId })),
    errorCb: () => {},
  },

  getUserData: {
    optimistic: () => {},
    successCb: ({ data: userData }) =>
      dispatch(setApiData({ key: `profile`, data: userData })),
    errorCb: () => {},
  },

  updateProfile: {
    optimistic: (userData) =>
      dispatch(updateState({ storePath: [`profile`], data: userData })),
    successCb: () => {},
    errorCb: () => dispatch(rollback({ key: `profile` })),
  },

  getUserOrders: {
    optimistic: () => {},
    successCb: ({ data: ordersInfo }) =>
      dispatch(setApiData({ key: `orderList`, data: ordersInfo })),
    errorCb: () => {},
  },

  createOrder: {
    optimistic: () => {},
    // successCb: ({ data: PaymentHtml }) => {
    //   console.log(PaymentHtml);
    //   const container = document.createElement("div");
    //   container.innerHTML = PaymentHtml; // 將 JSON 的 HTML 插入到容器中
    //   document.body.appendChild(container); // 添加容器到頁面中

    //   // 提交表單
    //   const form = document.getElementById("_form_aiochk");
    //   if (form) {
    //     form.submit(); // 提交表單
    //   } else {
    //     console.error("表單未找到，無法提交");
    //   }
    // },

    successCb: ({ data: paymentHtml }) => {
      console.log(paymentHtml);
      window.location.href = paymentHtml;
    },
    errorCb: () => {},
  },

  deleteOrder: {
    optimistic: (ordersInfo) =>
      dispatch(
        removeState({
          storePath: [`orderList`],
          data: ordersInfo,
        })
      ),
    successCb: () => {},
    errorCb: () => dispatch(rollback({ key: `orderList` })),
  },

  getUserProducts: {
    optimistic: () => {},
    successCb: ({ data: productInfo }) =>
      dispatch(setApiData({ key: `productList`, data: productInfo })),
    errorCb: () => {},
  },

  deleteProduct: {
    optimistic: (productId) =>
      dispatch(
        removeState({
          storePath: [`productList`],
          data: productId,
        })
      ),
    successCb: () => {},
    errorCb: () => dispatch(rollback({ key: `productList` })),
  },

  getPendingShipment: {
    optimistic: () => {},
    successCb: ({ data: shipmentInfo }) =>
      dispatch(setApiData({ key: `pendingList`, data: shipmentInfo })),
    errorCb: () => {},
  },

  confirmShipment: {
    optimistic: (shipmentInfo) =>
      dispatch(
        updateState({
          storePath: [`pendingList`],
          data: shipmentInfo,
        })
      ),
    successCb: () => {},
    errorCb: () => dispatch(rollback({ key: `pendingList` })),
  },

  getPurchasedHistory: {
    optimistic: () => {},
    successCb: ({ data: purchaseInfo }) =>
      dispatch(
        setApiData({
          key: `purchasedHistory`,
          data: purchaseInfo,
        })
      ),
    errorCb: () => dispatch(rollback({ key: `purchasedHistory` })),
  },

  getSoldHistory: {
    optimistic: () => {},
    successCb: ({ data }) => dispatch(setApiData({ key: `soldHistory`, data })),
    errorCb: () => dispatch(rollback({ key: `soldHistory` })),
  },

  getProduct: {
    optimistic: () => {},
    successCb: ({ data: productInfo }) =>
      dispatch(setApiData({ key: `singleProduct`, data: productInfo })),
    errorCb: () => {},
  },

  getProductById: {
    optimistic: () => {},
    successCb: ({ data: productInfo }) =>
      dispatch(setApiData({ key: `singleProduct`, data: productInfo })),
    errorCb: () => {},
  },

  postProduct: {
    optimistic: () => {},
    successCb: ({ data: productId }) =>
      navigateTo({ path: `DETAIL`, slug: productId }),
    errorCb: () => {},
  },

  editProduct: {
    optimistic: () => {},
    successCb: ({ data: productId }) =>
      navigateTo({ path: `DETAIL`, slug: productId }),
    errorCb: () => {},
  },
});
