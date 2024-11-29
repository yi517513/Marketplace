import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAppOnReady: true,
  notification: { message: "", type: "" },
  isModal: false,
  itemsPerPage: 2,
  slug: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsAppOnReady(state, action) {
      state.isAppOnReady = action.payload;
    },
    setLoadingNotify(state, action) {
      state.notification.type = `info`;
      state.notification.message = action.payload;
    },
    setSuccessNotify(state, action) {
      state.notification.type = `success`;
      state.notification.message = action.payload;
    },
    setErrorNotify(state, action) {
      state.notification.type = `error`;
      state.notification.message = action.payload;
    },
    resetNotify(state) {
      state.notification.type = "";
      state.notification.message = "";
    },
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
    setPagination(state, action) {
      state.itemsPerPage = action.payload;
    },
    setSlug(state, action) {
      state.slug = action.payload;
    },
  },
});

export const {
  setIsAppOnReady,
  setLoadingNotify,
  setSuccessNotify,
  setErrorNotify,
  resetNotify,
  setIsModal,
  setPagination,
  setSlug,
} = commonSlice.actions;
export default commonSlice.reducer;
