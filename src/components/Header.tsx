import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Drawer } from "@mui/material";
import SidebarList from "./Sidebar";

const ProductHeader: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const open = Boolean(toggleSidebar);
  const navigate = useNavigate();
  const location = useLocation();
  const { productCountsInCart } = useSelector(
    (state: RootState) => state.headerActions
  );
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const toggleDrawer = (open: boolean) => () => {
    setToggleSidebar(open);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#1976d2", zIndex: 1 }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(!toggleSidebar)}
            sx={{ mr: 2 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <SidebarList />
          </Drawer>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              color: "white",
              fontStyle: "italic",
            }}
          >
            Store Inventory & Cart Management
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {location.pathname !== "/cart" ? (
            <>
              <IconButton
                component={Link}
                edge="end"
                color="inherit"
                aria-label="sort"
                to="/cart"
              >
                <Badge
                  badgeContent={
                    productCountsInCart > 0 ? productCountsInCart : null
                  }
                  color="error"
                >
                  {productCountsInCart > 0 ? (
                    <ShoppingCart />
                  ) : (
                    <ShoppingCartOutlined />
                  )}
                </Badge>
              </IconButton>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ProductHeader;
