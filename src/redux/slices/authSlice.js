import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = JSON.parse(localStorage.getItem("auth")) || {
  vendor: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload.vendor;
      state.token = action.payload.token;
      console.log("Auth state: ", state);
      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.vendor = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setVendor, logout } = authSlice.actions;

export default authSlice.reducer;
