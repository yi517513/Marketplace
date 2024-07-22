import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import VerifyCode from "../AuthComponent/VerifyCode";
import { setNotification } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { NOTIFICATION_TYPES } from "../../utils/constants";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "yee0860104@gmail.com",
    password: "test123",
    verificationCode: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("無效的電子郵件").required("必填"),
    password: Yup.string().required("必填"),
    verificationCode: Yup.string().required("必填"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await AuthService.register(
        values.email,
        values.password,
        values.verificationCode
      );
      dispatch(
        setNotification({
          visible: true,
          message: "註冊成功，轉跳登入頁面",
          type: NOTIFICATION_TYPES.SUCCESS,
        })
      );
      navigate("/login");
    } catch (error) {
      console.log("Register failed", error);
      setErrors({ server: error.response.data });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-area">
      <div className="auth-component">
        <h1>會員註冊</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, setErrors }) => (
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
              <VerifyCode email={values.email} setErrors={setErrors} />
              <button type="submit" disabled={isSubmitting}>
                註冊
              </button>
              {errors.server && (
                <div className="error-message server">{errors.server}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
