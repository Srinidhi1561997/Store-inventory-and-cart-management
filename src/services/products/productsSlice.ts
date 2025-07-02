import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  fetchProducts
);

interface ProductState {
  data: [];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export default productsSlice.reducer;
