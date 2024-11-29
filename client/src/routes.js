import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import UserCenterLayout from "./layout/UserCenterLayout";
import HomePage from "./components/Home/HomePage";
import OrderItem from "./components/UserCenter/OrderItem";
import ShipmentItem from "./components/UserCenter/ShipmentItem";
import { createRoute } from "./utils/createRoute";

import ProductPage from "./pages/ProductPage";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PurchasedHistory from "./pages/PurchasedHistory";
import SoldHistory from "./pages/SoldHistory";
import ImageManager from "./pages/ImageManager";
import ProductList from "./pages/ProductList";
import Auth from "./pages/Auth";

import { ROUTES } from "./utils/paths";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route index element={<HomePage />} />
      {createRoute({ path: ROUTES.AUTH, Page: Auth })}
      {createRoute({ path: ROUTES.REGISTER, Page: Register })}
      {createRoute({ path: ROUTES.LOGIN, Page: Login })}
      <Route path={ROUTES.USER_CENTER} element={<UserCenterLayout />}>
        {createRoute({ path: ROUTES.PROFILE, Page: Profile })}
        {createRoute({ path: ROUTES.CREATE, Page: CreateProduct })}
        {createRoute({
          path: ROUTES.EDIT,
          requiresSlug: true,
          slug: "productId",
          Page: EditProduct,
        })}
        {createRoute({ path: ROUTES.ORDERS, Page: OrderItem })}
        {createRoute({ path: ROUTES.PURCHASED, Page: PurchasedHistory })}
        {createRoute({ path: ROUTES.SOLD, Page: SoldHistory })}
        {createRoute({ path: ROUTES.PRODUCTS, Page: ProductList })}
        {createRoute({ path: ROUTES.SHIPMENT, Page: ShipmentItem })}
        {createRoute({ path: ROUTES.IMAGE, Page: ImageManager })}
      </Route>
      {createRoute({
        path: ROUTES.DETAIL,
        requiresSlug: true,
        slug: "productId",
        Page: ProductPage,
      })}
    </Route>
  </Routes>
);

export default AppRoutes;
