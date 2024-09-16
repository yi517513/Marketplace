import { useLocation } from "react-router-dom";
import useInitialValues from "../map/useInitialValues";
import useValidationSchema from "../map/useValidationSchema";
import useAuthHandler from "../Handler/useAuthHandler";
import { PATHS } from "../../utils/paths";

const useAuthConfig = (modalType) => {
  const location = useLocation();
  let currentPath = location.pathname;

  if (modalType) {
    currentPath = modalType;
  }

  // 表單初始數據
  const initialValues = useInitialValues(currentPath);

  // 表單驗證規則
  const validationSchema = useValidationSchema(currentPath);

  // 表單提交的方法
  const handleSubmit = useAuthHandler(currentPath, modalType);

  const formConfigMap = {
    [PATHS.REGISTER]: {
      formType: "Register",
      formTitle: "註冊會員",
    },
    [PATHS.LOGIN]: {
      formType: "Login",
      formTitle: "登入會員",
    },
  };

  const currentFormConfig = formConfigMap[currentPath];
  const formType = currentFormConfig.formType;
  const formTitle = currentFormConfig.formTitle;

  return { formType, formTitle, initialValues, validationSchema, handleSubmit };
};

export default useAuthConfig;
