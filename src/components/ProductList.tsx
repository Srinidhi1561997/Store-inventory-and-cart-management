import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import {
  getProductById,
  type Product,
} from "../services/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getQuantityById } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartActions/cartActionSlice";
import { Link } from "react-router-dom";

const ProductList = ({ displayProducts }: { displayProducts: Product[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const getProductCount = (product: Product) => {
    const id = product.id;
    return getQuantityById({ id, cartItems }) > 0
      ? navigate("/cart")
      : dispatch(addToCart(product));
  };
  const getActionButton = (product: Product) => {
    const id = product.id;
    return getQuantityById({ id, cartItems }) > 0
      ? "Move to cart"
      : "Add to cart";
  };
  return (
    <Grid container spacing={4} justifyContent="center">
      {displayProducts.map((product) => (
        <Grid key={product.id} sx={{ display: "flex" }}>
          <Card
            sx={{
              width: 300,
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              justifyContent: "space-between",
            }}
          >
            {product ? (
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
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            )}
            {product ? (
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
            ) : (
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
            )}
            {product ? (
              <CardActions
                className="flex flex-row items-center justify-between w-full gap-2"
                style={{ justifyContent: "space-between" }}
              >
                <div
                  className="flex flex-row items-center gap-2"
                  style={{ display: "flex" }}
                >
                  <Button onClick={() => getProductCount(product)}>
                    {getActionButton(product)}
                  </Button>
                </div>
                <Button
                  component={Link}
                  to={`/productDetails/${product.id}`}
                  size="small"
                  variant="contained"
                  className="ml-auto"
                  onClick={() => {
                    dispatch(setHomeScreen(false));
                    dispatch(getProductById(product.id));
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            ) : (
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
