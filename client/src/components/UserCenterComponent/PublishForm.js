import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageModal from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/slices/authSlice";

const PublishForm = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
  ]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectImage = (image) => {
    setSelectedImages((prevImages) => {
      const nextAvailableBox = prevImages.findIndex((img) => img === null);
      if (nextAvailableBox === -1) {
        dispatch(
          setNotification({
            visible: true,
            message: "最多上傳四張圖片",
          })
        );
        return prevImages;
      }
      const newImages = [...prevImages];
      newImages[nextAvailableBox] = image;
      console.log(newImages.length);
      return newImages;
    });
  };

  return (
    <div className="publish-area">
      <h1>填寫商品詳情</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form className="publish-wrapper">
            <div className="publish-form">
              <div className="field-wrapper">
                <label htmlFor="title">商品標題</label>
                <Field name="title" type="text" placeholder="請輸入標題" />
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
                />
                <ErrorMessage
                  name="inventory"
                  component="div"
                  className="err-msg"
                />
              </div>
              <div className="field-wrapper img-wrapper">
                <label htmlFor="picture">圖檔</label>
                {[0, 1, 2, 3].map((boxIndex) => (
                  <div
                    key={boxIndex}
                    className="image-container"
                    onClick={openModal}
                  >
                    {!selectedImages[boxIndex] && (
                      <div className="icon-container">
                        <FontAwesomeIcon icon={faPlus} className="faPlus" />
                      </div>
                    )}
                    {selectedImages[boxIndex] && (
                      <div className="props-img">
                        <div className="delete-button">
                          {boxIndex}
                          <FontAwesomeIcon icon={faX} className="fax" />
                        </div>
                        <img
                          src={selectedImages[boxIndex]}
                          alt={`Selected ${boxIndex}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <ErrorMessage
                  name="picture"
                  component="div"
                  className="err-msg"
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="description">商品詳情</label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder=""
                  className="description"
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
                瀏覽商品
              </button>
              <button type="submit" disabled={isSubmitting}>
                刊登出售
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
    </div>
  );
};

export default PublishForm;
