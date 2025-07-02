import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
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
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem component={Link} to="/cart" onClick={handleClose}>
            Cart
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem component={Link} to="/orders" onClick={handleClose}>
            Order History
          </MenuItem>
        </Menu>
        <div
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "auto",
          }}
        >
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            SignOut
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
