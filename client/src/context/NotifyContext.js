import React, { createContext, useContext, useCallback } from "react";
import useNotifications from "../hooks/Common/useNotifications";
// import useSetNotfy from "../hooks/Common/useSetNotfy";
import { useDispatch } from "react-redux";
import { setNotification } from "../redux/slices/commonSlice";

export const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
  console.log(`using NotifyProvider`);
  const dispatch = useDispatch();
  useNotifications();

  const setNotify = (message, type) => {
    if (message) {
      dispatch(setNotification({ message, type }));
    }
  };

  return (
    <NotifyContext.Provider value={{ setNotify }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotifyContext = () => useContext(NotifyContext);
