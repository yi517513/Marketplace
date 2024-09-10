import React from "react";

const ImagePreview = ({ setIsPreviewOpen, previewImageSrc }) => {
  return (
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
  );
};

export default ImagePreview;
