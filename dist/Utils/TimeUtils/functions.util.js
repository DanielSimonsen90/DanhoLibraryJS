"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnixTime = exports.wait = void 0;
function wait(callbackOrTime, time) {
    const callback = typeof callbackOrTime === 'function' ? callbackOrTime : (() => undefined);
    time ??= callbackOrTime;
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve(callback()), time);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.wait = wait;
function getUnixTime(arg) {
    const timestamp = typeof arg === 'number' ? arg : new Date(arg).getTime();
    return Math.floor(timestamp / 1000);
}
exports.getUnixTime = getUnixTime;
