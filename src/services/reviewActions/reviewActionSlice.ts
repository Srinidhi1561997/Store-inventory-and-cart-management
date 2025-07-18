import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ReviewActionState = {
  productId: number;
  rating: number;
  comment?: string;
};
interface ReviewState {
  reviews: ReviewActionState[];
}

const initialState: ReviewState = {
  reviews: [],
};
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<ReviewActionState>) => {
      const existing = state.reviews.find(
        (r) => r.productId === action.payload.productId
      );
      if (existing) {
        existing.rating = action.payload.rating;
        existing.comment = action.payload.comment;
      } else {
        state.reviews.push(action.payload);
      }
    },
    removeReview: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter(
        (r) => r.productId !== action.payload
      );
    },
  },
});

export const { addReview, removeReview } = reviewSlice.actions;
export default reviewSlice.reducer;
