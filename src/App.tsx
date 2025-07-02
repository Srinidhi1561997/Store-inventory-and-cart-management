import Login from "./screens/Login";
import ProductList from "./screens/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import OrderHistory from "./screens/OrderHistory";
import NotFound from "./components/NotFound";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="*" element={<NotFound />} />
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
