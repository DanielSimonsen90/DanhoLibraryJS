import { ApiUtilOptions, RequestOptions } from "./ApiTypes";
export declare class ApiUtil<ApiEndpoints extends string> {
    protected __baseEndpointDev: string;
    protected __baseEndpoint?: string;
    protected __log: boolean;
    constructor({ baseEndpointDev, baseEndpoint, log }: ApiUtilOptions);
    /**
     * Make a request to the API
     * @param path The path to the endpoint
     * @param options The options for the request
     * @returns The response from the API
     */
    request<TData>(path: ApiEndpoints, options?: RequestOptions): Promise<{
        success: boolean;
        status: number;
        data: TData;
        text: string;
    }>;
    get baseEndpoint(): string;
}
