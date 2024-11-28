import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;

// Thunk for fetching products
export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    console.log('Get Products: ', response);
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError("Error fetching products"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productsSlice.reducer;
