"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLEvent = void 0;
/**
 * Create HTMLEvent object from function
 * @param name Name of the event
 * @param handler Handler for the event
 * @returns Parameters as object
 */
function HTMLEvent(name, handler) {
    return { name, handler };
}
exports.HTMLEvent = HTMLEvent;
exports.default = HTMLEvent;
