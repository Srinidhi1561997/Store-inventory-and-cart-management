import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/Login";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import * as redux from "react-redux";
import * as router from "react-router-dom";
import {
  setLoginStatus,
  setPassword,
  setUsername,
} from "../../services/login/loginSlice";
import { loginUserData } from "../../utils/dataUtils";
import "@testing-library/jest-dom";

// Mock store
const mockStore = configureStore([]);
const store = mockStore({});

// Mock dispatch
const mockDispatch = jest.fn();
jest.spyOn(redux, "useDispatch").mockReturnValue(mockDispatch);

// Mock navigate
const mockNavigate = jest.fn();
jest.spyOn(router, "useNavigate").mockReturnValue(mockNavigate);

// Mock user data
jest.mock("../utils/dataUtils", () => ({
  loginUserData: [{ userName: "testUser", password: "Password@123" }],
}));

describe("Login Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  it("renders login form correctly", () => {
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation messages on empty submit", async () => {
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("shows error on invalid credentials", async () => {
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "wrongUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "WrongPass@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Invalid username or password")
      ).toBeInTheDocument();
    });
  });

  it("logs in successfully with valid credentials", async () => {
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setUsername("testUser"));
      expect(mockDispatch).toHaveBeenCalledWith(setPassword("Password@123"));
      expect(mockDispatch).toHaveBeenCalledWith(setLoginStatus(true));
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("toggles password visibility", () => {
    const passwordInput = screen.getByLabelText(
      "Password:"
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("password");
  });
});
