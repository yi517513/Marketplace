export const BASE = {
  HOME: `/`,
  TEST: `/test`,
  FORBIDDEN: `/forbidden`,
  PRODUCT_DETAILS: `/product-detail`,
  USER_CENTER: `/user-center`,
};

export const FORM = {
  REGISTER: `${BASE.HOME}register`,
  LOGIN: `${BASE.HOME}login`,
  PROFILE: `${BASE.USER_CENTER}/profile`,
  CREATE: `${BASE.USER_CENTER}/create-product`,
  EDIT: `${BASE.USER_CENTER}/edit-product`,
};

export const DASHBOARD = {
  ORDERS: `${BASE.USER_CENTER}/orders`,
  HISTORY: `${BASE.USER_CENTER}/history`,
  PURCHASE_HISTORY: `${BASE.USER_CENTER}/purchase-history`,
  SALES_HISTORY: `${BASE.USER_CENTER}/sales-history`,
  PRODUCTS: `${BASE.USER_CENTER}/product-management`,
  PENDING_SHIPMENT: `${BASE.USER_CENTER}/pending-shipment`,
};

export const PAYMENT = {
  OPTIONS: `/payment-options`,
  PROCESSING: `/payment-processing`,
};

export const PATHS = {
  ...BASE,
  ...FORM,
  ...DASHBOARD,
  ...PAYMENT,
};
