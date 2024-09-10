import React from "react";
import useAuthConfig from "../hooks/Config/useAuthConfig";
import AuthForm from "../components/Auth/AuthForm";

const AuthFormContainer = () => {
  const { formType, formTitle, initialValues, validationSchema, handleSubmit } =
    useAuthConfig();

  // console.log(handleSubmit);
  return (
    <AuthForm
      formType={formType}
      formTitle={formTitle}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
    />
  );
};

export default AuthFormContainer;
