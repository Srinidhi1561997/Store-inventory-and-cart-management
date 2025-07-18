import axiosInstance from "./axiosInstance.ts";
import "./interceptors";

export const fetchProducts = async (id?: number) => {
  const response = await axiosInstance.get(
    id ? `/products/${id}` : "/products"
  );
  return response.data;
};
