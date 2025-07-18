import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { removeReview } from "../services/reviewActions/reviewActionSlice";

type FeedbackPopupProps = {
  open: boolean;
  onClose: () => void;
};

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.review.reviews);

  const handleDelete = (productId: number) => {
    dispatch(removeReview(productId));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Feedback</DialogTitle>
      <DialogContent dividers>
        {reviews.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No feedback available.
          </Typography>
        ) : (
          reviews.map((review) => (
            <Box key={review.productId} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Product ID: {review.productId}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(review.productId)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mt={0.5}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{
                      color: i < review.rating ? "#FFD700" : "#ccc",
                      fontSize: 20,
                    }}
                  />
                ))}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {review.rating}/5
                </Typography>
              </Box>

              {review.comment && (
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                >
                  {review.comment}
                </Typography>
              )}
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackPopup;
