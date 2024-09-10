import React from "react";
import VerifyCode from "../components/Auth/VerifyCode";
import useVerifyCodeHandler from "../hooks/Handler/useVerifyCodeHandler";

const VerifyCodeContainer = ({ email, errors }) => {
  const { timeLeft, isCounting, handleSubmit } = useVerifyCodeHandler();

  const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
  };

  const hasValidationErrors = hasErrors(errors);

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
