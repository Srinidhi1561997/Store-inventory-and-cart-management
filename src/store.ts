import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./services/products/productsSlice";
import headerActionsReducer from "./services/headerActions/headerActionsSlice";
import loginReducer from "./services/login/loginSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    headerActions: headerActionsReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
