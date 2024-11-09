import React from "react";
import { Formik, Form } from "formik";
import VerificationCodeInput from "./VerificationCodeInput";
import InputField from "../UI/InputField";
import { SubmitButton } from "../UI/ButtonHandler";
// import { usePathContext } from "../../context/PathContext";
import useFormikInit from "../../hooks/formik/useFormikInit";
import { CONFIG } from "../../utils/paths";

const AuthForm = () => {
  console.log(`using AuthForm`);
  // const { staticPath } = usePathContext();

  const staticPath = () => {};

  const { formikInit } = useFormikInit(staticPath);
  const { initialValues, validationSchema } = formikInit;
  const isRegister = staticPath === `/register`;
  const config = CONFIG[staticPath] || CONFIG.default;

  return (
    <div className="flex grow justify-center w-full p-4">
      <div className="flex flex-col justify-start mt-8 p-2">
        <h1 className="text-center text-2xl text-dark-gray">{config.title}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ isSubmitting, values, errors }) => (
            <Form className="flex flex-col items-center w-full m-4 p-4 ">
              <div className="flex justify-center w-full p-2">
                <InputField
                  label=" "
                  name="email"
                  type="email"
                  placeholder="請輸入電子郵件"
                />
              </div>
              <div className="flex justify-center w-full p-2">
                <InputField
                  label=" "
                  name="password"
                  type="password"
                  placeholder="請輸入密碼"
                />
              </div>
              <div className="flex justify-center w-full p-2">
                {isRegister && (
                  <VerificationCodeInput email={values.email} errors={errors} />
                )}
              </div>
              <div className="flex justify-center w-full p-2">
                <SubmitButton
                  payload={values}
                  method={config.method}
                  label={config.label}
                  disabled={isSubmitting}
                  className="p-2"
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
