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
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  gridItem: {
    display: "flex",
  },
  card: {
    width: 300,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    justifyContent: "space-between",
  },
  image: {
    objectFit: "contain",
    height: 200,
    background: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  category: {
    marginBottom: 8,
  },
  price: {
    fontWeight: 700,
    color: "#1976d2",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 8px 8px 8px",
  },
  actionLeft: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
});
const ProductList = ({ displayProducts }: { displayProducts: Product[] }) => {
  const classes = useStyles();
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
        <Grid key={product.id} item className={classes.gridItem}>
          <Card className={classes.card}>
            {product ? (
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                className={classes.image}
              />
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            )}

            {product ? (
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={classes.title}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={classes.category}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.price}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Box className={classes.ratingBox}>
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
                  <Typography className={classes.ratingText}>
                    {product.rating?.rate ?? ""} ({product.rating?.count ?? 0} reviews)
                  </Typography>
                </Box>
              </CardContent>
            ) : (
              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            )}

            {product ? (
              <CardActions className={classes.actions}>
                <div className={classes.actionLeft}>
                  <Button onClick={() => getProductCount(product)}>
                    {getActionButton(product)}
                  </Button>
                </div>
                <Button
                  component={Link}
                  to={`/productDetails/${product.id}`}
                  size="small"
                  variant="contained"
                  onClick={() => {
                    dispatch(setHomeScreen(false));
                    dispatch(getProductById(product.id));
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            ) : (
              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
