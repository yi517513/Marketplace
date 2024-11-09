import React from "react";

const ImagePreview = ({ isOpen, onClose, previewImageSrc }) => {
  if (!isOpen) return;

  return (
    <div
      className="flex fixed  flex-col inset-0 bg-black bg-opacity-60  z-10"
      onClick={onClose}
    >
      <div
        className="flex w-full h-16 justify-end items-center bg-black bg-opacity-80"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="cursor-pointer text-white text-3xl mx-4"
          onClick={onClose}
        >
          &times;
        </span>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src={previewImageSrc.url}
          alt="Preview"
          className="w-1/2 max-h[1000px] h-auto"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
