import React from "react";
import ProductHeader from "../components/Header";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductCountInCart } from "../services/headerActions/headerActionsSlice";
import type { AppDispatch, RootState } from "../store";
import {
  removeFromCart,
  clearCart,
  addToCart,
  createOrder,
} from "../services/cartActions/cartActionSlice";

const Cart: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    dispatch(setProductCountInCart(total));
  }, [cartItems, dispatch]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(createOrder());
    dispatch(clearCart());
    navigate("/products"); // Change path if your product listing is different (e.g., "/products")
  };

  return (
    <div>
      <ProductHeader />
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    background: "#f9f9f9",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.category}
                  </Typography>
                  <Typography variant="body1">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      -
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" align="right" sx={{ pr: 1 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cart;
