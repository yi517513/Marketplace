import React from "react";
import { Formik, Form } from "formik";
import VerifyCodeContainer from "../../containers/VerifyCodeContainer";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

const AuthForm = ({
  formType,
  formTitle,
  initialValues,
  validationSchema,
  handleSubmit,
}) => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-form__title">{formTitle}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, values, errors }) => (
            <Form className="auth-form__form">
              <div className="auth-form__field">
                <InputField
                  name="email"
                  type="email"
                  placeholder="請輸入電子郵件"
                />
              </div>
              <div className="auth-form__field">
                <InputField
                  name="password"
                  type="password"
                  placeholder="請輸入密碼"
                />
              </div>
              <div className="auth-form__field">
                {formType === "Register" ? (
                  <VerifyCodeContainer email={values.email} errors={errors} />
                ) : null}
              </div>
              <div className="auth-form__field">
                <Button
                  type="submit"
                  label={formType === "Register" ? "註冊" : "登入"}
                  disabled={isSubmitting}
                  className={`auth-form__submit`}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
