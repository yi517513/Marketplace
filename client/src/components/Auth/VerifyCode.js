import React from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

const VerifyCode = ({
  email,
  hasError,
  handleSubmit,
  timeLeft,
  isCounting,
}) => {
  return (
    <div className="verify-form">
      <div className="verify-form__input">
        <InputField name="verificationCode" type="text" placeholder="驗證碼" />
      </div>
      <div className="verify-form__button">
        <Button
          onClick={() => handleSubmit(email)}
          label={isCounting ? `${timeLeft}s` : "發送驗證碼"}
          disabled={isCounting || hasError}
        />
      </div>
    </div>
  );
};

export default VerifyCode;
