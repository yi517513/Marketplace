import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  allProducts: null,
  profile: null,
  orderList: null,
  productList: null,
  pendingList: null,
  ImageList: null,
  purchasedHistory: null,
  soldHistory: null,
  singleProduct: { images: [] },
  sharedData: [],
  tempState: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setApiData(state, action) {
      const { key, data } = action.payload;
      state[key] = data;
    },
    updateState(state, action) {
      const { storePath, data } = action.payload;
      const target = storePath.reduce((acc, key) => acc[key], state);
      state.tempState[storePath[0]] = state[storePath[0]];
      target.push(data);
    },
    removeState(state, action) {
      const { storePath, data } = action.payload;
      const target = _.get(state, storePath);

      if (Array.isArray(target)) {
        _.remove(target, (item) => item._id === data);
      }
    },
    appendState(state, action) {
      const { storePath, data } = action.payload;
      const target = storePath.reduce((acc, key) => acc[key], state);

      state.tempState[storePath[0]] = state[storePath[0]];
      target.unshift(data);
    },
    unShiftState(state, action) {
      const { storePath, data } = action.payload;
      const target = storePath.reduce((acc, key) => acc[key], state);

      if (Array.isArray(target)) {
        _.remove(target, (item) => item._id === data._id);
      }

      target.unshift(data);
    },
    resetState(state, action) {
      const { key } = action.payload;
      if (initialState[key] !== undefined) {
        state[key] = initialState[key];
      }
    },
    rollback(state, action) {
      const { key } = action.payload;
      if (state.tempState[key]) {
        state[key] = state.tempState[key];
        delete state.tempState[key];
      }
    },
    shareData(state, action) {
      state.sharedData.push(action.payload);
    },
  },
});

export const {
  setApiData,
  updateState,
  removeState,
  appendState,
  unShiftState,
  resetState,
  rollback,
  shareData,
} = dataSlice.actions;
export default dataSlice.reducer;
