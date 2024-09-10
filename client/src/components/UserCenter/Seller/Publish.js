import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ImageModal from "./ImageModal";
import useImageHandler from "../../../hooks/Imagehook/useImageHandler";
import ImageField from "../../ImageHandler/ImageField";
import ImagePreview from "../../ImageHandler/ImagePreview";
import useImagePreview from "../../../hooks/Imagehook/useImagePreview";

const Publish = ({ initialValues, validationSchema, handleSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedImages, handleSelectImage, handleDeleteImage } =
    useImageHandler(initialValues);

  const { isPreviewOpen, setIsPreviewOpen, previewImageSrc, previewImage } =
    useImagePreview(selectedImages);

  console.log("Publish rendered");

  return (
    <div className="publish-area">
      {/* <button onClick={() => setIsModalOpen(true)}>測試</button> */}
      <h1>填寫商品詳情</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          handleSubmit({ ...values, images: selectedImages }, actions)
        }
        enableReinitialize={true}
      >
        {({ isSubmitting, handleChange }) => (
          <Form className="publish-wrapper">
            <div className="publish-form">
              <div className="field-wrapper">
                <label htmlFor="title">商品標題</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="請輸入標題"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="err-msg"
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="price">價格</label>
                <Field
                  name="price"
                  type="text"
                  placeholder=" "
                  className="price"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="err-msg"
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="inventory">庫存</label>
                <Field
                  name="inventory"
                  type="number"
                  placeholder="1-99"
                  className="inventory"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  name="inventory"
                  component="div"
                  className="err-msg"
                />
              </div>
              <ImageField
                setIsModalOpen={setIsModalOpen}
                selectedImages={selectedImages}
                handleDeleteImage={handleDeleteImage}
                previewImage={previewImage}
              />
              <div className="field-wrapper">
                <label htmlFor="description">商品詳情</label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder=""
                  className="description"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="err-msg"
                />
              </div>
            </div>
            <div className="btn-set">
              <button type="submit" disabled={isSubmitting}>
                {initialValues ? "修改商品" : "刊登出售"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
      />

      {isPreviewOpen && (
        <ImagePreview
          setIsPreviewOpen={setIsPreviewOpen}
          previewImageSrc={previewImageSrc}
        />
      )}
    </div>
  );
};

export default Publish;
