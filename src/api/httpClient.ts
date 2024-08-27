// src/api/httpClient.ts
import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: `https://backend-donk-ae6a3b674658.herokuapp.com/`, // Replace with your actual API base URL
  timeout: 10000, // You can adjust this timeout based on your needs
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor if you need to add token or manipulate headers
httpClient.interceptors.request.use(
  (config) => {
    // Add authorization token here if needed
    // config.headers.Authorization = `Bearer ${your_token}`;
    const token = localStorage.getItem("adminAuthToken");
    if (token) {
      config.headers["x-admin-token"] = token;
    }
    const xToken = localStorage.getItem("xToken");
    if (xToken) {
      config.headers["x-auth-token"] = xToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses globally
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally here
    return Promise.reject(error);
  }
);

export default httpClient;
