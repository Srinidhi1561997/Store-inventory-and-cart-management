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
import { Button } from "@mui/material";
import {
  addToCart,
  removeFromCart,
} from "../services/cartActions/cartActionSlice";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);
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

  const getQuantityById = (id: number): number | undefined => {
    const product = cartItems.find((p) => p.id === id);
    return product?.quantity;
  };
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px", // optional spacing between sections
                flexWrap: "wrap", // responsive fallback
              }}
            >
              <div>
                <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  Add to cart
                </Typography>
                <div
                  className="flex flex-row items-center gap-2"
                  style={{ display: "flex" }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    className="min-w-[36px]"
                    sx={{ minWidth: 36 }}
                    onClick={() => {
                      dispatch(removeFromCart(selectedProduct.id));
                    }}
                  >
                    -
                  </Button>
                  <Typography className="mx-2" style={{ padding: "4px " }}>
                    {getQuantityById(selectedProduct.id) || 0}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    className="min-w-[36px]"
                    sx={{ minWidth: 36 }}
                    onClick={() => {
                      // setProductCounts((prev) => ({
                      //   ...prev,
                      //   [product.id]: (prev[product.id] || 0) + 1,
                      // }));
                      dispatch(addToCart(selectedProduct)); // Add product to cart context
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-column items-center gap-2">
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={700}
                  align="center"
                >
                  ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < Math.round(selectedProduct.rating?.rate ?? 0) ? (
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
                    Rating: {selectedProduct.rating?.rate ?? "N/A"} (
                    {selectedProduct.rating?.count ?? 0} reviews)
                  </Typography>
                </Box>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
