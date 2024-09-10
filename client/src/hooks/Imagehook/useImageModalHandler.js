import { useState, useEffect, useCallback } from "react";
import ImageService from "../../services/imageService";
import useCRUD from "../useCRUD";
import NotificationService from "../../services/notificationService";
import { useDispatch } from "react-redux";
import { NOTIFICATION_TYPES } from "../../utils/constants";
import useAsyncAction from "../Common/useAsyncAction";

const { SUCCESS, WARN } = NOTIFICATION_TYPES;

const useImageModalHandler = (isOpen, onClose, onSelectImage) => {
  const dispatch = useDispatch();
  const [previousImages, setPreviousImages] = useState([]);
  const { getData, createData, deleteData } = useCRUD();
  const { asyncAction } = useAsyncAction();

  console.log(isOpen);
  useEffect(() => {
    // if (!isOpen) {
    //   return;
    // }
    setPreviousImages([]);

    console.log("before getData");

    asyncAction(ImageService.getProductImages, {}, {}, (success, data) => {
      if (success) {
        console.log("getData success", data);
        setPreviousImages(data);
      }
    });

    console.log("after getData");
  }, [isOpen]);

  const handleImageUpload = useCallback(
    async (file, onSelectImage) => {
      if (file) {
        const formData = new FormData();
        formData.append("image", file); // "image" 是後端路由中預期的字段名稱
        createData(
          ImageService.uploadProductImage,
          formData,
          (success, image) => {
            if (success) {
              // 更新 previousImages 狀態
              setPreviousImages((prevImages) => [image, ...prevImages]);
              onSelectImage(image, (success) => {
                if (success) {
                  console.log("新增圖片成功");
                }
              });
            }
          }
        );
      }
    },
    [createData]
  );

  const handleDeleteImage = useCallback(
    async (imageId) => {
      deleteData(ImageService.deleteProductImages, imageId, (success) => {
        if (success) {
          setPreviousImages((prevImages) =>
            prevImages.filter((image) => image._id !== imageId)
          );
        }
      });
    },
    [deleteData]
  );

  const handleSelectImage = useCallback(
    (image) => {
      onSelectImage(image, (success) => {
        if (success) {
          NotificationService.setToast(dispatch, "新增圖片成功", SUCCESS);
        } else {
          NotificationService.setToast(dispatch, "最多上傳四張圖片", WARN);
          onClose(false);
        }
      });
    },
    [onSelectImage]
  );

  return {
    previousImages,
    handleImageUpload,
    handleDeleteImage,
    handleSelectImage,
  };
};

export default useImageModalHandler;
