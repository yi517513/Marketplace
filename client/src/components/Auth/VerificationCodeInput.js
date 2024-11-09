import React from "react";
import InputField from "../UI/InputField";
import { SubmitButton } from "../UI/ButtonHandler";
import { useCountdown } from "../../context/CountdownContext";

const VerificationCodeInput = React.memo(({ email, errors }) => {
  console.log(`render VerificationCodeInput`);
  const { timeLeft } = useCountdown();

  const isCounting = timeLeft > 0 ? true : false;
  const hasError = errors.email || errors.password;

  return (
    <div className="flex justify-center items-center">
      <div className="flex" style={{ flexBasis: `40%` }}>
        <InputField name="verificationCode" type="text" placeholder="驗證碼" />
      </div>
      <div className="flex justify-center" style={{ flexBasis: `45%` }}>
        <SubmitButton
          payload={email}
          method="sendVerifyCode"
          label={isCounting ? `${timeLeft}s` : "發送驗證碼"}
          disabled={isCounting || hasError}
          className="py-2 min-w-20"
        />
      </div>
    </div>
  );
});

export default VerificationCodeInput;
