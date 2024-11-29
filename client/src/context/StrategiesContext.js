import React, { createContext, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useCountdown } from "./CountdownContext";
import useNavigation from "../hooks/Common/useNavigation";
import { API_REQ_LOADING_MSG } from "../utils/message";

import {
  setAuth,
  cleanAuth,
  checkAuth,
  setVerifyCode,
  checkVerify,
} from "../redux/slices/authSlice";

import {
  setApiData,
  updateState,
  removeState,
  appendState,
  resetState,
  rollback,
  shareData,
} from "../redux/slices/dataSlice";

import {
  setLoadingNotify,
  setSuccessNotify,
  setErrorNotify,
} from "../redux/slices/commonSlice";

const StrategiesContext = createContext();

export const StrategiesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { startCountdown } = useCountdown();
  const navigateTo = useNavigation();

  const strategies = useMemo(() => {
    return {
      // auth
      setAuth: (userId) => dispatch(setAuth({ userId })),
      cleanAuth: () => dispatch(cleanAuth()),
      checkAuth: (userId) => dispatch(checkAuth({ userId })),
      setVerifyCode: (verifyCode) => dispatch(setVerifyCode({ verifyCode })),
      // cleanVerifyCode放在app.js，每5分監控並清除驗證碼
      checkVerifyCode: (verifyCode) => dispatch(checkVerify({ verifyCode })),
      refreshToken: () => dispatch(setAuth()),

      // data
      setApiData: ({ key, data }) => dispatch(setApiData({ key, data })),
      updateState: ({ storePath, data }) =>
        dispatch(updateState({ storePath, data })),
      removeState: ({ storePath, data }) =>
        dispatch(removeState({ storePath, data })),
      appendState: ({ storePath, data }) =>
        dispatch(appendState({ storePath, data })),
      resetState: ({ key }) => dispatch(resetState({ key })),
      rollback: ({ key }) => dispatch(rollback({ key })),
      shareData: (data) => dispatch(shareData(data)),

      // common
      setLoadingNotify: (actionType) =>
        dispatch(setLoadingNotify(API_REQ_LOADING_MSG[actionType])),
      setSuccessNotify: (message) => dispatch(setSuccessNotify(message)),
      setErrorNotify: (errorMessage) => dispatch(setErrorNotify(errorMessage)),

      // custom hook
      navigateTo: ({ path, slug }) => navigateTo({ path, slug }),
      startCountdown: (seconds) => startCountdown(seconds),

      //
      noop: () => {},
    };
  }, []);

  return (
    <StrategiesContext.Provider value={strategies}>
      {children}
    </StrategiesContext.Provider>
  );
};

export const useStrategies = () => useContext(StrategiesContext);
