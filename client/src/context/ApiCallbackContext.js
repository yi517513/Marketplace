import React, { createContext, useContext, useMemo, useCallback } from "react";
import { apiCallbacks } from "../utils/api/apiCallbacks";
import { useDispatch } from "react-redux";
import { useCountdown } from "./CountdownContext";
import useNavigation from "../hooks/Common/useNavigation";

const ApiCallbackContext = createContext();

const useApiCallbackDependencies = () => {
  const dispatch = useDispatch();
  const { startCountdown } = useCountdown();
  const navigateTo = useNavigation();
  return { dispatch, startCountdown, navigateTo };
};

export const ApiCallbackProvider = ({ children }) => {
  const dependencies = useApiCallbackDependencies();

  const apiCallbackMap = useMemo(
    () => apiCallbacks(dependencies),
    [
      dependencies.dispatch,
      dependencies.navigateTo,
      dependencies.startCountdown,
    ]
  );

  const getApiCallback = useCallback(
    (action) => {
      const callback = apiCallbackMap[action];
      if (!callback) {
        console.warn(
          `[ApiCallbackProvider] Action "${action}" is not defined in apiCallbacks.`
        );
        return {
          optimistic: () => {},
          successCb: () => {},
          errorCb: () => {},
        };
      }
      return callback;
    },
    [apiCallbackMap]
  );

  return (
    <ApiCallbackContext.Provider value={getApiCallback}>
      {children}
    </ApiCallbackContext.Provider>
  );
};

export const useApiCallback = () => useContext(ApiCallbackContext);
