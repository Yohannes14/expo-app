import { AxiosError } from "axios";
export type ApiError =
  | { type: "HTTP_ERROR"; status: number; message: string }
  | { type: "NETWORK_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      type: "HTTP_ERROR",
      status: error.response.status,
      message: error.response.data as string,
    };
  }
  if (error.request) {
    return {
      type: "NETWORK_ERROR",
      message: "No response from server",
    };
  }
  return {
    type: "UNKNOWN_ERROR",
    message: error.message,
  };
};
