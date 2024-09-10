import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setNotification } from "../../redux/slices/authSlice";
import NotificationService from "../../services/notificationService";
import SocketService from "../../services/socketService";

const useNotifications = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { notification } = useSelector((state) => state.auth);

  useEffect(() => {
    SocketService.onMessage((data) => {
      const message = data.message;
      NotificationService.setToast(dispatch, message);
    });
  }, [userId, dispatch]);

  useEffect(() => {
    const { visible, message, type } = notification;
    if (visible) {
      // 先隱藏所有 toast
      toast.dismiss();
      NotificationService.showToast(message, type);
      dispatch(setNotification({ visible: false, message: "", type: "" }));
    }
  }, [dispatch, notification]);
};

export default useNotifications;
