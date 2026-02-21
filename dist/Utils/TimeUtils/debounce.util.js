"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInDebounce = exports.debounce = void 0;
const DebounceManager = {
    timers: new Map(),
    abortListeners: new Map(),
};
/**
 * Delay running the callback until delay milliseconds have passed without the function being called again.
 * If the function is called again before the delay has passed, the timer resets.
 *
 * @param debounceId A unique identifier for the debounce instance. Call with the same ID to reset the timer.
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @param signal Optional AbortSignal to cancel the debounced operation
 * @returns A promise that resolves to the result of the callback when it is eventually called, or rejects if aborted
 */
function debounce(debounceId, callback, delay, signal) {
    const { timers, abortListeners } = DebounceManager;
    // Clean up existing debounce with the same ID
    if (timers.has(debounceId)) {
        clearTimeout(timers.get(debounceId));
        timers.delete(debounceId);
        const existingListener = abortListeners.get(debounceId);
        if (existingListener && signal) {
            signal.removeEventListener('abort', existingListener);
        }
        abortListeners.delete(debounceId);
    }
    const promise = new Promise((resolve, reject) => {
        // Check if already aborted
        if (signal?.aborted) {
            const error = new DOMException('Debounce aborted', 'AbortError');
            reject(error);
            return;
        }
        const timeoutId = setTimeout(() => {
            timers.delete(debounceId);
            abortListeners.delete(debounceId);
            try {
                resolve(callback());
            }
            catch (error) {
                reject(error);
            }
        }, delay);
        timers.set(debounceId, timeoutId);
        // Set up abort listener
        if (signal) {
            const abortListener = () => {
                clearTimeout(timeoutId);
                timers.delete(debounceId);
                abortListeners.delete(debounceId);
                const error = new DOMException('Debounce aborted', 'AbortError');
                reject(error);
            };
            signal.addEventListener('abort', abortListener, { once: true });
            abortListeners.set(debounceId, abortListener);
        }
    });
    return promise;
}
exports.debounce = debounce;
/**
 * Wrap a callback in a debounce, allowing it to be called multiple times, but only run after the delay has passed without it being called again
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @returns An object containing the debounced function, an AbortController to cancel operations, and the abort method for convenience
 */
function wrapInDebounce(callback, delay) {
    const controller = new AbortController();
    return {
        debounced: (...args) => debounce(Symbol().toString(), () => callback(...args), delay, controller.signal),
        controller,
        abort: () => controller.abort(),
    };
}
exports.wrapInDebounce = wrapInDebounce;
