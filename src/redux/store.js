import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;
