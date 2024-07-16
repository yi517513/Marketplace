import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="register-area">
      <h1>會員登入</h1>
      <Formik
        initialValues={{ email: "yee0860104@gmail.com", password: "test123" }}
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
            // 暫用localSorage, 之後研究新方法
            // localStorage.setItem("token", response.data.token);

            // 解析 JWT
            const decodedToken = jwtDecode(
              response.data.token.replace("Bearer ", "")
            );
            console.log("Decoded Token:", decodedToken);
            window.alert("登入成功，即將轉到首頁");
            navigate("/");
          } catch (error) {
            console.error("Login failed:", error);
            setErrors({ server: error.response.data.errorMessage });
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
