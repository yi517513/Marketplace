import "./styles/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./components/HomeComponent/HomePage";
import RegisterForm from "./components/AuthComponent/RegisterForm";
import LoginForm from "./components/AuthComponent/LoginForm";
import UserCenterPage from "./components/UserCenterComponent/UserCenterPage";
import UseRefreshToken from "./hooks/useRefreshToken";
import useCheckAuthStatus from "./hooks/useCheckAuthStatus";

function App() {
  useCheckAuthStatus();
  UseRefreshToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userCenter" element={<UserCenterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
