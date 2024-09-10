import useAsyncAction from "../Common/useAsyncAction";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useNavigation from "../useNavigation";
import { login, logout } from "../../redux/slices/authSlice";
import SocketService from "../../services/socketService";
import AuthService from "../../services/authService";
import { PATHS } from "../../utils/paths";

const useAuth = () => {
  const dispatch = useDispatch();
  const { asyncAction } = useAsyncAction();
  const { navigateTo } = useNavigation();

  // const handleRegister = useCallback(
  //   (registerVariables, callback) => {
  //     asyncAction(
  //       AuthService.register,
  //       registerVariables,
  //       "正在註冊...",
  //       (success, data) => {
  //         navigateTo(PATHS.LOGIN);
  //         callback(true);
  //       }
  //     );
  //   },
  //   [asyncAction]
  // );

  // const handleLogin = useCallback(
  //   (loginVariables, callback) => {
  //     asyncAction(AuthService.login, loginVariables, "正在登入..", (data) => {
  //       dispatch(login(data.userId));
  //       // 加入房間
  //       SocketService.connect("http://localhost:8080", data.userId);
  //       if (typeof productId === "string") {
  //         navigateTo(`${PATHS.PRODUCT_DETAILS}/${productId}`);
  //       } else {
  //         navigateTo(PATHS.HOME);
  //       }
  //       callback(true, data.resourceId);
  //     });
  //   },
  //   [asyncAction, dispatch]
  // );

  const handleLogout = useCallback(() => {
    asyncAction(AuthService.logout, {}, "正在登出..", (data) => {
      dispatch(logout());
      SocketService.disconnect();
    });
  }, [asyncAction, dispatch]);

  // const sendVerifyCode = useCallback(
  //   (email, callback) => {
  //     asyncAction(
  //       AuthService.sendVerifyCode,
  //       email,
  //       "正在發送驗證碼..",
  //       (data) => {
  //         callback(true);
  //       }
  //     );
  //   },
  //   [asyncAction]
  // );
  return { handleLogout };
};

export default useAuth;
