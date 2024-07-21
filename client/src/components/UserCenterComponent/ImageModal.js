import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const [selectedTab, setSelectedTab] = useState("local");
  const [preview, setPreview] = useState(null);
  const [previousImages, setPreviousImages] = useState([]);
  console.log(previousImages.length);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setPreview(reader.result);
        setPreviousImages((prevImages) => [...prevImages, newImage]);
        localStorage.setItem(`img_${fileName}`, JSON.stringify(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = (image) => {
    onSelectImage(image);
    onClose();
  };

  const handleDeleteImage = () => {};

  // 從DB拉取圖片，並暫存
  const previousImages1 = [];

  const test = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("img_"))
      .forEach((key) => {
        let preview = localStorage.getItem(key);
        //   previousImages1.push(preview);
        console.log("push");
      });

    console.log(previousImages);
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
        <div className="local-img">
          {/* <h1>插入圖檔</h1> */}
          <h3>從本地上傳圖片:</h3>
          <div>
            <input
              //   className="select-bt"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="img-set">
          <h3>圖檔集上傳</h3>

          <div className="upload-img">
            {/* map出DB中的賣場 */}

            {previousImages &&
              previousImages.map((preview, index) => (
                <div className="img-block" key={index}>
                  <img src={preview} alt="Preview" />
                  <div className="btn-set">
                    <button onClick={() => handleSelectImage(preview)}>
                      選擇
                    </button>
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

      {/* {selectedTab === "gallery" && (
        <div>
          {previousImages.map((image, index) => (
            <div key={index} onClick={() => handleSelectImage(image)}>
              <img
                src={image}
                alt={`Previous ${index}`}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))}
        </div>
      )} */}
    </Modal>
  );
};

export default ImageModal;
