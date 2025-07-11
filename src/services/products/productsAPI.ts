import axios from "axios";

export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};
