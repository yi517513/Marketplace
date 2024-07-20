import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserCenterService from "../../services/userCenterService";
import * as Yup from "yup";

const UserData = () => {
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    birthday: "",
    gender: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await UserCenterService.profile();

        setUserData({
          username: response.data.username,
          email: response.data.email,
          birthday: response.data.birthday,
          gender: response.data.gender,
          phone: response.data.phone,
          address: response.data.address,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="profile-area">
      <h1>修改個人資料</h1>
      <Formik
        enableReinitialize={true}
        initialValues={userData}
        validationSchema={Yup.object({
          username: Yup.string().required("必填"),
          birthday: Yup.date(),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]),
          phone: Yup.string(),
          address: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await UserCenterService.updateUserProfile(values);
          } catch (error) {
            console.error("Login failed:", error);
            setErrors({ server: "更新失敗" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="profile-wrapper">
            <div className="field-wrapper">
              <label htmlFor="username">用戶名</label>
              <Field name="username" type="text" placeholder={"請輸入用戶名"} />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper email">
              <label htmlFor="email">電子信箱</label>
              <Field
                readOnly
                name="email"
                type="email"
                placeholder={"請輸入電子郵件"}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="birthday">生日</label>
              <Field name="birthday" type="date" placeholder={"請輸入生日"} />
              <ErrorMessage
                name="birthday"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="gender">性別</label>
              <Field name="gender" as="select" placeholder={"請選擇性別"}>
                <option value="">請選擇性別</option>
                <option value="Male">男</option>
                <option value="Female">女</option>
                <option value="Other">其他</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="phone">電話</label>
              <Field name="phone" type="text" placeholder={"請輸入電話"} />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="phone">地址</label>
              <Field name="address" type="text" placeholder={"請輸入地址"} />
              <ErrorMessage
                name="address"
                component="div"
                className="error-message"
              />
            </div>
            {errors.server && (
              <div className="error-message server">{errors.server}</div>
            )}
            <button type="submit" disabled={isSubmitting}>
              提交
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserData;
