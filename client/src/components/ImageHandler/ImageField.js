import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const ImageField = ({
  setIsModalOpen,
  selectedImages,
  handleDeleteImage,
  previewImage,
}) => {
  return (
    <div className="field-wrapper img-wrapper">
      <label htmlFor="picture">圖檔</label>
      {[0, 1, 2, 3].map((boxIndex) => (
        <div
          key={boxIndex}
          className="image-container"
          onClick={() => {
            console.log("click image-container");
            setIsModalOpen(true);
          }}
        >
          {!selectedImages[boxIndex] && (
            <div className="icon-container">
              <FontAwesomeIcon icon={faPlus} className="faPlus" />
            </div>
          )}
          {selectedImages[boxIndex] && (
            <div className="props-img">
              <div
                className="delete-button"
                onClick={(e) => handleDeleteImage(e, boxIndex)}
              >
                <FontAwesomeIcon icon={faX} className="fax" />
              </div>
              <img
                src={selectedImages[boxIndex].url}
                alt={`Selected ${boxIndex}`}
                onClick={(e) => previewImage(e, boxIndex)}
              />
            </div>
          )}
        </div>
      ))}
      {/* <ErrorMessage name="picture" component="div" className="err-msg" /> */}
    </div>
  );
};

export default ImageField;
