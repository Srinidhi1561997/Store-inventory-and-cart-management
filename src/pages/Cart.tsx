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
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    maxWidth: 600,
    margin: "4rem auto 0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "contain",
    background: "#f9f9f9",
  },
  content: {
    flex: 1,
  },
  buttonGroup: {
    display: "flex",
    gap: 8,
    marginTop: 8,
  },
  totalText: {
    textAlign: "right",
    paddingRight: 8,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
const Cart: React.FC = () => {
  const classes = useStyles();
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
      <div className={classes.container}>
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} className={classes.card}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  className={classes.image}
                />
                <CardContent className={classes.content}>
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
                  <div className={classes.buttonGroup}>
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
                  </div>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" className={classes.totalText}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>

            <div className={classes.actions}>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
