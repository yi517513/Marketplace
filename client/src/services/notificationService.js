import { toast } from "react-toastify";
import { NOTIFICATION_TYPES } from "../utils/constants";
import { setNotification } from "../redux/slices/authSlice";

const { SUCCESS, ERROR, WARN, INFO } = NOTIFICATION_TYPES;

class NotificationService {
  showToast(message, type) {
    switch (type) {
      case SUCCESS:
        toast.success(message, { autoClose: 3000 });
        break;
      case ERROR:
        toast.error(message, { autoClose: 5000 });
        break;
      case WARN:
        toast.warn(message, { autoClose: 5000 });
        break;
      default:
        toast.info(message, { autoClose: 20000 });
    }
  }

  setToast(dispatch, message, type = SUCCESS) {
    if (typeof message === "string") {
      dispatch(
        setNotification({
          visible: true,
          message,
          type,
        })
      );
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
