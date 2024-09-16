import { useCallback } from "react";
import { useDispatch } from "react-redux";
import NotificationService from "../../services/notificationService";
import AuthService from "../../services/authService";
import { NOTIFICATION_TYPES } from "../../utils/constants";
import { logout } from "../../redux/slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const handleRefreshToken = useCallback(async () => {
    try {
      await AuthService.refreshAccessToken();
    } catch (error) {
      const message = error.response.data;
      NotificationService.setToast(dispatch, message, NOTIFICATION_TYPES.ERROR);
      dispatch(logout());
      return false;
    }
  }, [dispatch]);
  return { handleRefreshToken };
};

export default useRefreshToken;
