import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userId: null,
  notification: { visible: false, message: "", type: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userId", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
    },
    checkAuth(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { login, logout, checkAuth, setNotification } = authSlice.actions;
export default authSlice.reducer;
