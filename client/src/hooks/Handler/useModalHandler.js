import useAsyncAction from "../api/useAsyncAction";
import useServices from "../map/useServices";
import useFetchData from "../map/useFetchData";

const useModalHandler = (path, setPreviousImages, setParentImage) => {
  const { asyncAction } = useAsyncAction();
  const { services } = useServices(path);
  const fetchData = useFetchData(path);

  const handleImageUpload = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      asyncAction(
        services.create,
        formData,
        `正在上傳中..`,
        (success, image) => {
          if (success) {
            fetchData(setPreviousImages);
            // setParentImage(image);
          }
        }
      );
    }
  };

  const handleImageDelete = (image) => {
    asyncAction(services.delete, image._id, `正在刪除中..`, (success) => {
      if (success) {
        fetchData(setPreviousImages);
      }
    });
  };

  const handleImageOnSelect = (image) => {
    setParentImage(image);
  };

  const handlerMap = {
    [`ImageManager`]: {
      handleImageUpload,
      handleImageDelete,
      handleImageOnSelect,
    },
  };

  const handlers = handlerMap[path];

  return { handlers };
};

export default useModalHandler;
