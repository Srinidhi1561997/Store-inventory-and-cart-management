// src/axios/apiClient.ts
import axiosInstance from "./axiosInstance.ts";
import "./interceptors"; // Important: apply interceptors

// GET
export const fetchProducts = async (id?: number) => {
  const response = await axiosInstance.get(
    id ? `/products/${id}` : "/products"
  );
  return response.data;
};

// POST
// export const createProduct = async (payload) => {
//   const response = await axiosInstance.post("/products", payload);
//   return response.data;
// };

// // PUT
// export const updateProduct = async (id, payload) => {
//   const response = await axiosInstance.put(`/products/${id}`, payload);
//   return response.data;
// };

// DELETE
export const deleteProduct = async (id: number) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.status;
};
