import React from "react";
import { Formik, Form } from "formik";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import { useConfigContext } from "../../context/ConfigContext";
import withLoading from "../../Hocs/withLoading";

const ProfileForm = ({ original: userData }) => {
  const { apiHandlers, formikInit } = useConfigContext();
  const { validationSchema } = formikInit;
  const { handleUpdateProfile } = apiHandlers;

  return (
    <div className="flex flex-col justify-start items-center h-full w-5/6">
      <div className="flex flex-col h-full min-w-64 w-4/6">
        <h1 className="text-center my-4 text-3xl text-gray-500">
          修改個人資料
        </h1>
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
              </div>
              <div className="flex justify-center p-2 w-full">
                <InputField
                  name="email"
                  type="email"
                  placeholder="請輸入電子信箱"
                  label="電子信箱"
                />
              </div>
              <div className="flex justify-center p-2 w-full">
                <InputField
                  name="birthday"
                  type="date"
                  placeholder="請輸入生日"
                  label="生日"
                />
              </div>
              <div className="flex justify-center p-2 w-full">
                <InputField
                  name="phone"
                  type="text"
                  placeholder="請輸入電話"
                  label="電話"
                />
              </div>
              <div className="flex justify-center p-2 w-full">
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
    </div>
  );
};

const EnhanceProfileForm = () => {
  const { loading, selectedData } = useConfigContext();
  const WrappedProfileForm = withLoading(ProfileForm);

  return <WrappedProfileForm original={selectedData} loading={loading} />;
};

export default EnhanceProfileForm;
