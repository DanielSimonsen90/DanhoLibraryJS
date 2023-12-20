import { RequestOptions } from "./ApiTypes";
/**
 * Makes a request to the API
 * @param path Api endpoint to request
 * @param options Additional options for the request
 * @returns The response from the API
 */
export declare function Request<TData, ApiEndpoints extends string>(path: ApiEndpoints, { method, body, noHeaders, controller, query, baseEndpoint }?: RequestOptions | undefined, log?: boolean): Promise<{
    success: boolean;
    status: number;
    data: TData;
    text: string;
}>;
/**
 * Ensures that the path starts with a /
 * @param path Path string
 * @returns Path that starts with a /
 */
export declare function ensureSlash(path: string): string;
