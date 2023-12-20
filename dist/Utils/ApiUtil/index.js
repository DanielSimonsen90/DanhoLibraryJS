"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUtil = void 0;
const RequestUtil_1 = require("./RequestUtil");
class ApiUtil {
    __baseEndpointDev;
    __baseEndpoint;
    __log;
    constructor({ baseEndpointDev, baseEndpoint, log }) {
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
    async request(path, options) {
        return (0, RequestUtil_1.Request)(path, {
            ...options,
            baseEndpoint: this.baseEndpoint
        }, this.__log);
    }
    get baseEndpoint() {
        const processExists = 'process' in globalThis;
        // @ts-ignore -- process is not defined in the browser
        const isDev = processExists && process.env.NODE_ENV === 'development';
        return isDev ? this.__baseEndpointDev : this.__baseEndpoint ?? this.__baseEndpointDev;
    }
}
exports.ApiUtil = ApiUtil;
