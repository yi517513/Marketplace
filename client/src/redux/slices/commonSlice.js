import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAppOnReady: true,
  notification: { message: "", type: "" },
  isModal: false,
  itemsPerPageCount: 8,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsAppOnReady(state, action) {
      state.isAppOnReady = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
    setPagination(state, action) {
      state.itemsPerPageCount = action.payload;
    },
  },
});

export const { setIsAppOnReady, setNotification, setIsModal, setPagination } =
  commonSlice.actions;
export default commonSlice.reducer;
