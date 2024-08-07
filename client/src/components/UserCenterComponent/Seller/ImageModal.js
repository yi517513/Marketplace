import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../redux/slices/authSlice";
import ImageService from "../../../services/imageService";

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const [previousImages, setPreviousImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getImgUrl = async () => {
      setPreviousImages([]);
      try {
        const response = await ImageService.getProductImages();
        const images = response.data.map((image) => image);
        setPreviousImages(images);
      } catch (error) {
        console.log(error);
        dispatch(
          setNotification({
            visible: true,
            message: "無法獲取圖片",
            type: "error",
          })
        );
      }
    };
    if (isOpen) {
      getImgUrl();
    }
  }, [isOpen, dispatch]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(
        setNotification({
          visible: true,
          message: "正在上傳圖片...",
        })
      );
      const formData = new FormData();
      formData.append("image", file); // "image" 是後端路由中預期的字段名稱
      const response = await ImageService.uploadProductImage(formData);
      dispatch(
        setNotification({
          visible: true,
          message: "上傳成功",
          type: "success",
        })
      );
      const image = response.data;

      // 更新 previousImages 狀態
      setPreviousImages((prevImages) => [image, ...prevImages]);
      onSelectImage(image);
      try {
      } catch (error) {
        console.error("上團圖片失敗", error);
        dispatch(
          setNotification({
            visible: true,
            message: "上傳失敗",
            type: "error",
          })
        );
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    dispatch(
      setNotification({
        visible: true,
        message: "正在上傳圖片...",
      })
    );
    try {
      const response = await ImageService.deleteProductImages(imageId);
      if (response.status === 200) {
        setPreviousImages((prevImages) =>
          prevImages.filter((image) => image._id !== imageId)
        );
        dispatch(
          setNotification({
            visible: true,
            message: "成功刪除圖片",
            type: "success",
          })
        );
      } else {
        throw new Error("刪除失敗");
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          visible: true,
          message: "刪除失敗",
          type: "error",
        })
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="image-modal"
      overlayClassName="img-overlay"
      contentLabel="Image Modal"
    >
      <div className="img-wrapper">
        <div className="icon-container" onClick={() => onClose(true)}>
          <FontAwesomeIcon icon={faX} className="fax" />
        </div>
        <div className="local-img">
          <h3>從本地上傳圖片:</h3>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="img-set">
          <h3>圖檔集上傳</h3>

          <div className="upload-img">
            {previousImages &&
              previousImages.map((image, index) => (
                <div className="img-block" key={image._id}>
                  <img src={image.url} alt={`Preview ${index}`} />
                  <div className="btn-set">
                    <button onClick={() => onSelectImage(image)}>選擇</button>
                    <button onClick={() => handleDeleteImage(image._id)}>
                      刪除
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="next-btn">
          <button>下一頁</button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
