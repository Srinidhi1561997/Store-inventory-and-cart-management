import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com", // public mock API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
