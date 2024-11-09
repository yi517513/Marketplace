import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  cleanAuth,
  checkAuth,
  setVerifyCode,
  checkVerifyCode,
} from "../../redux/slices/authSlice";
import {
  fetchData,
  updateState,
  removeState,
  appendState,
  resetState,
  rollback,
  shareData,
} from "../../redux/slices/dataSlice";
import useNavigation from "../Common/useNavigation";
import { LOADING_MESSAGE } from "../../utils/constants";
import { useCountdown } from "../../context/CountdownContext";
import { useMemo } from "react";
import { useNotifyContext } from "../../context/NotifyContext";

const useStrategies = () => {
  console.log(`using useStrategies`);
  const storedVerifyCode = useSelector((state) => state.auth.verifyCode);
  const dispatch = useDispatch();
  const { startCountdown } = useCountdown();
  const { setNotify } = useNotifyContext();
  const { navigateTo } = useNavigation();

  const strategyMap = useMemo(() => {
    console.log(`strategyMap is being init`);
    const strategies = {
      // auth
      setAuth: (userId) => dispatch(setAuth({ userId })),
      cleanAuth: () => dispatch(cleanAuth()),
      checkAuth: (userId) => dispatch(checkAuth({ userId })),
      setVerifyCode: (verifyCode) => dispatch(setVerifyCode({ verifyCode })),
      // cleanVerifyCode放在app.js，每5分監控並清除驗證碼
      checkVerifyCode: (verifyCode) => {
        if (verifyCode !== storedVerifyCode) {
          throw new Error("驗證碼錯誤");
        }
      },
      refreshToken: () => dispatch(setAuth()),

      // data
      setApiData: ({ key, data }) => dispatch(fetchData({ key, data })),
      updateState: ({ key, data }) => dispatch(updateState({ key, data })),
      removeState: ({ key, data }) => dispatch(removeState({ key, data })),
      appendState: ({ key, data }) => dispatch(appendState({ key, data })),
      resetState: ({ key, data }) => dispatch(resetState({ key, data })),
      rollback: ({ key }) => dispatch(rollback({ key })),
      shareData: (data) => dispatch(shareData(data)),

      // common
      setLoadingNotify: (actionType) => setNotify(LOADING_MESSAGE[actionType]),
      setSuccessNotify: (message) => setNotify(message, `success`),
      setErrorNotify: (errorMessage) => setNotify(errorMessage, `error`),

      // custom hook
      navigateTo: ({ path, slug }) => navigateTo({ path, slug }),
      startCountdown: (seconds) => startCountdown(seconds),

      //
      noop: () => {},
    };

    return strategies;
  }, []);

  return strategyMap;
};

export default useStrategies;
