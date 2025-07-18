import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginActionstate {
  isLoggedIn: boolean;
  username: string;
  password: string;
}

const initialState: LoginActionstate = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  username: "",
  password: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", String(action.payload));
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});
export const { setLoginStatus, setPassword, setUsername } = loginSlice.actions;
export default loginSlice.reducer;
