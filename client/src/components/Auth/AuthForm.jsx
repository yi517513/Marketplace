import React from "react";
import { Formik, Form } from "formik";
import VerifyInput from "./VerifyInput";
import { InputField } from "../UI/BaseUI";
import { SubmitButton } from "../UI/ActionUI";

const AuthForm = ({
  isRegister,
  initialValues,
  validationSchema,
  title,
  method,
  label,
}) => (
  <div className="w-full h-full grid grid-rows-[1fr_2fr_1fr]">
    <header className="flex justify-center items-center">
      <h1 className="text-2xl text-dark-gray">{title}</h1>
    </header>
    <div className="w-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, errors }) => (
          <Form className="flex flex-col justify-between w-5/6 max-w-96 h-64 md:h-72">
            <div className="flex flex-col h-28 md:h-36 w-full gap-6 rwd-text-lg ">
              <InputField
                name="email"
                type="email"
                placeholder="請輸入電子郵件"
              />
              <InputField
                name="password"
                type="password"
                placeholder="請輸入密碼"
              />
            </div>
            {isRegister && <VerifyInput email={values.email} errors={errors} />}

            <div className="w-full">
              <SubmitButton
                payload={values}
                method={method}
                label={label}
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="p-2"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default AuthForm;
