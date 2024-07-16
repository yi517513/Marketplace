# 開發日誌

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

## 2024-07-15

### Client

- **RegisterComponent**

  - 使用了`formik`和`yup`進行表單管理和驗證。
  - 完成用戶登入表單，並添加了驗證邏輯。

- **VerifyCode**
  - 實現使用驗證碼才能註冊的組件。

### Server

- **register route**

  - 更新註冊路由，符合驗證碼使用邏輯。

- **register route**

  - 更新登入路由，使用`passport`的 Loacl 策略。

- **sendVerifyCode route**
  - 使用`nodemailer`套件，註冊時透過 API 發送驗證碼到使用者信箱。

## 2024-07-16

### Client

- **UserCenter**
  - 新增 UserCenter 組件，實現受 JWT 保護的路由。

### Server

- **userCenter route**

  - 使用`passport` 和 JWT 策略實現路由保護。

- **login and register routes**

  - 將註冊、登入、發送驗證碼等處理邏輯寫到 controllers。

- **login route**
  - 取消 localStorage 設置 token 的方法，改為使用 `HTTPOnly` cookies 方法設置 token 以防止 XSS 攻擊，提高安全性。
  - 新增 CORS 設置，解決 `HttpOnly` 的 cookies 跨域請求問題。
