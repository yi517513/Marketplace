import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsAppOnReady } from "../redux/slices/commonSlice";
import useCheckAuth from "../hooks/auth/useCheckAuth";
import useRefreshToken from "../hooks/auth/useRefreshToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 刷新網頁時，重新配置狀態
  const checkAuth = useCheckAuth();
  // 定時刷新access token
  useRefreshToken(isAuthenticated);

  useEffect(() => {
    const manageAuth = async () => {
      await checkAuth(isAuthenticated, userId);
      dispatch(setIsAppOnReady(false));
    };

    manageAuth();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
