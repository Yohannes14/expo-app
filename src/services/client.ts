import { Config } from "@/config/env";
import { handleApiError } from "@/utils/apiError";
import axios, { AxiosError, AxiosInstance } from "axios";

export const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    timeout: Config.api.timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // Response Interceptor - Automatic error handling
  api.interceptors.response.use(
    (response) => {
      // Automatically return response.data instead of full response
      return response.data;
    },
    (error: AxiosError) => {
      // Convert AxiosError to our custom ApiError
      const apiError = handleApiError(error);
      return Promise.reject(apiError);
    },
  );

  return api;
};
