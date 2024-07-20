import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  showLoginToast: false,
  showDisconnectedToast: false,
  showReLoginToast: false,
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
    setShowLoginToast(state, action) {
      state.showLoginToast = action.payload;
    },
    setShowDisconnectedToast(state, action) {
      state.showDisconnectedToast = action.payload;
    },
    setShowReLoginToast(state, action) {
      state.showReLoginToast = action.payload;
    },
  },
});

export const {
  login,
  logout,
  checkAuth,
  setLoading,
  setShowLoginToast,
  setShowDisconnectedToast,
  setShowReLoginToast,
} = authSlice.actions;
export default authSlice.reducer;
