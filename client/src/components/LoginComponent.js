import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/authService";

const LoginComponent = () => {
  return (
    <div className="register-area">
      <h1>會員登入</h1>
      <Formik
        initialValues={{ email: "test123@gmail.com", password: "test123" }}
        validationSchema={Yup.object({
          email: Yup.string().email("無效的電子郵件").required("必填"),
          password: Yup.string().required("必填"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await AuthService.login(
              values.email,
              values.password
            );
            console.log("Login success:", response.data);
            // 暫用localSorage, 之後研究新方法
            localStorage.setItem("token", response.data.token);
          } catch (error) {
            console.error("Login failed:", error);
            setErrors({ server: "登入失敗，請檢查您的電子郵件和密碼。" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register">
            <div className="field-wrapper">
              <Field name="email" type="email" placeholder="請輸入電子郵件" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <Field name="password" type="password" placeholder="請輸入密碼" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            {errors.server && (
              <div className="error-message server">{errors.server}</div>
            )}
            <button type="submit" disabled={isSubmitting}>
              登入
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginComponent;
