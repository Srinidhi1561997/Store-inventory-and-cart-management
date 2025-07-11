import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginActionstate {
  isLoggedIn: boolean;
}

const initialState: LoginActionstate = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", String(action.payload));
    },
  },
});
export const { setLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;
