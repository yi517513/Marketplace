import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import UserCenterLayout from "./layout/UserCenterLayout";
import HomePage from "./components/Home/HomePage";
import ProductDetail from "./components/Home/ProductDetail";
import PaymentProcessing from "./components/Payment/PaymentProcessing";
import PaymentOptions from "./components/Payment/PaymentOptions";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Forbidden from "./components/Common/Forbidden";
import { ROUTES } from "./utils/paths";
import ProductEditor from "./components/ProductEditor/ProductEditor";
import AuthForm from "./components/Auth/AuthForm";
import ProfileForm from "./components/UserCenter/ProfileForm";
import ModalCenter from "./containers/ModalCenter";
import HistoryItem from "./components/UserCenter/HistoryItem";
import OrderItem from "./components/UserCenter/OrderItem";
import ShipmentItem from "./components/UserCenter/ShipmentItem";
import ProductItem from "./components/UserCenter/ProductItem";
import { createRoute } from "./utils/createRoute";

const AppRoutes = ({ userHasAccess }) => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route index element={<HomePage />} />
      {createRoute({ path: ROUTES.TEST, Component: ModalCenter })}
      {createRoute({ path: ROUTES.REGISTER, Component: AuthForm })}
      {createRoute({ path: ROUTES.LOGIN, Component: AuthForm })}
      <Route path={ROUTES.USER_CENTER} element={<UserCenterLayout />}>
        {createRoute({ path: ROUTES.PROFILE, Component: ProfileForm })}
        {createRoute({ path: ROUTES.CREATE, Component: ProductEditor })}
        {createRoute({
          path: ROUTES.EDIT,
          requiresSlug: true,
          slugKey: "productId",
          Component: ProductEditor,
        })}
        {createRoute({ path: ROUTES.ORDERS, Component: OrderItem })}
        {createRoute({ path: ROUTES.PURCHASED, Component: HistoryItem })}
        {createRoute({ path: ROUTES.SOLD, Component: HistoryItem })}
        {createRoute({ path: ROUTES.PRODUCTS, Component: ProductItem })}
        {createRoute({ path: ROUTES.SHIPMENT, Component: ShipmentItem })}
      </Route>
      {createRoute({
        path: ROUTES.DETAIL,
        requiresSlug: true,
        slugKey: "productId",
        Component: ProductDetail,
      })}
      {createRoute({ path: ROUTES.FORBIDDEN, Component: Forbidden })}
      {createRoute(
        {
          path: ROUTES.PROCESSING,
          requiresSlug: true,
          slugKey: "userId",
          Component: PaymentProcessing,
          isProtected: true,
        },
        userHasAccess
      )}
      {createRoute(
        {
          path: ROUTES.OPTIONS,
          requiresSlug: true,
          slugKey: "userId",
          Component: PaymentOptions,
          isProtected: true,
        },
        userHasAccess
      )}
    </Route>
  </Routes>
);

export default AppRoutes;
