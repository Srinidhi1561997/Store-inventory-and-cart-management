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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { setLoginStatus } from "../services/login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import ProductHeader from "../components/Header";
// src/types/User.ts
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
  orders: Order[];
}

const dummyUser: UserProfileData = {
  username: "srinidhi_hs",
  email: "srinidhi@example.com",
  joinedAt: "2023-03-10",
  orders: [
    { id: 1, date: "2024-07-01", total: 250, status: "Delivered" },
    { id: 2, date: "2024-06-15", total: 130, status: "Processing" },
    { id: 3, date: "2024-05-28", total: 99.99, status: "Cancelled" },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Processing":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.login);
  useEffect(() => {
    // Simulate fetch
    setTimeout(() => setUser(dummyUser), 300);
  }, []);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    dispatch(setHomeScreen(false));
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
    console.log("User logged out");
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
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "primary.main",
                  fontSize: 28,
                }}
              >
                {user.username.slice(0, 2).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary">
                Joined: {new Date(user.joinedAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Order History */}
          <Typography variant="h6" mb={2}>
            Order History
          </Typography>
          <Grid container spacing={2}>
            {user.orders.map((order) => (
              <Grid item xs={12} sm={6} key={order.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {order.date}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Total: ₹{order.total.toFixed(2)}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default UserProfile;
