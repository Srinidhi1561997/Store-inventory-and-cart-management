// src/axios/interceptors.js
import axiosInstance from "./axiosInstance";

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase();
    switch (method) {
      case "GET":
        // console.log("🟢 GET Request:", config.url);
        break;
      case "POST":
        // console.log("🟡 POST Request:", config.url, config.data);
        break;
      case "PUT":
        // console.log("🔵 PUT Request:", config.url, config.data);
        break;
      case "DELETE":
        console.log("🔴 DELETE Request:", config.url);
        break;
      default:
      // console.log("Request:", method, config.url);
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
        // console.log("🟢 GET Response:", response.data);
        break;
      case "POST":
        // console.log("🟡 POST Response:", response.data);
        break;
      case "PUT":
        // console.log("🔵 PUT Response:", response.data);
        break;
      case "DELETE":
        console.log("🔴 DELETE Response:", response.status);
        break;
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
