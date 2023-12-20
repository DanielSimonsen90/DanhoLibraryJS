"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureSlash = exports.Request = void 0;
/**
 * Makes a request to the API
 * @param path Api endpoint to request
 * @param options Additional options for the request
 * @returns The response from the API
 */
async function Request(path, 
// Destructor the options object, if it's undefined then set it to an empty object
{ method = 'GET', body, noHeaders = false, controller = new AbortController(), query, baseEndpoint } = {}, log = false) {
    // console.log(`Requesting ${path} with method ${method}`);
    // Construct the endpoint for the request
    const endpoint = (() => {
        const result = baseEndpoint + ensureSlash(path);
        if (path.includes('?') || !query)
            return result;
        // If the query object is defined, then construct a query string from it
        const queryString = Object.entries(query)
            .map(([key, value]) => value ? `${key}=${value}` : '')
            .join('&');
        return path.includes('?') ? `${result}&${queryString}` : `${result}?${queryString}`;
    })();
    // Construct the request init object to pass to the fetch function
    const init = {
        method,
        body: body ? !noHeaders ? JSON.stringify(body) : body : undefined,
        headers: !noHeaders ? { 'Content-Type': 'application/json' } : undefined,
        signal: controller.signal,
        credentials: 'include',
        mode: 'cors'
    };
    // Make the request, log any errors, and throw them again
    const res = await fetch(endpoint, init).catch(err => {
        console.error(`Failed to [${method}] ${path}`, err);
        throw err;
    });
    if (log)
        console.log(`[${method}] ${path} responded with ${res.status}`, res);
    // Clone the response so that it can be converted to JSON and text
    const clone = res.clone();
    // All successful responses are in the 200s, so check if the status code starts with 2
    const isSuccessful = res.status.toString().startsWith('2');
    // This try-catch block is used to catch any errors when converting the response to JSON
    // If the response is not jsonable, then the catch will return null for the data
    try {
        return {
            success: isSuccessful,
            status: res.status,
            data: await res.json(),
            text: await clone.text(),
        };
    }
    catch {
        return {
            success: isSuccessful,
            status: res.status,
            data: null,
            text: await clone.text(),
        };
    }
}
exports.Request = Request;
/**
 * Ensures that the path starts with a /
 * @param path Path string
 * @returns Path that starts with a /
 */
function ensureSlash(path) {
    return path.startsWith('/') ? path : '/' + path;
}
exports.ensureSlash = ensureSlash;
