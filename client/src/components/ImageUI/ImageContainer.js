import React from "react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX, faStar } from "@fortawesome/free-solid-svg-icons";
import { ActionButton, SubmitButton } from "../UI/ActionUI";
import { ImagePreview } from "../UI/BaseUI";

export const ImageWithActions = ({
  image,
  hasPrimary = false,
  hasRemove = false,
  hasSelect = false,
  hasDelete = false,
  hasPreview = true,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="flex w-full h-full items-center">
      <div className="flex w-full h-full">
        {image && (
          <div className="flex flex-col items-center justify-center w-full h-full shadow-lg relative cursor-pointer gap-2">
            <div className="absolute top-1 left-1 ">
              {hasPrimary && (
                <ActionButton
                  action="handleSetPrimaryImage"
                  storePath={["singleProduct", "images"]}
                  payload={image}
                  className="btn-circle btn-circle-hover faStar flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faStar} className="text-base" />
                </ActionButton>
              )}
            </div>
            <div className="absolute top-1 right-1 ">
              {hasRemove && (
                <ActionButton
                  action="handleDelete"
                  storePath={["singleProduct", "images"]}
                  payload={image._id}
                  className="btn-circle btn-circle-hover faX"
                >
                  <FontAwesomeIcon icon={faX} className="text-base" />
                </ActionButton>
              )}
            </div>
            <img
              src={image.url}
              alt={`Selected ${image._id}`}
              onClick={() => setIsPreviewOpen(true)}
              className="w-full h-full object-cover overflow-hidden"
            />
            <div className="flex justify-center gap-2">
              {hasSelect && (
                <ActionButton
                  label="選擇"
                  className="py-0.4 px-4 max-w-16"
                  action="handleSelect"
                  payload={image}
                  storePath={["singleProduct", "images"]}
                />
              )}
              {hasDelete && (
                <SubmitButton
                  label="刪除"
                  className="py-0.4 px-4 max-w-16"
                  method="deleteImage"
                  payload={image._id}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {hasPreview && (
        <ImagePreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewImageSrc={image}
        />
      )}
    </div>
  );
};

export const ImageUploadTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full" onClick={() => setIsModalOpen(true)}>
        <div className="flex w-full h-full items-center justify-center text-3xl text-gray-300 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-200">
          <FontAwesomeIcon icon={faPlus} className="faPlus" />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType="ImageManager"
      />
    </div>
  );
};

export const ImageContainer = ({
  image,
  className,
  style,
  hasPrimary,
  hasRemove,
  hasSelect,
  hasDelete,
}) => (
  <div className={className}>
    {image ? (
      <ImageWithActions
        image={image}
        hasPrimary={hasPrimary}
        hasRemove={hasRemove}
        hasSelect={hasSelect}
        hasDelete={hasDelete}
        className={className}
        style={style}
      />
    ) : (
      <ImageUploadTrigger />
    )}
  </div>
);
