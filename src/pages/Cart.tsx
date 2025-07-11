import React from "react";
import ProductHeader from "../components/Header";
import { useCart } from "../context/CartContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setProductCountInCart } from "../services/headerActions/headerActionsSlice";

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    dispatch(setProductCountInCart(total));
  }, [cart, dispatch]);

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
        {cart.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          cart.map((item) => (
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
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
        {cart.length > 0 && (
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Cart;
