import { PATHS } from "../../utils/paths";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const useValidationSchema = (currentPath) => {
  const { produtId } = useParams();

  // 註冊表單驗證
  const registerSchema = Yup.object({
    email: Yup.string().email("無效的電子郵件").required("必填"),
    password: Yup.string().required("必填"),
    verificationCode: Yup.string().required("必填"),
  });

  // 登入表單驗證
  const loginSchema = Yup.object({
    email: Yup.string().email("無效的電子郵件").required("必填"),
    password: Yup.string().required("必填"),
  });

  // 用戶資料表單驗證
  const profileSchema = Yup.object({
    username: Yup.string().required("必填"),
    birthday: Yup.date(),
    gender: Yup.string().oneOf(["Male", "Female", "Other"]),
    phone: Yup.string(),
    address: Yup.string(),
  });

  // 商品表單驗證
  const publishSchema = Yup.object({
    title: Yup.string().required("必填"),
    price: Yup.string().required("必填"),
    inventory: Yup.number().required("必填"),
    description: Yup.string().required("必填"),
  });

  const validationSchemaMap = {
    [PATHS.REGISTER]: registerSchema,
    [PATHS.LOGIN]: loginSchema,
    [PATHS.PROFILE]: profileSchema,
    [PATHS.CREATE]: publishSchema,
    [`${PATHS.EDIT}/${produtId}`]: publishSchema,
  };

  const validationSchema = validationSchemaMap[currentPath];

  return validationSchema;
};

export default useValidationSchema;
