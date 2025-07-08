import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import SortIcon from "@mui/icons-material/Sort";
import HomeIcon from "@mui/icons-material/Home";
import {
  FilterAltOffOutlined,
  FilterAltOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import {
  setFilteredText,
  setHomeScreen,
  setSearchText,
  setSortedText,
} from "../services/headerActions/headerActionsSlice";
import { setLoginStatus } from "../services/login/login";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 200,
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const ProductHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const isSortopen = Boolean(sortAnchorEl);
  const isFilteropen = Boolean(filterAnchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchText, productCountsInCart, isHomescreen } = useSelector(
    (state: RootState) => state.headerActions
  );
  const isLoggedIn = useSelector((state: RootState) => state);

  useEffect(() => {
    // If not logged in and not on login page, redirect to login
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("menu menu clicked", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (value: string) => {
    dispatch(setSortedText(value));
    setSortAnchorEl(null);
  };
  const handleFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterClose = (value: string) => {
    dispatch(setFilteredText(value));
    setFilterAnchorEl(null);
  };
  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isHomescreen ? (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchText}
                  onChange={(e) => dispatch(setSearchText(e.target.value))}
                />
              </Search>
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
              <IconButton
                onClick={handleSortMenu}
                edge="end"
                color="inherit"
                aria-label="sort"
                sx={{
                  transform: isSortopen ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.3s",
                }}
              >
                <SortIcon />
              </IconButton>
              <IconButton
                onClick={handleFilterMenu}
                edge="end"
                color="inherit"
                aria-label="sort"
              >
                {isFilteropen ? (
                  <FilterAltOffOutlined />
                ) : (
                  <FilterAltOutlined />
                )}
              </IconButton>
            </>
          ) : (
            <IconButton
              component={Link}
              edge="end"
              color="inherit"
              aria-label="sort"
              to="/products"
              onClick={() => dispatch(setHomeScreen(true))}
            >
              <HomeIcon />
            </IconButton>
          )}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "white", marginLeft: 16 }}
            onClick={() => {
              dispatch(setLoginStatus(false));
              dispatch(setHomeScreen(false));
            }}
          >
            SignOut
          </Link>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            component={Link}
            to="/cart"
            onClick={handleClose}
            sx={{ position: "relative", pr: 4 }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Cart
              {productCountsInCart > 0 && (
                <Badge
                  badgeContent={productCountsInCart}
                  color="error"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: -32,
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                  overlap="circular"
                />
              )}
            </Box>
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem component={Link} to="/orders" onClick={handleClose}>
            Order History
          </MenuItem>
          {!isHomescreen && (
            <MenuItem
              component={Link}
              to="/products"
              onClick={() => {
                handleClose();
                dispatch(setHomeScreen(true));
              }}
            >
              Products
            </MenuItem>
          )}
        </Menu>
        <Menu
          id="sort-menu"
          anchorEl={sortAnchorEl}
          open={isSortopen}
          onClose={handleSortClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
              sx: {
                py: 0,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => handleSortClose("asc")}
            value={"price Low to High"}
          >
            price Low to High
          </MenuItem>
          <MenuItem
            onClick={() => handleSortClose("desc")}
            value={"price High to Low"}
          >
            price High to Low
          </MenuItem>
          <MenuItem
            onClick={() => handleSortClose("ratings")}
            value={"ratings"}
          >
            Ratings
          </MenuItem>
          <MenuItem onClick={() => handleSortClose("title")} value={"title"}>
            A-Z
          </MenuItem>
          <MenuItem onClick={() => handleSortClose("Clear")} value={"Clear"}>
            Clear
          </MenuItem>
        </Menu>
        <Menu
          id="filter-menu"
          anchorEl={filterAnchorEl}
          open={isFilteropen}
          onClose={handleFilterClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
              sx: {
                py: 0,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => handleFilterClose("electronics")}
            value={"electronics"}
          >
            Electronics
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterClose("jewelery")}
            value={"jewelery"}
          >
            Jewelery
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterClose("men's clothing")}
            value={"men's clothing"}
          >
            Men's Clothing
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterClose("women's clothing")}
            value={"women's clothing"}
          >
            Women's Clothing
          </MenuItem>
          <MenuItem onClick={() => handleFilterClose("clear")} value={"Clear"}>
            Clear
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default ProductHeader;
