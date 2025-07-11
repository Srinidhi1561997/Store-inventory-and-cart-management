import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getProductById } from "../services/products/productsSlice";
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
  const { loading, error, selectedProduct } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, selectedProduct, id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedProduct)
    return <Typography color="error">Product not found.</Typography>;

  return (
    <>
      <ProductHeader />
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
        <Card>
          <CardMedia
            component="img"
            image={selectedProduct.image}
            alt={selectedProduct.title}
            sx={{ objectFit: "contain", height: 300, background: "#f9f9f9" }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {selectedProduct.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {selectedProduct.category}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedProduct.description}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              ${selectedProduct.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Rating: {selectedProduct.rating?.rate ?? "N/A"} (
              {selectedProduct.rating?.count ?? 0} reviews)
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
