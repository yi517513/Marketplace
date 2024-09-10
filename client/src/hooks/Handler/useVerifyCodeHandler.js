import { useCallback } from "react";
import useAsyncAction from "../Common/useAsyncAction";
import { useLocation } from "react-router-dom";
import useRouteServices from "../service/useRouteServices";
import useCountdown from "../Common/useCountdown";

const useVerifyCodeHandler = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { services } = useRouteServices(currentPath);

  const { asyncAction } = useAsyncAction();
  const { timeLeft, isCounting, setTimeLeft } = useCountdown();

  const handleSubmit = useCallback((email) => {
    asyncAction(
      services.update,
      email,
      "正在發送驗證碼..",
      (success, verifyCode) => {
        if (success) {
          console.log("驗證碼為:", verifyCode);
          setTimeLeft(60);
        }
      }
    );
  });

  return { timeLeft, isCounting, handleSubmit };
};

export default useVerifyCodeHandler;
