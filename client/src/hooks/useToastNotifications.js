import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setShowLoginToast,
  setShowDisconnectedToast,
  setShowReLoginToast,
} from "../redux/slices/authSlice";

const useToastNotifications = () => {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    showDisconnectedToast,
    showLoginToast,
    showReLoginToast,
  } = useSelector((state) => state.auth);
  const shownToasts = useRef({
    login: false,
    disconnected: false,
    reLogin: false,
  });

  useEffect(() => {
    if (isAuthenticated && showLoginToast) {
      toast.success("你已成功登入");
      dispatch(setShowLoginToast(false));
      shownToasts.current.login = true;
    }
    if (!isAuthenticated && showDisconnectedToast) {
      toast.error("未登入");
      dispatch(setShowDisconnectedToast(false));
      shownToasts.current.disconnected = true;
    }
    if (!isAuthenticated && showReLoginToast) {
      toast.warn("請重新登入");
      dispatch(setShowReLoginToast(false));
      shownToasts.current.reLogin = true;
    }
  }, [
    dispatch,
    isAuthenticated,
    showLoginToast,
    showDisconnectedToast,
    showReLoginToast,
  ]);
};

export default useToastNotifications;
