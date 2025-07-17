import React, { useEffect } from "react";
import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoginStatus } from "../services/login/loginSlice";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

const SidebarList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const { productCountsInCart, isHomescreen } = useSelector(
    (state: RootState) => state.headerActions
  );
  const menuItems = [
    {
      label: "Cart",
      icon: (
        <Badge
          badgeContent={productCountsInCart > 0 ? productCountsInCart : null}
          color="error"
        >
          {productCountsInCart > 0 ? (
            <ShoppingCart />
          ) : (
            <ShoppingCartOutlined />
          )}
        </Badge>
      ),
      path: "/cart",
    },
    { label: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { label: "Order History", icon: <HistoryIcon />, path: "/orders" },
  ];
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    dispatch(setHomeScreen(false));
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              dispatch(setHomeScreen(false));
            }}
          >
            <>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {["SignOut"].map((text, index) => (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarList;
