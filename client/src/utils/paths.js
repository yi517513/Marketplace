export const BASE = {
  HOME: "/",
  TEST: "/test",
  FORBIDDEN: "/forbidden",
  // DETAIL: "/product-detail",
  USER_CENTER: "/user-center",
};

export const FORM = {
  AUTH: `${BASE.HOME}auth`,
  LOGIN: `${BASE.HOME}login`,
  REGISTER: `${BASE.HOME}register`,
  PROFILE: `${BASE.USER_CENTER}/profile`,
  CREATE: `${BASE.USER_CENTER}/create-product`,
  EDIT: `${BASE.USER_CENTER}/edit-product`,
};

export const DASHBOARD = {
  ORDERS: `${BASE.USER_CENTER}/orders`,
  HISTORY: `${BASE.USER_CENTER}/history`,
  PURCHASED: `${BASE.USER_CENTER}/purchased-history`,
  SOLD: `${BASE.USER_CENTER}/sold-history`,
  PRODUCTS: `${BASE.USER_CENTER}/product-management`,
  SHIPMENT: `${BASE.USER_CENTER}/pending-shipment`,
  IMAGE: `${BASE.USER_CENTER}/image-manager`,
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
