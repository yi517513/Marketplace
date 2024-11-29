import * as Yup from "yup";
import { useMemo } from "react";

const FORM_CONFIG = {
  LoginForm: {
    isRegister: false,
    method: "login",
    label: "登入",
    title: "登入會員",
  },
  RegisterForm: {
    isRegister: true,
    method: "register",
    label: "註冊",
    title: "註冊會員",
  },
  postProduct: { method: "postProduct", label: "刊登出售" },
  editProduct: { method: "editProduct", label: "修改商品" },
  default: { method: "", label: "", title: "頁面" },
};

const useFormInit = () => {
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
    images: [],
    description: "",
  };

  // 商品表單驗證
  const productEditSchema = Yup.object({
    title: Yup.string()
      .required("必填")
      .min(3, "不能低於3字")
      .max(20, "不能超過 20 字"),
    price: Yup.string()
      .required("必填")
      .test(
        "is-valid-number",
        "請輸入有效的數字",
        (value) => !isNaN(parseFloat(value)) && isFinite(value)
      )
      .test("is-positive", "數量必須為正數", (value) => parseFloat(value) > 0),
    images: Yup.array().min(1, "至少需要一張圖片"),
    inventory: Yup.number().required("必填").positive("數量必須為正數"),
    description: Yup.string()
      .required("必填")
      .min(10, "不能低於10字")
      .max(150, "不能超過100字"),
  });

  const formikInit = useMemo(
    () => ({
      LoginForm: {
        initialValues: loginValues,
        validationSchema: loginSchema,
        config: FORM_CONFIG.LoginForm,
      },
      RegisterForm: {
        initialValues: registerValues,
        validationSchema: registerSchema,
        config: FORM_CONFIG.RegisterForm,
      },
      ProfileForm: {
        initialValues: profileValues,
        validationSchema: profileSchema,
        config: FORM_CONFIG.default,
      },
      ProductEdit: {
        initialValues: productEditValues,
        validationSchema: productEditSchema,
        config: FORM_CONFIG.editProduct,
      },
      ProductPost: {
        initialValues: productEditValues,
        validationSchema: productEditSchema,
        config: FORM_CONFIG.postProduct,
      },
    }),
    []
  );

  const getFormInit = (path) => {
    return formikInit[path] || {};
  };

  return getFormInit;
};

export default useFormInit;
