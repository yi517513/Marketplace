import React from "react";
import Button from "../UI/Button";
import { useConfigContext } from "../../context/ConfigContext";
import { calculateItem_WH } from "../../utils/calc";
import withPagination from "../../Hocs/withPagination";
import withLoading from "../../Hocs/withLoading";
import { useStoreContext } from "../../context/StoreContext";

const ImageManager = ({ paginatedData: currentImages, itemsPerPageCount }) => {
  console.log(`using ImageManager`);
  const { apiHandlers, uiHandlers } = useConfigContext();
  const { handleImageUpload, handleImageDelete } = apiHandlers;
  const { handleImageSelect } = uiHandlers;

  const { itemWidth, itemHeight } = calculateItem_WH(itemsPerPageCount);

  return (
    <div className="flex flex-col h-full w-full p-1">
      <div className="flex h-[8%]">
        <h3 className="m-1 text-xl font-normal text-gray-500">
          從本機上傳圖片:
        </h3>
        <div className="m-1">
          <input
            type="file"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("image", e.target.files[0]);
              console.log(`using handleImageUpload`);
              handleImageUpload(formData);
            }}
            className="file:bg-gray-700 file:text-white file:border-none file:py-2 file:px-4 file:rounded file:cursor-pointer hover:file:bg-gray-500"
          />
        </div>
      </div>

      {/* 圖片區塊 */}
      <div className="flex w-full h-[92%]">
        <div className="flex m-1 flex-wrap">
          {currentImages &&
            currentImages.map((image, index) => (
              <div
                className="flex flex-col justify-center items-center box-border 
                shadow-md m-1 "
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
                key={image._id}
              >
                <img
                  className="w-full h-full object-cover overflow-hidden"
                  src={image.url}
                  alt={`Preview ${index}`}
                />
                <div className="flex gap-2">
                  {handleImageSelect && (
                    <Button
                      label="選擇"
                      className="py-0.4 px-4"
                      onClick={() => handleImageSelect({ data: image })}
                    />
                  )}
                  <Button
                    label="刪除"
                    className="py-0.4 px-4"
                    onClick={() => handleImageDelete(image._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const EnhanceImageManager = () => {
  console.log(`using EnhanceImageManager`);
  // const { loading, selectedData } = useConfigContext();

  const { loading, selectedData } = useStoreContext();
  const PaginatedImageManager = withPagination(ImageManager);
  const LoadedImagemanger = withLoading(PaginatedImageManager);

  return <LoadedImagemanger originalData={selectedData} laading={loading} />;
};

export default EnhanceImageManager;
