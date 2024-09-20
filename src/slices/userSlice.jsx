import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infos: {},
  isLogged: false,
  token: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.infos = action.payload;
      state.isLogged = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.infos = {};
      state.isLogged = false;
      state.token = null;
      state.role = null;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { connectUser, logoutUser, setUserRole } = userSlice.actions;
export const selectUser = (state) => state.user;
export const selectUserRole = (state) => state.user.role;
export default userSlice.reducer;
