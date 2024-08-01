import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setNotification } from "../redux/slices/authSlice";
import { NOTIFICATION_TYPES } from "../utils/constants";

const useToastNotifications = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.auth);

  useEffect(() => {
    const { visible, message, type } = notification;
    if (visible) {
      // 先隱藏所有 toast
      toast.dismiss();

      // 顯示新 toast
      switch (type) {
        case NOTIFICATION_TYPES.SUCCESS:
          toast.success(message);
          break;
        case NOTIFICATION_TYPES.ERROR:
          toast.error(message);
          break;
        case NOTIFICATION_TYPES.WARN:
          toast.warn(message);
          break;
        default:
          toast.info(message);
      }
      dispatch(setNotification({ visible: false, message: "", type: "" }));
    }
  }, [dispatch, notification]);
};

export default useToastNotifications;
