import { useEffect } from "react";
import AuthService from "../services/authService";
import { logout, setShowDisconnectedToast } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const useRefreshAccessToken = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(async () => {
        try {
          await AuthService.refreshAccessToken();
          console.log("refresh Access Token successful");
        } catch (error) {
          await AuthService.logout();
          dispatch(logout());
          dispatch(setShowDisconnectedToast(true));
          console.log("in refresh Hook");
        }
      }, 4 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, dispatch]);
};

export default useRefreshAccessToken;
