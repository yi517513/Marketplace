import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageModal from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../redux/slices/authSlice";
import ProductService from "../../../services/productService ";
import { useNavigate, useLocation } from "react-router-dom";

const PublishForm = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialImages = location.state?.images?.slice(0, 4) || [];
  const paddedImages = initialImages.concat(
    Array(4 - initialImages.length).fill(null)
  );
  const [selectedImages, setSelectedImages] = useState(paddedImages);

  // console.log(selectedImages);

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
    dispatch(
      setNotification({
        visible: true,
        message: "正在上傳.....",
      })
    );
    try {
      const images = selectedImages.filter((image) => image); // 過濾掉 null 的值
      console.log(images);
      const response = await ProductService.postProduct(
        values.title,
        values.price,
        values.inventory,
        images,
        values.description
      );
      dispatch(
        setNotification({
          visible: true,
          message: "刊登成功",
          type: "success",
        })
      );
      console.log(response.data);
      navigate(`/productDetail/${response.data}`);
    } catch (error) {
      console.error(error);
      dispatch(setNotification({ visible: false }));
      dispatch(
        setNotification({
          visible: true,
          message: error.response.data,
          type: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    dispatch(
      setNotification({
        visible: true,
        message: "正在上傳.....",
      })
    );
    const { title, price, inventory, images, description, productId } = values;
    const imageUrls = selectedImages.filter((image) => image); // 過濾掉 null 的值
    try {
      const response = await ProductService.updateProduct({
        title,
        price,
        inventory,
        images: imageUrls,
        description,
        productId,
      });
      console.log(response.data);
      dispatch(
        setNotification({
          visible: true,
          message: "修改成功!",
          type: "success",
        })
      );
      navigate(`/productDetail/${response.data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
        setIsModalOpen(false);
        return prevImages;
      }
      const newImages = [...prevImages];
      newImages[nextAvailableBox] = image;
      dispatch(
        setNotification({
          visible: true,
          message: "新增圖片成功",
          type: "success",
        })
      );
      return newImages;
    });
  };

  const handleDelete = (e, index) => {
    // 停止 bubbling
    e.stopPropagation();
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  };

  const previewImage = (e, index) => {
    e.stopPropagation();
    setPreviewImageSrc(selectedImages[index].url);
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty || selectedImages.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, selectedImages]);

  return (
    <div className="publish-area">
      <h1>填寫商品詳情</h1>
      <Formik
        initialValues={location.state ? location.state : initialValues}
        validationSchema={validationSchema}
        onSubmit={location.state ? handleUpdate : handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur }) => (
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
                    setIsDirty(true);
                  }}
                  onBlur={handleBlur}
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
                    setIsDirty(true);
                  }}
                  onBlur={handleBlur}
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
                    setIsDirty(true);
                  }}
                  onBlur={handleBlur}
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
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    {!selectedImages[boxIndex] && (
                      <div className="icon-container">
                        <FontAwesomeIcon icon={faPlus} className="faPlus" />
                      </div>
                    )}
                    {selectedImages[boxIndex] && (
                      <div className="props-img">
                        <div
                          className="delete-button"
                          onClick={(e) => handleDelete(e, boxIndex)}
                        >
                          <FontAwesomeIcon icon={faX} className="fax" />
                        </div>
                        <img
                          src={selectedImages[boxIndex].url}
                          alt={`Selected ${boxIndex}`}
                          onClick={(e) => previewImage(e, boxIndex)}
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
                  onChange={(e) => {
                    handleChange(e);
                    setIsDirty(true);
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="err-msg"
                />
              </div>
            </div>
            <div className="btn-set">
              {!location.state && (
                <button type="submit" disabled={isSubmitting}>
                  刊登出售
                </button>
              )}
              {location.state && (
                <button type="submit" disabled={isSubmitting}>
                  修改商品
                </button>
              )}
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
        <div className="preview-modal" onClick={() => setIsPreviewOpen(false)}>
          <div className="close-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setIsPreviewOpen(false)}>
              &times;
            </span>
          </div>
          <div className="preview-content">
            <img src={previewImageSrc} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishForm;
