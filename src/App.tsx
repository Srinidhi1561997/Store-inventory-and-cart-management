import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./components/NotFound";
import ProductDetails from "./pages/ProductDetails";
import { useSelector } from "react-redux";
import { type RootState } from "./store";
import { CartProvider } from "./context/CartContext";
function AppRoutes() {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/products" replace /> : <Login />}
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
