import React, { useState } from "react";
import {
  Drawer,
  Box,
  Fab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  setFilteredText,
  setHomeScreen,
  setSearchText,
  setSortedText,
} from "../services/headerActions/headerActionsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

const FloatingFilterDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchText = useSelector(
    (state: RootState) => state.headerActions.searchText
  );
  const filterCategory = useSelector(
    (state: RootState) => state.headerActions.filteredText
  );
  const sortOrder = useSelector(
    (state: RootState) => state.headerActions.sortedText
  );
  //   const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
    dispatch(setFilteredText(""));
    dispatch(setSearchText(""));
    dispatch(setSortedText(""));
  };

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="filter"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1300,
        }}
      >
        <FilterListIcon />
      </Fab>

      {/* Right Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 300, p: 2 },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>

          {/* Search */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => {
              dispatch(setSearchText(e.target.value));
              dispatch(setSortedText(""));
              dispatch(setFilteredText(""));
            }}
            sx={{ mb: 2 }}
          />

          {/* Filter Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => {
                dispatch(setFilteredText(e.target.value));
                dispatch(setSearchText(""));
                dispatch(setSortedText(""));
                setDrawerOpen(false);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="jewelery">Jewelery</MenuItem>
              <MenuItem value="men's clothing">Men's Clothing</MenuItem>
              <MenuItem value="women's clothing">Women's Clothing</MenuItem>
              <MenuItem value="clear">Clear</MenuItem>
            </Select>
          </FormControl>

          {/* Sort Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sortOrder}
              label="Sort by Price"
              onChange={(e) => {
                dispatch(setSortedText(e.target.value));
                dispatch(setSearchText(""));
                dispatch(setFilteredText(""));
                setDrawerOpen(false);
              }}
            >
              <MenuItem value="asc">Price Low to High</MenuItem>
              <MenuItem value="desc">Price High to Low</MenuItem>
              <MenuItem value="ratings">Ratings</MenuItem>
              <MenuItem value="title">A-Z</MenuItem>
              <MenuItem value="clear">Clear</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    </>
  );
};

export default FloatingFilterDrawer;
