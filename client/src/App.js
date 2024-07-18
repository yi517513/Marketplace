import "./styles/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import UserCenterComponent from "./components/UserCenterComponent";
import UseRefreshToken from "./hooks/useRefreshToken";
import useCheckAuthStatus from "./hooks/useCheckAuthStatus";

function App() {
  useCheckAuthStatus();
  UseRefreshToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/userCenter" element={<UserCenterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
