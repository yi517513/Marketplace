import { useState } from "react";

const useImagePreview = (selectedImages) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState(null);

  const previewImage = (e, index) => {
    e.stopPropagation();
    setPreviewImageSrc(selectedImages[index].url);
    setIsPreviewOpen(true);
  };
  return { isPreviewOpen, setIsPreviewOpen, previewImageSrc, previewImage };
};

export default useImagePreview;
