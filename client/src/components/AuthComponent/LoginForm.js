import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { login, setShowLoginToast } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="auth-area">
      <div className="auth-component">
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
              if (response.status === 200) dispatch(login());
              dispatch(setShowLoginToast(true));
              navigate("/");
            } catch (error) {
              console.error("Login failed:", error);
              setErrors({ server: error.response.data });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="register">
              <div className="field-wrapper">
                <Field
                  name="email"
                  type="email"
                  placeholder="請輸入電子郵件"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="field-wrapper">
                <Field
                  name="password"
                  type="password"
                  placeholder="請輸入密碼"
                  autoComplete="current-password"
                />
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
    </div>
  );
};

export default LoginForm;
