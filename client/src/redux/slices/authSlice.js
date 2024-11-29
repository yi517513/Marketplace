import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userId: null,
  verifyCode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userId", action.payload.userId);
    },
    cleanAuth: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
    },
    checkAuth: (state, action) => {
      const userId = action.payload.userId;
      if (userId) {
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", action.payload.userId);
      } else {
        state.isAuthenticated = false;
        state.userId = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
      }
    },
    setVerifyCode: (state, action) => {
      state.verifyCode = action.payload.verifyCode;
    },
    cleanVerifyCode: (state) => {
      state.verifyCode = null;
    },
    checkVerify: (state, action) => {
      const verifyCode = action.payload.verifyCode;
      console.log(`verifyCode: ${verifyCode}`);
      console.log(`state.verifyCode: ${state.verifyCode}`);
      if (verifyCode !== state.verifyCode) {
        throw new Error("Verification code is incorrect.");
      }
    },
  },
});

export const { setAuth, cleanAuth, checkAuth, setVerifyCode, checkVerify } =
  authSlice.actions;
export default authSlice.reducer;
