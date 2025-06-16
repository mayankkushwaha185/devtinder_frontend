import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    remvoeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequest, remvoeRequest } = requestSlice.actions;
export default requestSlice.reducer;
