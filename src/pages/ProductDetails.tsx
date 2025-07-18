import React, { useEffect, useState } from "react";
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
import SentimentPopup from "../components/SentimentComponent";
import { addReview } from "../services/reviewActions/reviewActionSlice";
import FeedbackPopup from "../components/ListFeedback";
import { setProductCountInCart } from "../services/headerActions/headerActionsSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isSentimentOpen, setIsSentimentOpen] = useState<boolean>(false);
  const [isFeedBack, setIsFeedBack] = useState<boolean>(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { loading, error, selectedProduct } = useSelector(
    (state: RootState) => state.products
  );
  const { reviews } = useSelector((state: RootState) => state.review);
  useEffect(() => {
    if (!selectedProduct) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, selectedProduct, id]);

  useEffect(() => {
    const total = Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    dispatch(setProductCountInCart(total));
  }, [cartItems, dispatch]);

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
  const handleSentimentClose = () => {
    setIsSentimentOpen(false);
  };
  const handleSubmit = (rating: number, comment?: string) => {
    const productId = selectedProduct.id;
    dispatch(addReview({ productId, rating, comment }));
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {selectedProduct.title}
              </Typography>
              <div className="flex flex-column items-center gap-2">
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={700}
                  align="center"
                >
                  ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
            </Box>
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
                      dispatch(addToCart(selectedProduct)); // Add product to cart context
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-column items-center gap-2">
                <Button variant="text" onClick={() => setIsSentimentOpen(true)}>
                  {reviews.length > 0 &&
                  reviews.find((i) => i.productId === selectedProduct.id)
                    ? "Edit Review"
                    : "Write Review"}
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setIsFeedBack(true);
                  }}
                >
                  View feedback
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
      <SentimentPopup
        open={isSentimentOpen}
        onClose={handleSentimentClose}
        onSubmit={handleSubmit}
      />
      <FeedbackPopup open={isFeedBack} onClose={() => setIsFeedBack(false)} />
    </>
  );
};

export default ProductDetails;
