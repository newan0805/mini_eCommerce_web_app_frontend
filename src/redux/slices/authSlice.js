import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = (() => {
  try {
    return (localStorage.getItem("authToken")) || "";
  } catch (error) {
    // console.error("Error parsing auth from localStorage:", error);
    return "";
  }
})();


const authSlice = createSlice({
  name: "authToken",
  initialState: initialAuthState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload.vendor;
      state.token = action.payload.token;
      localStorage.setItem("authToken", JSON.stringify(state));
    },

    logout: (state) => {
      state.vendor = null;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setVendor, logout } = authSlice.actions;

export default authSlice.reducer;
