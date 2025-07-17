import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./services/products/productsSlice";
import headerActionsReducer from "./services/headerActions/headerActionsSlice";
import loginReducer from "./services/login/loginSlice";
import cartActionsReducer from "./services/cartActions/cartActionSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    headerActions: headerActionsReducer,
    login: loginReducer,
    cart: cartActionsReducer, // Add cart actions reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
