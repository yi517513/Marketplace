import { ROUTES } from "../../utils/paths";
import * as Yup from "yup";
import { useMemo } from "react";

const useFormikInit = (path) => {
  // 註冊
  const registerValues = {
    email: "yee0860104@gmail.com",
    password: "test123",
    verificationCode: "",
  };

  // 註冊表單驗證
  const registerSchema = Yup.object({
    email: Yup.string().email("email有誤").required("必填"),
    password: Yup.string().required("必填"),
    verificationCode: Yup.string().required("必填"),
  });

  // 登入
  const loginValues = { email: "yee0860104@gmail.com", password: "test123" };

  // 登入表單驗證
  const loginSchema = Yup.object({
    email: Yup.string().email("email有誤").required("必填"),
    password: Yup.string().required("必填"),
  });

  // 用戶資料
  const profileValues = {
    username: "",
    email: "",
    birthday: "",
    gender: "",
    phone: "",
    address: "",
  };

  // 用戶資料表單驗證
  const profileSchema = Yup.object({
    username: Yup.string().required("必填"),
    birthday: Yup.date(),
    gender: Yup.string().oneOf(["Male", "Female", "Other"]),
    phone: Yup.string(),
    address: Yup.string(),
  });

  // 新增or編輯商品
  const productEditValues = {
    title: "",
    price: "",
    inventory: "",
    images: "",
    description: "",
  };

  // 商品表單驗證
  const productEditSchema = Yup.object({
    title: Yup.string().required("必填"),
    price: Yup.string().required("必填"),
    inventory: Yup.number().required("必填"),
    description: Yup.string().required("必填"),
  });

  const formikInit = useMemo(() => {
    const formikInitMap = {
      [ROUTES.REGISTER]: {
        initialValues: registerValues,
        validationSchema: registerSchema,
      },
      [ROUTES.LOGIN]: {
        initialValues: loginValues,
        validationSchema: loginSchema,
      },
      [ROUTES.PROFILE]: {
        initialValues: profileValues,
        validationSchema: profileSchema,
      },
      [ROUTES.CREATE]: {
        initialValues: productEditValues,
        validationSchema: productEditSchema,
      },
      [ROUTES.EDIT]: {
        initialValues: productEditValues,
        validationSchema: productEditSchema,
      },
    };

    return formikInitMap[path] || {};
  }, [path]);

  return { formikInit };
};

export default useFormikInit;
