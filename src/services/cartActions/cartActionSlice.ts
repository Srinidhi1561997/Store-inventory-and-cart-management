import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../products/productsSlice";

export interface CartState {
  cartItems: (Product & { quantity: number })[];
}

// Initial cart state
const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or increase quantity
    addToCart: (state, action: PayloadAction<Product>) => {
      // console.log("Adding to cart:", action.payload);
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove item from cart completely
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    },

    // Clear all items from cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
