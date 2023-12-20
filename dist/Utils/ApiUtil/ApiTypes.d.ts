export type TParam = string | undefined;
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RequestOptions<TBody = any> = Omit<RequestInit, 'method' | 'body'> & {
    method?: HttpMethods;
    body?: TBody;
    noHeaders?: boolean;
    controller?: AbortController;
    query?: Record<string, string | undefined>;
    baseEndpoint?: string;
};
export type ApiUtilOptions = {
    baseEndpointDev: string;
    baseEndpoint?: string;
    log?: boolean;
};
