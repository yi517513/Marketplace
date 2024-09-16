import { useEffect } from "react";
import useFetchData from "../map/useFetchData";
import useModalHandler from "../Handler/useModalHandler";

const useManagerConfig = (path, setPreviousImages, setParentImage) => {
  const fetchData = useFetchData(path);
  const { handlers } = useModalHandler(path, setPreviousImages, setParentImage);

  useEffect(() => {
    if (!fetchData) {
      return;
    }
    fetchData(setPreviousImages);
  }, []);

  return { handlers };
};

export default useManagerConfig;
