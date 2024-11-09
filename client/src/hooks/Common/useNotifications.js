import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setNotification } from "../../redux/slices/commonSlice";
// import SocketService from "../../services/socketService";

const useNotifications = () => {
  console.log(`using useNotifications`);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const notification = useSelector((state) => state.common.notification);

  useEffect(() => {
    const { message, type } = notification;
    if (message) {
      toast.dismiss();

      switch (type) {
        case `success`:
          toast.success(message, { autoClose: 3000 });
          break;
        case `error`:
          toast.error(message, { autoClose: 5000 });
          break;
        case `warn`:
          toast.warn(message, { autoClose: 5000 });
          break;
        default:
          toast.info(message, { autoClose: 20000 });
      }

      dispatch(setNotification({ message: "", type: "" }));
    }
  }, [dispatch, notification]);
};

export default useNotifications;
