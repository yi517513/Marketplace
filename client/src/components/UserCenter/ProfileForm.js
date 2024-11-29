import React from "react";
import { Formik, Form } from "formik";
import { Button, InputField } from "../UI/BaseUI";

const ProfileForm = ({ userData }) => {
  const handleUpdateProfile = () => {};
  const validationSchema = () => {};

  return (
    <section className="grid grid-rows-[1fr_10fr] w-full h-[80vh]">
      <header className="flex justify-center items-center">
        <h1 className="text-2xl text-dark-gray ">修改個人資料</h1>
      </header>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center gap-4">
              <div className="flex justify-center p-2 w-full">
                <InputField
                  name="username"
                  type="text"
                  placeholder="請輸入用戶名"
                  label="用戶名"
                />
                <InputField
                  name="email"
                  type="email"
                  placeholder="請輸入電子信箱"
                  label="電子信箱"
                />
                <InputField
                  name="birthday"
                  type="date"
                  placeholder="請輸入生日"
                  label="生日"
                />
                <InputField
                  name="phone"
                  type="text"
                  placeholder="請輸入電話"
                  label="電話"
                />
                <InputField
                  name="address"
                  type="text"
                  placeholder="請輸入地址"
                  label="地址"
                />
              </div>

              <div className="flex justify-center p-2  w-full">
                <Button
                  label="提交"
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ProfileForm;
