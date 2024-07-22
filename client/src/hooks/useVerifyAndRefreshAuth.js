import AuthService from "../services/authService";
import {
  checkAuth,
  setLoading,
  setNotification,
} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NOTIFICATION_TYPES } from "../utils/constants";

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
            dispatch(
              setNotification({
                visible: true,
                message: "未登入",
                type: NOTIFICATION_TYPES.ERROR,
              })
            );
            break;
          case "accessTokenExpired":
            dispatch(
              setNotification({
                visible: true,
                message: "請重新登入",
                type: NOTIFICATION_TYPES.WARN,
              })
            );
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
