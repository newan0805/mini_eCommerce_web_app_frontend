import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    vendor: null,
    token: null,
  },
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload.vendor;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.vendor = null;
      state.token = null;
    },
  },
});

export const { setVendor, logout } = authSlice.actions;

export default authSlice.reducer;
