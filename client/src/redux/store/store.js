import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import commonSlice from "../slices/commonSlice";
import dataSlice from "../slices/dataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonSlice,
    data: dataSlice,
  },
});

export default store;
