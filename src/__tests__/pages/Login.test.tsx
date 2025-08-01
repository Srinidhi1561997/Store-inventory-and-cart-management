import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/Login";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import loginReducer from "../../services/login/loginSlice";

const mockNavigate = jest.fn();

// ✅ Mock the entire `react-router-dom` module
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavigate, // override useNavigate
  };
});

// ✅ Mock login data
jest.mock("../../utils/dataUtils", () => ({
  loginUserData: [{ userName: "testUser", password: "Password@123" }],
}));

// ✅ Helper to render with store
const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: { login: loginReducer },
    preloadedState: { login: preloadedState },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    ),
  };
};

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    renderWithStore();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

 it("shows validation errors for empty fields", async () => {
  renderWithStore();

  // Simulate blur on both fields before submit
  fireEvent.blur(screen.getByLabelText("Username:"));
  fireEvent.blur(screen.getByLabelText("Password:"));
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  console.log('toBeInTheDocument' in expect);
  await waitFor(() => {
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
});

  it("shows error for invalid credentials", async () => {
    renderWithStore();
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

  it("logs in with valid credentials", async () => {
    const { store } = renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      const state = store.getState().login;
      expect(state.username).toBe("testUser");
      expect(state.password).toBe("Password@123");
      expect(state.isLoggedIn).toBe(true);
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("toggles password visibility", () => {
    renderWithStore();
    const passwordInput = screen.getByLabelText("Password:") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });
    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("shows password validation errors for weak password", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });
  });

  it("shows password validation error for missing uppercase", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(
        screen.getByText("Must contain an uppercase letter")
      ).toBeInTheDocument();
    });
  });

  it("shows password validation error for missing lowercase", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "PASSWORD@123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Must contain a lowercase letter")
      ).toBeInTheDocument();
    });
  });

  it("shows password validation error for missing number", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password@abc" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(
        screen.getByText("Must contain a number")
      ).toBeInTheDocument();
    });
  });

  it("shows password validation error for missing special character", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(
        screen.getByText("Must contain a special character")
      ).toBeInTheDocument();
    });
  });

  it("shows correct aria-label for password toggle", () => {
    renderWithStore();
    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });
    expect(toggleButton).toHaveAttribute("aria-label", "Show password");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "Hide password");
  });
});
