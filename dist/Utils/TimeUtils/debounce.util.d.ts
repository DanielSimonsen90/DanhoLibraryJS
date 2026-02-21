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
export declare function debounce<T>(debounceId: string, callback: () => T, delay: number, signal?: AbortSignal): Promise<T>;
/**
 * Wrap a callback in a debounce, allowing it to be called multiple times, but only run after the delay has passed without it being called again
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @returns An object containing the debounced function, an AbortController to cancel operations, and the abort method for convenience
 */
export declare function wrapInDebounce<T>(callback: (...args: T[]) => void, delay: number): {
    debounced: (...args: T[]) => Promise<void>;
    controller: AbortController;
    abort: () => void;
};
