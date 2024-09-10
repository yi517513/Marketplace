import { useLocation } from "react-router-dom";
import useInitialValues from "../formikInit/useInitialValues";
import useValidationSchema from "../formikInit/useValidationSchema";
import useAuthHandler from "../Handler/useAuthHandler";
import { PATHS } from "../../utils/paths";

const useAuthConfig = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 表單初始數據
  const initialValues = useInitialValues(currentPath);

  // 表單驗證規則
  const validationSchema = useValidationSchema(currentPath);

  // 表單提交的方法
  const actionConfig = {
    [PATHS.LOGIN]: {
      submissionMessages: "正在登入",
      redirectPath: `HOME`,
    },
    [PATHS.REGISTER]: {
      submissionMessages: "註冊中...",
      redirectPath: `LOGIN`,
    },
  };

  const handleSubmit = useAuthHandler(currentPath, actionConfig[currentPath]);

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
