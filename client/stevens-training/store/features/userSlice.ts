import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state: any, action: any) => {
      state.user = action.payload;
    },
    refresh: (state: any, action: any) => {
      state.user = action.payload;
    },
    update: (state: any, action: any) => {

    },
    logout: (state: any) => {
      state.user = null;
    }
  }
});

export const { login, logout, refresh, update } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
