import { useState, useEffect } from "react";
import AuthService from "../services/authService";
import { setNotification } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useVerificationCode = (email, setErrors) => {
  const [isSendVerify, setIsSendVerify] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const dispatch = useDispatch();

  const handleSendVerfyCode = async () => {
    try {
      await AuthService.sendVerifyCode(email);
      dispatch(
        setNotification({
          visible: true,
          message: "驗證碼已發送至信箱",
          type: "success",
        })
      );
      setIsSendVerify(true);
      setTimeLeft(60);
    } catch (error) {
      setErrors({ server: error.response.data });
      console.log("Failed to send verification code", error);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsSendVerify(false);
    }
  }, [timeLeft]);

  return { isSendVerify, timeLeft, handleSendVerfyCode };
};

export default useVerificationCode;
