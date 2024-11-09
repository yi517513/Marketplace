import React from "react";
import { Formik, Form } from "formik";
import InputField from "../UI/InputField";
import TextareaField from "../UI/TextareaField";
import { useParams } from "react-router-dom";
import EnhanceImageField from "./ImageField";
import withSlug from "../../Hocs/withSlug";
import { SubmitButton } from "../UI/ButtonHandler";
// import { usePathContext } from "../../context/PathContext";
import useFormikInit from "../../hooks/formik/useFormikInit";
import { CONFIG } from "../../utils/paths";

const ProductEditor = ({ originalData: productInfo }) => {
  console.log(`render ProductEditor`);
  // const { staticPath } = usePathContext();
  const staticPath = () => {};
  const { formikInit } = useFormikInit(staticPath);
  const { initialValues, validationSchema } = formikInit;

  const config = CONFIG[staticPath] || CONFIG.default;

  return (
    <div className="flex flex-col h-full w-full max-w-3xl">
      <h1 className="mt-4 text-center text-2xl text-dark-gray">填寫商品詳情</h1>
      <Formik
        initialValues={productInfo || initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-wrap flex-col items-center justify-start h-full">
            <div className="flex w-full flex-col my-2">
              <InputField
                label="名稱"
                name="title"
                type="text"
                placeholder="請輸入商品名稱"
              />
            </div>
            <div className="flex w-full flex-col my-2">
              <InputField label="價格" name="price" type="text" />
            </div>

            <div className="flex w-full flex-col my-2">
              <InputField
                label="庫存"
                name="inventory"
                type="number"
                placeholder="1-99"
              />
            </div>

            <div className="flex w-full flex-row items-center justify-center my-2">
              <label
                htmlFor="picture"
                className="text-center"
                style={{ flexBasis: `12.5%` }}
              >
                圖檔
              </label>
              <div className="flex " style={{ flexBasis: `75%` }}>
                {[0, 1, 2, 3].map((boxIndex) => (
                  <EnhanceImageField
                    key={boxIndex}
                    image={productInfo?.images[boxIndex]}
                  />
                ))}
              </div>
              <div style={{ flexBasis: `12.5%` }}></div>
            </div>
            <div className="flex w-full flex-col my-2">
              <TextareaField label="詳情" name="description" />
            </div>

            <div className="flex w-full flex-col my-2 items-center">
              <SubmitButton
                method={config.method}
                label={config.label}
                disabled={isSubmitting}
                className="my-2 p-2"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const EnhanceProductEditor = () => {
  console.log(`render EnhanceProductEditor`);
  const { productId } = useParams();

  const WrappedEditor = withSlug(ProductEditor);

  if (!productId) {
    return <ProductEditor />;
  }

  return <WrappedEditor slug={productId} />;
};

export default EnhanceProductEditor;
