import ProductHeader from "../components/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getProducts, type Product } from "../services/products/productsSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  setHomeScreen,
  setProductCountInCart,
} from "../services/headerActions/headerActionsSlice";

const ProductList: React.FC = () => {
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [productCounts, setProductCounts] = useState<{ [id: number]: number }>(
    {}
  );
  const { searchText, sortedText, filteredText } = useSelector(
    (state: RootState) => state.headerActions
  );

  const { data } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Filter products by search text
  const searchedProducts = data.filter((product: Product) =>
    product.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const sortedProducts = [...data].sort((a, b) => {
    if (sortedText === "asc") {
      return a.price - b.price;
    } else if (sortedText === "desc") {
      return b.price - a.price;
    } else if (sortedText === "ratings") {
      return b.rating.rate - a.rating.rate;
    } else if (sortedText === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortedText === "Clear" || sortedText === "") {
      return 0;
    }

    return 0;
  });

  const filteredProducts = data.filter((product: Product) => {
    if (filteredText === "electronics") {
      return product.category === "electronics";
    } else if (filteredText === "jewelery") {
      return product.category === "jewelery";
    } else if (filteredText === "men's clothing") {
      return product.category === "men's clothing";
    } else if (filteredText === "women's clothing") {
      return product.category === "women's clothing";
    } else if (filteredText === "clear" || filteredText === "") {
      return true;
    }
  });
  const displayProducts = sortedText
    ? sortedProducts
    : filteredText
    ? filteredProducts
    : searchedProducts;

  useEffect(() => {
    // Utility function to sum all product counts
    const total = Object.values(productCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    dispatch(setProductCountInCart(total));
  }, [productCounts, dispatch]);

  useEffect(() => {
    dispatch(setHomeScreen(true));
    return () => {
      dispatch(setHomeScreen(false));
    };
  }, [dispatch]);

  console.log(
    "Product Counts:",
    productCounts,
    filteredText,
    sortedText,
    searchText
  );
  return (
    <>
      <ProductHeader />
      <Box sx={{ p: 4 }} className="bg-gray-100 min-h-screen">
        <Grid container spacing={4} justifyContent="center">
          {displayProducts.map((product) => (
            <Grid key={product.id} sx={{ display: "flex" }}>
              <Card
                sx={{
                  width: 300,
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    objectFit: "contain",
                    height: 200,
                    background: "#f9f9f9",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < Math.round(product.rating?.rate ?? 0) ? (
                        <StarIcon
                          key={i}
                          sx={{ color: "#FFD700", fontSize: 20 }}
                        />
                      ) : (
                        <StarBorderIcon
                          key={i}
                          sx={{ color: "#FFD700", fontSize: 20 }}
                        />
                      )
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {product.rating?.rate ?? ""} ({product.rating?.count ?? 0}{" "}
                      reviews)
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  className="flex flex-row items-center justify-between w-full gap-2"
                  style={{ justifyContent: "space-between" }}
                >
                  <div
                    className="flex flex-row items-center gap-2"
                    style={{ display: "flex" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      className="min-w-[36px]"
                      sx={{ minWidth: 36 }}
                      onClick={() =>
                        setProductCounts((prev) => ({
                          ...prev,
                          [product.id]: Math.max(
                            (prev[product.id] || 0) - 1,
                            0
                          ),
                        }))
                      }
                    >
                      -
                    </Button>
                    <Typography className="mx-2" style={{ padding: "4px " }}>
                      {productCounts[product.id] || 0}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      className="min-w-[36px]"
                      sx={{ minWidth: 36 }}
                      onClick={() =>
                        setProductCounts((prev) => ({
                          ...prev,
                          [product.id]: (prev[product.id] || 0) + 1,
                        }))
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    component={Link}
                    to={`/productDetails/${product.id}`}
                    size="small"
                    variant="contained"
                    className="ml-auto"
                    onClick={() => {
                      dispatch(setHomeScreen(false));
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;
