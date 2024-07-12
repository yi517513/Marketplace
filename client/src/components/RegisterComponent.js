import React from "react";

const RegisterComponent = () => {
  return (
    <div className="register-area">
      <h1>會員註冊</h1>
      <form className="register">
        <input placeholder="請輸入電子郵件" />
        <input placeholder="請輸入密碼" />
        <input placeholder="請輸入使用者名稱" />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          註冊
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
