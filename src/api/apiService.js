// src/api/apiService.ts
import httpClient from "./httpClient";
export const apiRequest = async ({ url, method, data, params, }) => {
    try {
        const response = await httpClient({
            url,
            method,
            data,
            params,
        });
        return response.data;
    }
    catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};
