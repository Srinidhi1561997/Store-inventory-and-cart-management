// src/__tests__/pages/Products.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Products from "../../pages/Products";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer from "../../services/products/productsSlice";
import cartReducer from "../../services/cartActions/cartActionSlice"; // adjust path
import headerActionsReducer from "../../services/headerActions/headerActionsSlice";
import * as productsSlice from "../../services/products/productsSlice";

// ✅ Mock MUI and internal components
jest.mock("@mui/material/Box", () => (props: any) => <div>{props.children}</div>);
jest.mock("../../components/Header", () => () => <div>MockHeader</div>);
jest.mock("../../components/FloatingIcon", () => () => <div>MockFilterDrawer</div>);
jest.mock("../../components/ProductList", () => ({ displayProducts }: any) => (
  <div>MockProductList - {displayProducts.length} products</div>
));

// ✅ Optional: Spy on async thunk
jest.spyOn(productsSlice, "getProducts").mockImplementation(() => () => Promise.resolve());

const renderWithStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      headerActions: headerActionsReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

describe("Products Page", () => {
  it("should render header, product list and filter icon", async () => {
    renderWithStore({
      products: {
        data: [{ id: 1, title: "Shirt", category: "clothing", price: 100 }],
        loading: false,
        error: null,
      },
      cart: { cartItems: {} },
      headerActions: { searchText: "", filteredText: "", sortedText: "" },
    });
    console.log('toBeInTheDocument' in expect,expect(await screen.findByText("MockHeader")));
    expect(await screen.findByText("MockHeader")).toBeInTheDocument();
    expect(await screen.findByText("MockProductList - 1 products")).toBeInTheDocument();
    expect(screen.getByText("MockFilterDrawer")).toBeInTheDocument();
  });

  it("should show 'No results found' when no products match", async () => {
    renderWithStore({
      products: { data: [], loading: false, error: null },
      cart: { cartItems: {} },
      headerActions: { searchText: "", filteredText: "", sortedText: "" },
    });

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });
});