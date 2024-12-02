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

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    console.log(response.data);
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError("Error fetching products"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${productId}`);
    dispatch(removeProduct(productId));
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError("Error deleting product"));
  }
};

export default productsSlice.reducer;
