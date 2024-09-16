import React from "react";
import VerifyCode from "../components/Auth/VerifyCode";
import useVerifyCodeHandler from "../hooks/Handler/useVerifyCodeHandler";

const VerifyCodeContainer = ({ email, errors }) => {
  const { timeLeft, isCounting, handleSubmit } = useVerifyCodeHandler();

  const { email: emailError, password: passwordError } = errors;

  const hasValidationErrors = emailError || passwordError;

  return (
    <VerifyCode
      email={email}
      hasError={hasValidationErrors}
      handleSubmit={handleSubmit}
      timeLeft={timeLeft}
      isCounting={isCounting}
    />
  );
};

export default VerifyCodeContainer;
