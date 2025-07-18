import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase();
    switch (method) {
      case "GET":
        break;
      default:
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    switch (method) {
      case "GET":
        break;
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
