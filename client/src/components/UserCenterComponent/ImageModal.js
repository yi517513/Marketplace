import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const [previousImages, setPreviousImages] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        onSelectImage(newImage);
        setPreviousImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {};

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
            {/* map出DB中的賣場 */}

            {previousImages &&
              previousImages.map((preview, index) => (
                <div className="img-block" key={index}>
                  <img src={preview} alt={`Preview ${index}`} />
                  <div className="btn-set">
                    <button onClick={() => onSelectImage(preview)}>選擇</button>
                    <button onClick={() => handleDeleteImage(preview)}>
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
