import React, { useState, useEffect } from "react";
import useAsyncAction from "../../hooks/Common/useAsyncAction";
import ImageService from "../../services/imageService";
import Button from "../UI/Button";

const ImageManager = ({ isOpen, handlers }) => {
  const [previousImages, setPreviousImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { asyncAction } = useAsyncAction();

  // 放fetch-Data
  const fetchImages = (setPreviousImages) => {
    asyncAction(ImageService.getProductImages, {}, {}, (success, images) => {
      if (success) {
        setPreviousImages(images);
      }
    });
  };

  // 放container或config中
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setLoading(true);
    fetchImages(setPreviousImages);
    setLoading(false);
  }, [isOpen, asyncAction]);

  // 放container
  if (loading) {
    return <div>Loading...</div>;
  }

  // handler - 上傳後callback應要更新Modal的父組件中圖片狀態
  const handleImageUpload = (e) => {
    console.log(e.target.files);
    // 與API交互
  };

  // handler
  const handleImageDelete = (image) => {
    // 與API交互
  };

  // handler - 改變Modal的父組件中圖片狀態
  const handleOnSelect = (image) => {
    // 前端更新
  };

  return (
    <div className="img-manager">
      <div className="image-manager__local">
        <h3 className="image-manager__title">從本機上傳圖片:</h3>
        <div className="image-manager__upload-input">
          <input type="file" onChange={(e) => handleImageUpload(e)} />
        </div>
      </div>

      {/* 圖片區塊 */}
      <div className="image-manager__gallery">
        <div className="image-manager__upload-list">
          {previousImages &&
            previousImages.map((image, index) => (
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
                    onClick={() => handleOnSelect(image)}
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

      {/* 分頁 */}
      <div className="image-manager__next-btn">
        <Button label="上一頁" />
        <Button label="下一頁" />
      </div>
    </div>
  );
};

export default ImageManager;
