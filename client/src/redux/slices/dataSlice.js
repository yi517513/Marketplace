import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: null,
  profile: null,
  userOrders: null,
  userProducts: null,
  pendingShipment: null,
  purchasedHistory: null,
  soldHistory: null,
  userImages: null,
  productEdit: { images: [] },
  sharedData: [],
  tempState: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchData(state, action) {
      const { key, data } = action.payload;
      state[key] = data;
    },
    updateState(state, action) {
      const { key, data } = action.payload;
      const { parentKey, childKey } = key;
      state.tempState[parentKey] = state[parentKey];
      state[key] = data;
    },
    removeState(state, action) {
      const { key, data } = action.payload;
      const { parentKey, childKey } = key;

      state.tempState[parentKey] = state[parentKey];

      if (childKey) {
        state[parentKey][childKey] = state[parentKey][childKey].filter(
          (prev) => prev._id !== data
        );
      } else {
        state[parentKey] = state[parentKey].filter((prev) => prev._id !== data);
      }
    },
    appendState(state, action) {
      const { key, data } = action.payload;
      const { parentKey, childKey } = key;

      console.log(state[parentKey]);
      state.tempState[parentKey] = state[parentKey];

      if (childKey) {
        // state.tempState[parentKey][childKey] = state[parentKey][childKey];
        state[parentKey][childKey].unshift(data);
      } else {
        // state.tempState[parentKey] = state[parentKey];
        state[parentKey].unshift(data);
      }
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
  fetchData,
  updateState,
  removeState,
  appendState,
  resetState,
  rollback,
  shareData,
} = dataSlice.actions;
export default dataSlice.reducer;
