import React from "react";
import { Field, ErrorMessage } from "formik";
import useSendVerificationCode from "../../hooks/useSendVerificationCode";

const VerifyCode = ({ email, setErrors }) => {
  const { isSendVerify, timeLeft, handleSendVerfyCode } =
    useSendVerificationCode(email, setErrors);

  return (
    <div className="verify-area">
      <Field name="verificationCode" placeholder="驗證碼" />
      <ErrorMessage
        name="verificationCode"
        component="div"
        className="error-message"
      />
      {!isSendVerify && (
        <button type="button" onClick={() => handleSendVerfyCode()}>
          發送驗證碼
        </button>
      )}
      {isSendVerify && <button disabled>{`${timeLeft}s`}</button>}
    </div>
  );
};

export default VerifyCode;
