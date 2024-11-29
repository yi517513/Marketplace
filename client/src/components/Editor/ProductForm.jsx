import React from "react";
import { Formik, Form } from "formik";
import { InputField, TextareaField } from "../UI/BaseUI";
import { SubmitButton } from "../UI/ActionUI";
import ImageField from "../ImageUI/ImageField";

const ProductForm = ({ initialValues, validationSchema, method, label }) => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="grid grid-rows-[auto 1fr] w-full h-5/6">
      <header className="flex justify-center items-center">
        <h1 className="text-2xl text-dark-gray ">填寫商品詳情</h1>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <Form className="flex flex-col items-center w-full h-full gap-8">
            <div className="flex flex-col w-full h-full md:max-w-[700px] gap-6 rwd-text-lg ">
              <InputField
                label="名稱"
                name="title"
                type="text"
                placeholder="請輸入商品名稱"
                className="justify-between"
              />
              <InputField
                label="價格"
                name="price"
                type="text"
                className="justify-between"
              />
              <InputField
                label="庫存"
                name="inventory"
                type="number"
                placeholder="1-99"
                className="justify-between"
              />
              <ImageField
                name="images"
                label="圖檔"
                fieldCount={4}
                errors={errors.images}
                setFieldValue={setFieldValue}
                className="w-full h-full min-h-20 md:min-h-28 lg:min-h-30"
              />
              <TextareaField label="詳情" name="description" maxLength={150} />
            </div>

            <div className="w-36">
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

export default ProductForm;
