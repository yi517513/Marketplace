import React from "react";
import { InputField } from "../UI/BaseUI";
import { SubmitButton } from "../UI/ActionUI";
import { useCountdown } from "../../context/CountdownContext";

const VerifyInput = React.memo(({ email, errors }) => {
  const { timeLeft } = useCountdown();

  const isCounting = timeLeft > 0 ? true : false;
  const hasError = errors.email || errors.password;

  return (
    <div className="flex justify-between items-center h-12 rwd-text-sm gap-4">
      <InputField
        name="verificationCode"
        type="text"
        placeholder="驗證碼"
        className="border border-gray-400 rounded-2xl max-w-36"
      />
      <SubmitButton
        payload={email}
        method="sendVerifyCode"
        label={isCounting ? `${timeLeft}s` : "發送驗證碼"}
        disabled={isCounting || hasError}
        className="h-full max-w-24"
      />
    </div>
  );
});

export default VerifyInput;
