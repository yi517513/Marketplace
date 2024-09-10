import { useState, useEffect } from "react";
import { useCallback } from "react";

const useImageHandler = (initialValues) => {
  const initialImages = initialValues?.images || [];
  const paddedImages = initialImages.concat(
    Array(4 - initialImages.length).fill(null)
  );
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    setSelectedImages(paddedImages);
  }, [initialValues]);

  const handleSelectImage = useCallback((image, callback) => {
    setSelectedImages((prevImages) => {
      const nextAvailableBox = prevImages.findIndex((img) => img === null);
      if (nextAvailableBox === -1) {
        callback(false);
        return prevImages;
      }
      const newImages = [...prevImages];
      newImages[nextAvailableBox] = image;
      callback(true);
      return newImages;
    });
  }, []);

  const handleDeleteImage = useCallback((e, index) => {
    // 停止 bubbling
    e.stopPropagation();
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  }, []);

  return {
    selectedImages,
    handleSelectImage,
    handleDeleteImage,
  };
};

export default useImageHandler;
