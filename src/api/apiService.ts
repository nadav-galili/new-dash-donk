// src/api/apiService.ts
import httpClient from "./httpClient";

type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiRequestParams {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
}

export const apiRequest = async ({
  url,
  method,
  data,
  params,
}: ApiRequestParams) => {
  try {
    const response = await httpClient({
      url,
      method,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
