import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HeaderActionstate {
  isLoggedIn: boolean;
}

const initialState: HeaderActionstate = {
  isLoggedIn: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});
export const { setLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;
