import React from "react";
import Button from "../UI/Button";

const ImageManager = ({
  currentImages,
  handleImageUpload,
  handleImageOnSelect,
  handleImageDelete,
}) => {
  return (
    <div className="img-manager-component">
      <div className="image-manager__local">
        <h3 className="image-manager__title">從本機上傳圖片:</h3>
        <div className="image-manager__upload-input">
          <input type="file" onChange={(e) => handleImageUpload(e)} />
        </div>
      </div>

      {/* 圖片區塊 */}
      <div className="image-manager__gallery">
        <div className="image-manager__upload-list">
          {currentImages &&
            currentImages.map((image, index) => (
              <div className="image-manager__item" key={image._id}>
                <img
                  className="image-manager__img"
                  src={image.url}
                  alt={`Preview ${index}`}
                />
                <div className="image-manager__btn-group">
                  <Button
                    label="選擇"
                    className="small-button"
                    onClick={() => handleImageOnSelect(image)}
                  />
                  <Button
                    label="刪除"
                    className="small-button"
                    onClick={() => handleImageDelete(image)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
