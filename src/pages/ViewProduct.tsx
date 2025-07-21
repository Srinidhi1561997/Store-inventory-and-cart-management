import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  getProductById,
  type Product,
} from "../services/products/productsSlice";
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
import { getQuantityById } from "../utils/dataUtils";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    maxWidth: 600,
    margin: "32px auto 0 auto",
    padding: 16,
  },
  media: {
    objectFit: "contain",
    height: 300,
    background: "#f9f9f9",
  },
  headerSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  priceSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 8,
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 8,
    color: "rgba(0, 0, 0, 0.6)",
  },
  categoryText: {
    color: "#888",
  },
  description: {
    marginBottom: 16,
  },
  cartSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },
  cartButtons: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  countText: {
    padding: 4,
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
const ProductDetails: React.FC = () => {
  const classes = useStyles();
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

  const handleSentimentClose = () => {
    setIsSentimentOpen(false);
  };
  const handleSubmit = (rating: number, comment?: string) => {
    const productId = selectedProduct.id;
    dispatch(addReview({ productId, rating, comment }));
  };

  const getProductCount = (product: Product) => {
    const id = product.id;
    return getQuantityById({ id, cartItems }) | 0;
  };
  return (
    <div>
      <ProductHeader />
      <Box className={classes.container}>
        <Card>
          <CardMedia
            component="img"
            image={selectedProduct.image}
            alt={selectedProduct.title}
            className={classes.media}
          />
          <CardContent>
            <Box className={classes.headerSection}>
              <Typography variant="h5" fontWeight={700}>
                {selectedProduct.title}
              </Typography>
              <div className={classes.priceSection}>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Box className={classes.ratingBox}>
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
                  <Typography variant="body2" className={classes.ratingText}>
                    Rating: {selectedProduct.rating?.rate ?? "N/A"} (
                    {selectedProduct.rating?.count ?? 0} reviews)
                  </Typography>
                </Box>
              </div>
            </Box>

            <Typography
              variant="subtitle1"
              className={classes.categoryText}
              gutterBottom
            >
              {selectedProduct.category}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {selectedProduct.description}
            </Typography>

            <div className={classes.cartSection}>
              <div>
                <Typography style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  Add to cart
                </Typography>
                <div className={classes.cartButtons}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ minWidth: 36 }}
                    onClick={() => dispatch(removeFromCart(selectedProduct.id))}
                  >
                    -
                  </Button>
                  <Typography className={classes.countText}>
                    {getProductCount(selectedProduct)}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ minWidth: 36 }}
                    onClick={() => dispatch(addToCart(selectedProduct))}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className={classes.actionButtons}>
                <Button variant="text" onClick={() => setIsSentimentOpen(true)}>
                  {reviews.length > 0 &&
                  reviews.find((i) => i.productId === selectedProduct.id)
                    ? "Edit Review"
                    : "Write Review"}
                </Button>
                <Button variant="text" onClick={() => setIsFeedBack(true)}>
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
    </div>
  );
};

export default ProductDetails;
