import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";
import SelectField from "../../UI/SelectField";

const ProfileForm = (
  initialValues,
  validationSchema,
  handleSubmit,
  options
) => {
  // const { initialValues, validationSchema } = formikInit;
  // const [userData, setUserData] = useState({
  //   username: "",
  //   email: "",
  //   birthday: "",
  //   gender: "",
  //   phone: "",
  //   address: "",
  // });

  // const validationSchema = Yup.object({
  //   username: Yup.string().required("必填"),
  //   birthday: Yup.date(),
  //   gender: Yup.string().oneOf(["Male", "Female", "Other"]),
  //   phone: Yup.string(),
  //   address: Yup.string(),
  // });

  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  //   try {
  //     const response = await UserService.updateProfile(values);
  //     if (response.status === 200) {
  //       dispatch(
  //         setNotification({
  //           visible: true,
  //           message: "用戶資料更新成功",
  //           type: NOTIFICATION_TYPES.SUCCESS,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setErrors({ server: "更新失敗" });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const response = await UserService.getProfile();

  //       setUserData({
  //         username: response.data.username,
  //         email: response.data.email,
  //         birthday: response.data.birthday,
  //         gender: response.data.gender,
  //         phone: response.data.phone,
  //         address: response.data.address,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserData();
  // }, []);

  return (
    <div className="profile-area">
      <div className="profile-form">
        <h1 className="profile-form__title">修改個人資料</h1>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="profile-form__form">
              <div className="profile-form__field">
                <InputField
                  name="username"
                  type="text"
                  placeholder="請輸入用戶名"
                  label="用戶名"
                />
                {/* <label htmlFor="username">用戶名</label>
              <Field name="username" type="text" placeholder={"請輸入用戶名"} />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              /> */}
              </div>
              <div className="profile-form__field">
                <InputField
                  name="email"
                  type="email"
                  placeholder="請輸入電子信箱"
                  label="電子信箱"
                />
                {/* <label htmlFor="email">電子信箱</label>
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
                /> */}
              </div>
              <div className="profile-form__field">
                <InputField
                  name="birthday"
                  type="date"
                  placeholder="請輸入生日"
                  label="生日"
                />

                {/* <label htmlFor="birthday">生日</label>
                <Field name="birthday" type="date" placeholder={"請輸入生日"} />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="error-message"
                /> */}
              </div>
              <div className="profile-form__field">
                <SelectField
                  name="gender"
                  placeholder="請選擇性別"
                  label="性別"
                  options={options}
                />
                {/* <label htmlFor="gender">性別</label>
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
                /> */}
              </div>
              <div className="profile-form__field">
                <InputField
                  name="phone"
                  type="text"
                  placeholder="請輸入電話"
                  label="電話"
                />
                {/* <label htmlFor="phone">電話</label>
                <Field name="phone" type="text" placeholder={"請輸入電話"} />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-message"
                /> */}
              </div>
              <div className="profile-form__field">
                <InputField
                  name="address"
                  type="text"
                  placeholder="請輸入地址"
                  label="地址"
                />
                {/* <label htmlFor="phone">地址</label>
                <Field name="address" type="text" placeholder={"請輸入地址"} />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error-message"
                /> */}
              </div>

              <div className="profile-form__field">
                <Button type="submit" disabled={isSubmitting} />
              </div>
              {/* <button type="submit" disabled={isSubmitting}>
                提交
              </button> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
