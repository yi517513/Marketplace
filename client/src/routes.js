import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import UserCenterLayout from "./layout/UserCenterLayout";
import HomePage from "./components/Home/HomePage";
import ProductDetail from "./components/Home/ProductDetail";
import PaymentProcessing from "./components/Payment/PaymentProcessing";
import PaymentOptions from "./components/Payment/PaymentOptions";
import Dashboard from "./containers/Dashboard";
import Form from "./containers/Form";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Forbidden from "./components/Common/Forbidden";
import { PATHS } from "./utils/paths";
import Publish from "./components/UserCenter/Seller/Publish";
import AuthContainer from "./containers/AuthContainer";
import ProfileContainer from "./containers/ProfileContainer";

import Modal from "./components/Modal/Modal";
import ModalContainer from "./containers/ModalContainer";

const AppRoutes = ({ userHasAccess }) => (
  <Routes>
    <Route path={PATHS.HOME} element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={PATHS.TEST} element={<ModalContainer />} />
      <Route path={PATHS.REGISTER} element={<AuthContainer />} />
      <Route path={PATHS.LOGIN} element={<AuthContainer />} />
      <Route path={PATHS.USER_CENTER} element={<UserCenterLayout />}>
        <Route index element={<Dashboard />} />

        <Route path={PATHS.PROFILE} element={<ProfileContainer />} />
        <Route path={PATHS.CREATE} element={<Publish />} />
        <Route path={`${PATHS.EDIT}/:productId`} element={<Form />} />
        <Route path={PATHS.ORDERS} element={<Dashboard />} />
        <Route path={PATHS.PURCHASE_HISTORY} element={<Dashboard />} />
        <Route path={PATHS.PRODUCTS} element={<Dashboard />} />
        <Route path={PATHS.PENDING_SHIPMENT} element={<Dashboard />} />
        <Route path={PATHS.SALES_HISTORY} element={<Dashboard />} />
      </Route>
      <Route
        path={`${PATHS.PRODUCT_DETAILS}/:productId`}
        element={<ProductDetail />}
      />
      <Route path={PATHS.FORBIDDEN} element={<Forbidden />} />
      <Route
        path={`${PATHS.PROCESSING}/:userId`}
        element={
          <ProtectedRoute isAllowed={{ userHasAccess }}>
            <PaymentProcessing />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${PATHS.OPTIONS}/:userId`}
        element={
          <ProtectedRoute isAllowed={userHasAccess}>
            <PaymentOptions />
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
