import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import useUiHandlers from "../../hooks/handler/useUiHandlers";
import ImagePreview from "../Modal/ImagePreview";

const ImageField = ({ image }) => {
  console.log(`using ImageField`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { uiHandlers } = useUiHandlers(`ImageField`);
  const { handleDeleteImage } = uiHandlers;

  return (
    <div className="w-full h-32 mr-1 ">
      <div
        className="flex w-full h-full"
        onClick={() => {
          image ? setIsModalOpen(false) : setIsModalOpen(true);
        }}
      >
        {!image && (
          <div className="flex w-full h-full items-center justify-center text-3xl text-gray-300 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-200">
            <FontAwesomeIcon icon={faPlus} className="faPlus" />
          </div>
        )}
        {image && (
          <div className="w-full h-full shadow-lg relative cursor-pointer">
            <div
              className="text-xl text-red-600 absolute top-0 right-0 hover:text-2xl"
              onClick={() => handleDeleteImage({ data: image._id })}
            >
              <FontAwesomeIcon icon={faX} className="fax" />
            </div>
            <img
              src={image.url}
              alt={`Selected `}
              onClick={() => setIsPreviewOpen(true)}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customPath="ImageManager"
      />
      <ImagePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewImageSrc={image}
      />
    </div>
  );
};

export default ImageField;
