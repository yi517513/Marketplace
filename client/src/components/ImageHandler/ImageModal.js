import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useImageModalHandler from "../../hooks/useImageModalHandler";
import NotificationService from "../../services/notificationService";
import { NOTIFICATION_TYPES } from "../../utils/constants";
import { useDispatch } from "react-redux";
const { SUCCESS, WARN } = NOTIFICATION_TYPES;

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const dispatch = useDispatch();
  const { previousImages, handleImageUpload, handleDeleteImage } =
    useImageModalHandler(isOpen);

  console.log("isOpen:", isOpen);

  const handleSelectImage = (image) => {
    onSelectImage(image, (success) => {
      if (success) {
        NotificationService.setToast(dispatch, "新增圖片成功", SUCCESS);
      } else {
        NotificationService.setToast(dispatch, "最多上傳四張圖片", WARN);
        onClose();
      }
    });
  };

  return (
    <div className="Image-Modal">
      <div className="img-wrapper">
        <div className="icon-container" onClick={onClose}>
          <FontAwesomeIcon icon={faX} className="fax" />
        </div>
        <div className="local-img">
          <h3>從本地上傳圖片:</h3>
          <div>
            <input
              type="file"
              onChange={(e) =>
                handleImageUpload(e.target.files[0], onSelectImage)
              }
            />
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
                    <button onClick={() => handleSelectImage(image)}>
                      選擇
                    </button>
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
    </div>
  );
};

export default ImageModal;
