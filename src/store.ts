import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./services/products/productsSlice";
import headerActionsReducer from "./services/headerActions/headerActionsSlice";
import loginReducer from "./services/login/loginSlice";
import cartActionsReducer from "./services/cartActions/cartActionSlice";
import reviewActionsReducer from "./services/reviewActions/reviewActionSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    headerActions: headerActionsReducer,
    login: loginReducer,
    cart: cartActionsReducer,
    review: reviewActionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
