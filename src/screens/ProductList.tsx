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

const ProductList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const [sortedText, setSortedText] = useState<string>("");
  const [filteredText, setFilteredText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
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
    } else if (sortedText === "Clear") {
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
    } else if (filteredText === "clear") {
      return true;
    }
  });
  const displayProducts = sortedText
    ? sortedProducts
    : filteredText
    ? filteredProducts
    : searchedProducts;

  return (
    <>
      <ProductHeader
        searchText={searchText}
        setSearchText={setSearchText}
        setSortedText={setSortedText}
        setFilteredText={setFilteredText}
      />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Products
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {displayProducts.map((product) => (
            <Grid key={product.id} sx={{ display: "flex" }}>
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  height: 400,
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
                <CardActions>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    size="small"
                    variant="contained"
                    sx={{ ml: "auto" }}
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
