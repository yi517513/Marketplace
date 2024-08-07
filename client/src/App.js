import "./styles/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./components/HomeComponent/HomePage";
import RegisterForm from "./components/AuthComponent/RegisterForm";
import LoginForm from "./components/AuthComponent/LoginForm";
import UserCenterPage from "./components/UserCenterComponent/UserCenterPage";
import useRefreshAccessToken from "./hooks/useRefreshAccessToken";
import useVerifyAndRefreshAuth from "./hooks/useVerifyAndRefreshAuth";
import UserProflie from "./components/UserCenterComponent/Profile/UserProfile";
import PublishForm from "./components/UserCenterComponent/Seller/PublishForm";
import ProductDetail from "./components/HomeComponent/ProductDetail";
import ProductManage from "./components/UserCenterComponent/Seller/ProductManage";

function App() {
  useVerifyAndRefreshAuth();
  useRefreshAccessToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userCenter" element={<UserCenterPage />}>
            <Route path="userProfile" element={<UserProflie />} />
            <Route path="publishForm" element={<PublishForm />} />
            <Route path="productManage" element={<ProductManage />} />
          </Route>
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
