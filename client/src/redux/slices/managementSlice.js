import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: [],
  Component: null,
  handlers: null,
};

const managementSlice = createSlice({
  name: `management`,
  initialState,
  reducers: {
    setManagement(state, action) {
      state.datas = action.payload.datas;
      state.Component = action.payload.Component;
      state.handlers = action.payload.handlers;
      console.log(action.payload);
    },
  },
});

export const { setManagement } = managementSlice.actions;
export default managementSlice.reducer;
