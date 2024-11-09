export const BASE = {
  HOME: "/",
  TEST: "/test",
  FORBIDDEN: "/forbidden",
  // DETAIL: "/product-detail",
  USER_CENTER: "/user-center",
};

export const FORM = {
  REGISTER: `${BASE.HOME}register`,
  LOGIN: `${BASE.HOME}login`,
  PROFILE: `${BASE.USER_CENTER}/profile`,
  CREATE: `${BASE.USER_CENTER}/create-product`,
  // EDIT: `${BASE.USER_CENTER}/edit-product`,
};

export const DASHBOARD = {
  ORDERS: `${BASE.USER_CENTER}/orders`,
  HISTORY: `${BASE.USER_CENTER}/history`,
  PURCHASED: `${BASE.USER_CENTER}/purchased-history`,
  SOLD: `${BASE.USER_CENTER}/sold-history`,
  PRODUCTS: `${BASE.USER_CENTER}/product-management`,
  SHIPMENT: `${BASE.USER_CENTER}/pending-shipment`,
};

export const DYNAMIC_ROUTES = {
  DETAIL: "/product-detail",
  EDIT: `${BASE.USER_CENTER}/edit-product`,
};

export const PAYMENT = {
  OPTIONS: "/payment-options",
  PROCESSING: "/payment-processing",
};

export const ROUTES = {
  ...BASE,
  ...FORM,
  ...DASHBOARD,
  ...PAYMENT,
  ...DYNAMIC_ROUTES,
};

export const PATH_TO_KEY = {
  [ROUTES.HOME]: "allProducts",
  [ROUTES.PROFILE]: "profile",
  [ROUTES.ORDERS]: "userOrders",
  [ROUTES.PRODUCTS]: "userProducts",
  [ROUTES.SHIPMENT]: "pendingShipment",
  [ROUTES.PURCHASED]: "purchasedHistory",
  [ROUTES.SOLD]: "soldHistory",
  ImageManager: "userImages",
  [ROUTES.EDIT]: "productEdit",
  [ROUTES.CREATE]: "productEdit",
};

export const CONFIG = {
  [ROUTES.LOGIN]: { method: "login", label: "登入", title: "登入會員" },
  [ROUTES.REGISTER]: { method: "register", label: "註冊", title: "註冊會員" },
  [ROUTES.CREATE]: { method: "postProduct", label: "刊登出售" },
  [ROUTES.EDIT]: { method: "updateProduct", label: "修改商品" },
  default: { method: "", label: "", title: "頁面" },
};

export const PATH_TO_FETCH = {
  // [ROUTES.HOME]: `getAllProducts`,
  [ROUTES.DETAIL]: `getProduct`,
  [ROUTES.PROFILE]: `getUserData`,
  [ROUTES.ORDERS]: `getUserOrders`,
  [ROUTES.PRODUCTS]: `getUserProducts`,
  [ROUTES.SHIPMENT]: `getPendingShipment`,
  [ROUTES.PURCHASED]: `getPurchaseHistory`,
  [ROUTES.SOLD]: `getSalesHistory`,
  [ROUTES.EDIT]: `getProductById`,
  ImageManager: `getUserImages`,
  default: null,
};
