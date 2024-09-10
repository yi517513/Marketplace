import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiLoading: false,
  dataReady: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setApiLoading(state, action) {
      state.apiLoading = action.payload;
    },
    setDataReady(state, action) {
      state.dataReady = action.payload;
    },
  },
});

export const { setApiLoading, setDataReady } = loadingSlice.actions;
export default loadingSlice.reducer;
