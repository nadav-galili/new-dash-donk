type HttpMethod = "get" | "post" | "put" | "delete";
interface ApiRequestParams {
    url: string;
    method: HttpMethod;
    data?: any;
    params?: any;
}
export declare const apiRequest: ({ url, method, data, params, }: ApiRequestParams) => Promise<any>;
export {};
