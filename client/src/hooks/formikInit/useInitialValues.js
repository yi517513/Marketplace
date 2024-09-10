import { PATHS } from "../../utils/paths";
import { useParams } from "react-router-dom";

const useInitialValues = (currentPath) => {
  const { produtId } = useParams();

  // 註冊
  const registerValues = {
    email: "yee0860104@gmail.com",
    password: "test123",
    verificationCode: "",
  };

  // 登入
  const loginValues = { email: "yee0860104@gmail.com", password: "test123" };

  // 用戶資料
  const profileValues = {
    username: "",
    email: "",
    birthday: "",
    gender: "",
    phone: "",
    address: "",
  };

  // 新增or編輯商品
  const publishValues = {
    title: "",
    price: "",
    inventory: "",
    images: "",
    description: "",
  };

  const initialValuesMap = {
    [PATHS.REGISTER]: registerValues,
    [PATHS.LOGIN]: loginValues,
    [PATHS.PROFILE]: profileValues,
    [PATHS.CREATE]: publishValues,
    [`${PATHS.EDIT}/${produtId}`]: publishValues,
  };

  const initialValues = initialValuesMap[currentPath];

  return initialValues;
};

export default useInitialValues;
