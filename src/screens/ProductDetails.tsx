import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getProducts, type Product } from "../services/products/productsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import ProductHeader from "../components/Header";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!data.length) {
      dispatch(getProducts());
    }
  }, [dispatch, data.length]);

  const product: Product | undefined = data.find((p) => p.id === Number(id));

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product)
    return <Typography color="error">Product not found.</Typography>;

  return (
    <>
      <ProductHeader />
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
        <Card>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: "contain", height: 300, background: "#f9f9f9" }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {product.category}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Rating: {product.rating?.rate ?? "N/A"} (
              {product.rating?.count ?? 0} reviews)
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
