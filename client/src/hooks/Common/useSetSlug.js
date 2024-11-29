import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSlug } from "../../redux/slices/commonSlice";

const useSetSlug = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(setSlug(productId));
    }
  }, [productId]);

  return;
};

export default useSetSlug;
