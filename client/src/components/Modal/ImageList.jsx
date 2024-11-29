import React from "react";
import { FileInput } from "../UI/ActionUI";
import { ImageWithActions } from "../ImageUI/ImageContainer";

const ImageList = ({
  paginatedData: currentImages,
  itemsPerPage,
  hasSelect,
}) => (
  <div className="grid grid-rows-[1fr_9fr] gap-4 h-full">
    <div className="m-1 flex">
      <FileInput
        label="上傳圖片:"
        type="file"
        method="uploadImage"
        className="fileInput"
      />
    </div>

    {/* 圖片區塊 */}

    <div
      className={`grid grid-cols-${itemsPerPage > 4 ? 4 : itemsPerPage} gap-2 `}
    >
      {currentImages &&
        currentImages.map((image) => (
          <div className="shadow-md mx-1 " key={image._id}>
            <ImageWithActions
              key={image._id}
              image={image}
              hasDelete={true}
              hasSelect={hasSelect}
              className="w-full h-full"
            />
          </div>
        ))}
    </div>
  </div>
);

export default ImageList;
