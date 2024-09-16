import useNavigation from "../navigation/useNavigation";
import useAsyncAction from "../api/useAsyncAction";
import AuthService from "../../services/authService";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const useLogoutConfig = (isModalType) => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation();
  const { asyncAction } = useAsyncAction();

  // 登出
  const handleLogout = useCallback(() => {
    asyncAction(AuthService.logout, {}, {}, (success) => {
      if (success) {
        dispatch(logout());
        !isModalType && navigateTo("HOME");
      }
    });
  }, [asyncAction]);

  return handleLogout;
};

export default useLogoutConfig;
