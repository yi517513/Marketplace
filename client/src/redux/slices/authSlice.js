import { createSlice } from "@reduxjs/toolkit";
// import { NOTIFICATION_TYPES } from "../constants";

const initialState = {
  isAuthenticated: false,
  loading: true,
  notification: { visible: false, message: "", type: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    checkAuth(state, action) {
      state.isAuthenticated = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { login, logout, checkAuth, setLoading, setNotification } =
  authSlice.actions;
export default authSlice.reducer;
