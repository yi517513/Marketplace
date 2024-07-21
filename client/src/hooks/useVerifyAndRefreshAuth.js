import AuthService from "../services/authService";
import {
  checkAuth,
  setLoading,
  setShowReLoginToast,
  setShowDisconnectedToast,
} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useVerifyAndRefreshAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(setLoading(true));
      try {
        await AuthService.verifyAndRefreshAuth();
        dispatch(checkAuth(true));
      } catch (error) {
        if (!error.response) {
          // 伺服器未開啟
          return;
        }
        const { status, data } = error.response;
        if (status === 500) {
          console.log(data);
          return;
        }
        switch (data) {
          case "noLogin":
            return;
          case "refreshTokenExpired":
            dispatch(setShowDisconnectedToast(true));
            break;
          case "accessTokenExpired":
            dispatch(setShowReLoginToast(true));
            break;
          default:
            break;
        }
        dispatch(checkAuth(false));
        await AuthService.logout();
      } finally {
        dispatch(setLoading(false));
      }
    };
    checkAuthStatus();
  }, [dispatch]);
};

export default useVerifyAndRefreshAuth;
