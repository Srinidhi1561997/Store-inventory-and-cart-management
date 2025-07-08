import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HeaderActionstate {
  searchText: string;
  sortedText: string;
  filteredText: string;
  productCountsInCart: number;
  isHomescreen: boolean;
}

const initialState: HeaderActionstate = {
  searchText: "",
  sortedText: "",
  filteredText: "",
  productCountsInCart: 0,
  isHomescreen: true,
};

const headerActionsSlice = createSlice({
  name: "headerActions",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setSortedText(state, action: PayloadAction<string>) {
      state.sortedText = action.payload;
    },
    setFilteredText(state, action: PayloadAction<string>) {
      state.filteredText = action.payload;
    },
    setProductCountInCart(state, action: PayloadAction<number>) {
      state.productCountsInCart = action.payload;
    },
    setHomeScreen(state, action: PayloadAction<boolean>) {
      state.isHomescreen = action.payload;
    },
  },
});

export const {
  setSearchText,
  setSortedText,
  setFilteredText,
  setProductCountInCart,
  setHomeScreen,
} = headerActionsSlice.actions;

export default headerActionsSlice.reducer;
