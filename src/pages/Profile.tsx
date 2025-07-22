// src/components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  Chip,
  Paper,
  CardMedia,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import ProductHeader from "../components/Header";
import {
  removeOrder,
  type CartState,
} from "../services/cartActions/cartActionSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SignOutModal from "../components/Modal";
import { getStatusColor } from "../utils/dataUtils";
import { createUseStyles } from "react-jss";

export interface Order {
  id: number;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Cancelled";
}

export interface UserProfileData {
  username: string;
  email: string;
  joinedAt: string;
  orders: CartState["cartItems"];
}

const useStyles = createUseStyles({
  container: {
    paddingTop: 48,
  },
  paper: {
    padding: 32,
    borderRadius: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    fontSize: 28,
    backgroundColor: "#1976d2",
  },
  signOutBtn: {
    display: "flex",
    alignItems: "center",
  },
  orderCardContent: {
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
    color: "red",
  },
  orderBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
  },
  cardImage: {
    objectFit: "contain",
    height: 200,
    width: 200,
    background: "#f9f9f9",
  },
  orderDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  chip: {
    marginTop: 8,
    width: 100,
  },
});

const UserProfile: React.FC = () => {
  const classes = useStyles();
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.login
  );
  const { orderItems } = useSelector((state: RootState) => state.cart);
  const dummyUser = {} as UserProfileData;
  useEffect(() => {
    const indexOfA = username.indexOf("@");
    Object.assign(dummyUser, {
      username: username.slice(0, indexOfA),
      email: username,
      joinedAt: new Date().toString(),
      orders: [...orderItems],
    });
    setTimeout(() => setUser(dummyUser), 300);
  }, [orderItems]);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleModalClose = () => {
    setIsModal(false);
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography color="text.secondary">Loading user profile...</Typography>
      </Box>
    );
  }

  return (
    <>
      <ProductHeader />
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar}>
                {user.username.slice(0, 2).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Joined: {new Date(user.joinedAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={() => setIsModal(true)}
              >
                Sign Out
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" mb={2}>
            Order History
          </Typography>
          <Grid container spacing={2}>
            {user.orders
              .sort((a, b) => a.id - b.id)
              .map((order) => (
                <Grid item xs={12} sm={6} key={order.id}>
                  <Card variant="outlined">
                    <CardContent className={classes.orderCardContent}>
                      <RemoveCircleOutlineIcon
                        className={classes.deleteIcon}
                        onClick={() => dispatch(removeOrder(order.id))}
                      />
                      <Box className={classes.orderBox}>
                        <CardMedia
                          component="img"
                          image={order.image}
                          alt={order.title}
                          className={classes.cardImage}
                        />
                        <Box className={classes.orderDetails}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            Order #{order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {order.date}
                          </Typography>
                          <Typography variant="body2">
                            Total: ₹{order.total}
                          </Typography>
                          <Typography variant="body2">
                            Quantity: {order.quantity}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            className={classes.chip}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Container>
      <SignOutModal open={isModal} handleClose={handleModalClose} />
    </>
  );
};

export default UserProfile;
