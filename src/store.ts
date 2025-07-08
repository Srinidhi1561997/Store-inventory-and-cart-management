import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./services/products/productsSlice";
import headerActionsReducer from "./services/headerActions/headerActionsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    headerActions: headerActionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
