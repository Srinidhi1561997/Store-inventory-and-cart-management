import Login from "./screens/Login";
import ProductList from "./screens/ProductList";
import Header from "./components/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import OrderHistory from "./screens/OrderHistory";

function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.toLowerCase() === "/login";
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
