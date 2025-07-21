import ProductHeader from "../components/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getProducts } from "../services/products/productsSlice";
import Box from "@mui/material/Box";
import {
  setHomeScreen,
  setProductCountInCart,
} from "../services/headerActions/headerActionsSlice";
import FloatingFilterDrawer from "../components/FloatingIcon";
import {
  filterByCategory,
  filterBySearch,
  sortByOrders,
} from "../utils/dataUtils";
import ProductList from "../components/ProductList";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  noProduct: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.2rem",
    color: "#777",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});

const Products: React.FC = () => {
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { searchText, sortedText, filteredText } = useSelector(
    (state: RootState) => state.headerActions
  );
  const { data } = useSelector((state: RootState) => state.products);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const searchedProducts = filterBySearch({ data, debouncedSearchText });
  const sortedProducts = sortByOrders({ sortedText, data });
  const filteredProducts = filterByCategory({ filteredText, data });
  const displayProducts = sortedText
    ? sortedProducts
    : filteredText
    ? filteredProducts
    : searchedProducts;

  useEffect(() => {
    const total = Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    dispatch(setProductCountInCart(total));
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(setHomeScreen(true));
    return () => {
      dispatch(setHomeScreen(false));
    };
  }, [dispatch]);

  if (displayProducts.length < 1) {
    return (
      <>
        <ProductHeader />
        <div className={classes.noProduct}>No results found</div>
        <FloatingFilterDrawer />
      </>
    );
  }
  return (
    <div>
      <ProductHeader />
      <Box sx={{ p: 4 }} className="bg-gray-100 min-h-screen">
        <ProductList displayProducts={displayProducts} />
      </Box>
      <FloatingFilterDrawer />
    </div>
  );
};

export default Products;
