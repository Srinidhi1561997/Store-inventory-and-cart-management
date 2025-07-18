import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../products/productsSlice";

type OrderStatus = "Ordered" | "Delivered" | "Processing" | "Cancelled";
export interface CartState {
  cartItems: (Product & {
    quantity: number;
    date: string;
    total: number;
    status: OrderStatus;
  })[];
  orderItems: (Product & {
    quantity: number;
    date: string;
    total: number;
    status: OrderStatus;
  })[];
}
const initialState: CartState = {
  cartItems: [],
  orderItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or increase quantity
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity! += 1;
        existingItem.total = (existingItem.quantity + 1) * existingItem.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          date: new Date().toString(),
          status: "Ordered",
          total: action.payload.price,
        });
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
    createOrder: (state) => {
      const orderedItems = state.cartItems.map((item) => ({
        ...item,
        status: "Processing" as OrderStatus, // or "Ordered"
      }));
      state.orderItems.push(...orderedItems);
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orderItems = state.orderItems.filter(
        (item) => item.id !== action.payload
      );
      // state.orderItems.push(...removedItems);
      console.log(
        "items after deleted",
        action.payload,
        // ...removedItems,
        state.orderItems
      );
    },
    clearOrder: (state) => {
      state.orderItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  createOrder,
  removeOrder,
  clearOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
