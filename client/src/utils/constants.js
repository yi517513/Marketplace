import { ROUTES } from "./paths";

export const REFRESH_INTERVAL = 3000;

export const MENU_CONFIG_MD = {
  buyer: [{ path: ROUTES.ORDERS, label: "訂單管理" }],
  seller: [
    { path: ROUTES.CREATE, label: "刊登出售" },
    { path: ROUTES.PRODUCTS, label: "賣場管理" },
    { path: ROUTES.SHIPMENT, label: "等待發貨" },
  ],
  profile: [
    { path: ROUTES.PROFILE, label: "用戶資料" },
    { path: ROUTES.IMAGE, label: "圖片管理" },
    { path: ROUTES.PURCHASED, label: "購買紀錄" },
    { path: ROUTES.SOLD, label: "出售紀錄" },
  ],
};

export const MENU_CONFIG_SM = [
  { path: ROUTES.ORDERS, label: "訂單管理" },
  { path: ROUTES.CREATE, label: "刊登出售" },
  { path: ROUTES.PRODUCTS, label: "賣場管理" },
  { path: ROUTES.SHIPMENT, label: "等待發貨" },
  { path: ROUTES.PROFILE, label: "用戶資料" },
  { path: ROUTES.IMAGE, label: "圖片管理" },
  { path: ROUTES.PURCHASED, label: "購買紀錄" },
  { path: ROUTES.SOLD, label: "出售紀錄" },
];
