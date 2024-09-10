import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useImageModalHandler from "../../../hooks/Imagehook/useImageModalHandler";

const ImageModal1 = ({ isOpen, onClose, onSelectImage }) => {
  const {
    handleFileChange,
    handleDeleteImage,
    previousImages,
    handleSelectImage,
  } = useImageModalHandler(isOpen, onClose, onSelectImage);

  console.log("ImageModal rendered");

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
    </Modal>
  );
};

export default ImageModal1;
