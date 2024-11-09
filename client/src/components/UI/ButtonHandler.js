import React, { useCallback } from "react";
import Button from "./Button";
import useUiHandler from "../../hooks/handler/useUiHandler";
import useApiHandler from "../../hooks/api/useApiHandler";

export const NavigateButton = ({ path, slug, ...props }) => {
  const navigateTo = useUiHandler(`navigateTo`);
  return <Button onClick={() => navigateTo({ path, slug })} {...props} />;
};

export const SubmitButton = React.memo(({ payload, method, ...props }) => {
  const handleLogin = useApiHandler(method);

  return <Button onClick={() => handleLogin(payload)} {...props} />;
});

export const SendVerifyButton = React.memo(({ payload, ...props }) => {
  console.log(`render SendVerifyButton`);
  const handleSendVerifyCode = useApiHandler(`sendVerifyCode`);

  return <Button onClick={() => handleSendVerifyCode(payload)} {...props} />;
});

export const LoginButton = React.memo(({ payload, ...props }) => {
  console.log(`render LoginButton`);
  const handleLogin = useApiHandler(`login`);

  return <Button onClick={() => handleLogin(payload)} {...props} />;
});

export const RegisterButton = React.memo(({ payload, ...props }) => {
  console.log(`render LoginButton`);
  const handleLogin = useApiHandler(`register`);

  return <Button onClick={() => handleLogin(payload)} {...props} />;
});
