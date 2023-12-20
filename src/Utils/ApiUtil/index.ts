import { ApiUtilOptions, RequestOptions } from "./ApiTypes";
import { Request } from "./RequestUtil";

export class ApiUtil<ApiEndpoints extends string> {
  protected __baseEndpointDev: string;
  protected __baseEndpoint?: string;
  protected __log: boolean;
  
  constructor({ baseEndpointDev, baseEndpoint, log }: ApiUtilOptions) {
    this.__baseEndpointDev = baseEndpointDev;
    this.__baseEndpoint = baseEndpoint;
    this.__log = log ?? false;
  }

  /**
   * Make a request to the API
   * @param path The path to the endpoint
   * @param options The options for the request
   * @returns The response from the API
   */
  public async request<TData>(
    path: ApiEndpoints,
    options?: RequestOptions
  ) {
    return Request<TData, ApiEndpoints>(path, {
      ...options,
      baseEndpoint: this.baseEndpoint
    }, this.__log);
  }

  public get baseEndpoint() {
    const processExists = 'process' in globalThis;

    // @ts-ignore -- process is not defined in the browser
    const isDev = processExists && process.env.NODE_ENV === 'development';

    return isDev ? this.__baseEndpointDev : this.__baseEndpoint ?? this.__baseEndpointDev;
  }
}