import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface SentimentPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const SentimentPopup: React.FC<SentimentPopupProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string | undefined>("");
  const { reviews } = useSelector((state: RootState) => state.review);
  const { selectedProduct } = useSelector((state: RootState) => state.products);
  const handleSubmit = () => {
    if (rating) {
      onSubmit(rating, comment);
      onClose();
      setRating(0);
      setComment("");
    }
  };

  useEffect(() => {
    if (
      reviews.length > 0 &&
      reviews.find((i) => i.productId === selectedProduct?.id)
    ) {
      const productReview = reviews.filter((item) => {
        if (item.productId === selectedProduct?.id) {
          return item;
        }
      });
      setComment(productReview[0]?.comment);
      setRating(productReview[0]?.rating);
    } else {
      setComment("");
      setRating(0);
    }
  }, [reviews]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {reviews.length > 0 &&
        reviews.find((i) => i.productId === selectedProduct?.id)
          ? "Edit Your Review"
          : "Leave Your Review"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="subtitle1" mb={1}>
            Rate your experience
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
          />
          <TextField
            label="Comments (optional)"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={rating === 0}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SentimentPopup;
