import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import useInitialValues from "../formikInit/useInitialValues";
import useValidationSchema from "../formikInit/useValidationSchema";
import useProductEditorHandler from "../Handler/useProductEditorHandler";
import useFetchData from "../fetch-Data/useFetchData";
import useRouteServices from "../service/useRouteServices";

import { PATHS } from "../../utils/paths";

// 新增商品及更新商品的API應回傳id

const useProductEditorConfig = () => {
  const [productInfo, setProductInfo] = useState({});
  const { productId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const initialValues = useInitialValues(currentPath);
  const validationSchema = useValidationSchema(currentPath);
  const fetchData = useFetchData(currentPath);
  const { services } = useRouteServices(currentPath);

  const actionConfig = {
    [PATHS.CREATE]: {
      submissionMessages: "正在新增商品",
      service: services.create,
    },
    [`${PATHS.EDIT}/${productId}`]: {
      submissionMessages: "正在更新商品",
      service: services.update,
    },
  };

  const handleSubmit = useProductEditorHandler(
    currentPath,
    actionConfig[currentPath]
  );

  setProductInfo(initialValues);

  useEffect(() => {
    fetchData(setProductInfo, productId);
  }, [currentPath]);

  return { productInfo, validationSchema, handleSubmit };
};

export default useProductEditorConfig;
