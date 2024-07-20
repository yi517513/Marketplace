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

- **login route**

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

## 2024-07-18

### Client

- **useRefreshToken Hook**

  - 定期向後端請求新的 access token，以保持用戶會話狀態並提高應用安全性。

  - **useCheckAuthStatus Hook**

  - 每次頁面刷新時，通過 axios 向 API 檢查認證狀態。根據回傳結果將 isAuthenticated 設置為 true 或 false。

- **authSlice**
  - 使用`redux-toolkit`管理認證狀態。

### Server

- **refresh-token route**

  - 新增`refresh token`機制，提高應用安全性，降低憑證竊取風險，有效防止 CSRF 攻擊。

- **checkAuth route**
  - 前端刷新頁面時會向該路由發送 GET 請求，通過 passport-jwt 驗證保護，根據結果回傳 true 或 false 用來告知認證狀態。

## 2024-07-19

### Client

- **元件重新命名**

- **authSlice**

  - 新增 `setLoading` action 來管理頁面是否加載完畢。

- **useCheckAuthStatus Hook**

  - 當確證 `isAuthenticated` 之後，將 `loading` 設定為加載完畢。

- **userCenterPage**

  - 使用 `loading` 與 `isAuthenticated` 兩種狀態判斷是否需要彈出"請重新登入"對話框。

  - 當 `isAuthenticated` 為 false 時，新增`react-modal`製作的"請重新登入"對話框。

- **UserProfile**
  - 使用了`formik`和`yup`進行表單管理和驗證。
  - 透過 `axios` GET 取得個人資料，修改之後再使用 `axios` PATCH 將資料更新。

### Server

- **profile router**

  - 新增個人資料傳遞至前端的路由。

- **updateUserProfile route**
  - 新增接收前端傳遞過來的資料以修改個人資料的路由。

## 2024-07-20

### Client

- **hook 重新命名**

  - `useRefreshAccessToken`: 原名 `useRefreshToken`，新增了根據後端回傳的狀態碼來設定 `react-toastify` 的通知。

  - `useVerifyAndRefreshAuth`: 原名 `useCheckAuthStatus`，新增了根據後端回傳的狀態碼來設定 `react-toastify` 的通知。

- **authSlice**

  - 新增用於`react-toastify`通知的狀態與`action`。

- **useToastNotifications Hook**

  - 使用`react-toastify`製作出登入、登出、斷線等的通知。

### Server

- **middlewares**

  - 將 routes 與 controller 裡面的`middlewares`分離出來。

- **passport**

  - 在`jwt strategy` 中，將 `cookieExtractor` 函數從前端取得的 `accessToken` 改為 `refreshToken`，當作使用者可以更新`accessToken`的生命週期。

  - 新增`authenticateJWT` middleware，使用的 `jwt strategy` 的 `callbackFn` 客製化回傳至前端的錯誤訊息。

- **refreshAccessToken route**

  - 原名`refreshToken`，加入 `passport-jwt` middleware。

- **verifyAndRefreshAuth route**
  - 原名`checkAuth`，加入 `authenticateJWT` middleware，根據接收到的`refreshToken`回傳不同的回應。
