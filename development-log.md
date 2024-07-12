#開發日誌

## 2024-07-12

### Client

- **LoginComponent**

  - 使用了`formik`和`yup`進行表單管理和驗證。
  - 完成用戶登入表單，並添加了驗證邏輯。
  - 透過 AuthService 中的`axios`成功獲取 API 端的 token

- **someComponent**
  - 使用`react-router-dom`進行路由管理
  - 實現了導航邏輯

### Server

- **userModel**
  - 使用`mongoose`建立用戶模型
  - 定義了用戶的結構和驗證規則。
- **Login and Register Routes**
  - 使用 `express` 創建登入和註冊路由。
  - 使用 `jsonwebtoken` 進行 JWT 生成和驗證。
  - 使用 `joi` 進行請求數據驗證。
  - 使用 `bcrypt` 進行密碼加密。
  - 添加 `cors` 中間件以允許跨域請求。
