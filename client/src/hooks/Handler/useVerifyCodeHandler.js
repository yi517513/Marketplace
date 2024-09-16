import { useCallback } from "react";
import useAsyncAction from "../api/useAsyncAction";
import { useLocation } from "react-router-dom";
import useServices from "../map/useServices";
import useCountdown from "../ui/useCountdown";

const useVerifyCodeHandler = () => {
  const location = useLocation();
  let currentPath = location.pathname;

  const { services } = useServices(`VerifyCode`);

  const { asyncAction } = useAsyncAction();
  const { timeLeft, isCounting, setTimeLeft } = useCountdown();

  const handleSubmit = useCallback((email) => {
    asyncAction(
      services.auth,
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
