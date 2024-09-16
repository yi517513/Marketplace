import React from "react";
import useAuthConfig from "../hooks/Config/useAuthConfig";
import AuthForm from "../components/Auth/AuthForm";

const AuthContainer = ({ path }) => {
  const { formType, formTitle, initialValues, validationSchema, handleSubmit } =
    useAuthConfig(path);

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

export default AuthContainer;
