import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    loadCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { loadCategory } = categorySlice.actions;
export const selectCategory = (state) => state.category;
export default categorySlice.reducer;
