import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetNotify } from "../redux/slices/commonSlice";

const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
  const dispatch = useDispatch();
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
          toast.loading(message, { autoClose: 20000 });
      }

      dispatch(resetNotify());
    }
  }, [notification]);

  return <NotifyContext.Provider value={{}}>{children}</NotifyContext.Provider>;
};

export const useNotify = () => useContext(NotifyContext);
