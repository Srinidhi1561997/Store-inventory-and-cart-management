import React, { useEffect, useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation, useNavigate } from "react-router-dom";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import SignOutModal from "./Modal";

const drawerWidth = 240;

const SidebarList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { productCountsInCart } = useSelector(
    (state: RootState) => state.headerActions
  );
  const menuItems = [
    { label: "Products", icon: <HomeIcon />, path: "/products" },
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
  ];
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const closeModal = () => {
    setIsModal(false);
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
        {menuItems
          .filter((item) => item.path !== location.pathname)
          .map((item) => (
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
        {["SignOut"].map((text) => (
          <ListItemButton onClick={() => setIsModal(true)}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
      <SignOutModal open={isModal} handleClose={closeModal} />
    </Drawer>
  );
};

export default SidebarList;
