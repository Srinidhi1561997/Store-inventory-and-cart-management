import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../axios/apiClient.ts";

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  fetchProducts
);

export const getProductById = createAsyncThunk(
  "products/fetchProductById",
  (id: number) => fetchProducts(id)
);

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null | undefined;
  selectedProduct: Product | undefined;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
  selectedProduct: undefined,
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
        state.data = action.payload as Product[];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = undefined;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload as Product;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedProduct = undefined;
      });
  },
});

export default productsSlice.reducer;
