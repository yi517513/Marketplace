import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageModal from "./ImageModal";

const PublishForm = () => {
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const initialValues = {
    title: "",
    price: "",
    inventory: "",
    picture: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("必填"),
    price: Yup.string().required("必填"),
    inventory: Yup.number().required("必填"),
    description: Yup.string().required("必填"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // upload server
    } catch (error) {
      setErrors({ server: error.response.data });
    } finally {
      setSubmitting(false);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // navigate("/login");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    // console.log(event);
    // const file = event.target;
  };

  return (
    <div className="publish-area">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form className="publish-wrapper">
            <div className="field-wrapper">
              <label htmlFor="title">商品標題</label>
              <Field name="title" type="text" placeholder="請輸入標題" />
              <ErrorMessage name="title" className="err-msg" />
            </div>
            <div className="field-wrapper">
              <label htmlFor="price">價格</label>
              <Field name="price" type="text" placeholder=" " />
              <ErrorMessage name="price" className="err-msg" />
            </div>
            <div className="field-wrapper">
              <label htmlFor="inventory">庫存</label>
              <Field name="inventory" type="number" placeholder="1-999" />
              <ErrorMessage name="inventory" className="err-msg" />
            </div>
            <div className="field-wrapper">
              <label htmlFor="picture">圖檔</label>
              <button onClick={() => setIsModalOpen(true)}>+</button>
              <ErrorMessage name="picture" className="err-msg" />
            </div>
            <div className="field-wrapper">
              <label htmlFor="description">商品詳情</label>
              <Field name="description" type="text" placeholder="" />
              <ErrorMessage name="description" className="err-msg" />
            </div>
          </Form>
        )}
      </Formik>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={(image) => setSelectedImage(image)}
      />
      {selectedImage && (
        <div>
          <h3>已選擇的圖片:</h3>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default PublishForm;
