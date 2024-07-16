import { useState, useEffect } from "react";
import AuthService from "../services/authService";

const useVerificationCode = (email, setErrors) => {
  const [isSendVerify, setIsSendVerify] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleSendVerfyCode = async () => {
    try {
      await AuthService.sendVerifyCode(email);
      window.alert("驗證碼已發送到您的電子郵件");
      setIsSendVerify(true);
      setTimeLeft(60);
    } catch (error) {
      setErrors({ server: error.response.data.errorMessage });
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
