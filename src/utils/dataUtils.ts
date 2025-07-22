import type { CartState } from "../services/cartActions/cartActionSlice";
import type { Product } from "../services/products/productsSlice";

export const filterBySearch = ({
  data,
  debouncedSearchText,
}: {
  data: Product[];
  debouncedSearchText: string;
}): Product[] => {
  return data.filter((product: Product) =>
    product.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );
};

export const sortByOrders = ({
  sortedText,
  data,
}: {
  sortedText: string;
  data: Product[];
}): Product[] => {
  return [...data].sort((a, b) => {
    if (sortedText === "asc") {
      return a.price - b.price;
    } else if (sortedText === "desc") {
      return b.price - a.price;
    } else if (sortedText === "ratings") {
      return b.rating.rate - a.rating.rate;
    } else if (sortedText === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortedText === "Clear" || sortedText === "") {
      return 0;
    }
    return 0;
  });
};

export const filterByCategory = ({
  filteredText,
  data,
}: {
  filteredText: string;
  data: Product[];
}): Product[] => {
  return data.filter((product: Product) => {
    if (filteredText === "electronics") {
      return product.category === "electronics";
    } else if (filteredText === "jewelery") {
      return product.category === "jewelery";
    } else if (filteredText === "men's clothing") {
      return product.category === "men's clothing";
    } else if (filteredText === "women's clothing") {
      return product.category === "women's clothing";
    } else if (filteredText === "clear" || filteredText === "") {
      return true;
    }
    return true;
  });
};

export const getQuantityById = ({
  id,
  cartItems,
}: {
  id: number;
  cartItems: CartState["cartItems"];
}): number => {
  const product = cartItems.find((p) => p.id === id);
  return product ? product.quantity : 0;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Processing":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

export const loginUserData = [
  {
    userName: "user1",
    password: "Password@123",
  },
  {
    userName: "user2",
    password: "Password@456",
  },
  {
    userName: "user3",
    password: "Password@789",
  },
];
