import React, { useState } from "react";
import ImageManager from "../components/Modal/ImageManager";
import useManagerConfig from "../hooks/Config/useManagerConfig";
import PaginationContainer from "../containers/PaginationContainer";

const ImageManagerContainer = ({ path, setParentImage }) => {
  const [itemsPerPage, setItemsPerPage] = useState(Number(8));
  const [previousImages, setPreviousImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const { handlers } = useManagerConfig(
    path,
    setPreviousImages,
    setParentImage
  );

  return (
    <div className="image-manager-container">
      <ImageManager currentImages={currentImages} {...handlers} />

      <div className="image-manager-pagination">
        <PaginationContainer
          originalData={previousImages}
          setPaginatedData={setCurrentImages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default ImageManagerContainer;
