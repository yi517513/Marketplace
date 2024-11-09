import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setNotification } from "../../redux/slices/commonSlice";

const useSetNotfy = () => {
  const dispatch = useDispatch();

  return useCallback(
    (message, type) => {
      console.log(message);
      if (message) {
        dispatch(setNotification({ message, type }));
      }
    },
    [dispatch]
  );
};

export default useSetNotfy;
