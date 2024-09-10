import "./styles/style.css";
import React, { Profiler, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import useRefreshToken from "./hooks/useRefreshToken";
import AppRoutes from "./routes";

function App() {
  const { handleRefreshToken } = useRefreshToken();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userId = localStorage.getItem("userId");
    dispatch(checkAuth({ isAuthenticated, userId }));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) handleRefreshToken();
    }, 3 * 1 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, handleRefreshToken]);

  // 目前在payment相關的只有檢查local.state來決定是否可以進入，以防止從URL直接進入
  const userHasAccess = true;

  return (
    <BrowserRouter>
      <AppRoutes userHasAccess={userHasAccess} />
    </BrowserRouter>
  );
}

export default App;
