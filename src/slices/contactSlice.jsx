import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducer: {
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { loadMessages } = contactSlice.actions;
export const selectMessages = (state) => state.contact;
export default contactSlice.reducer;
