/**
 * Allow callback to be run once every cooldown period, regardless of calls
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback
 */
export declare function throttle<T>(throttleId: string, callback: () => T, cooldown: number): T;
/**
 * Wrap a callback in a throttle, allowing it to be called multiple times, but only run once every cooldown period
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback that can be called multiple times, but will only run once every cooldown period
 */
export declare function wrapInThrottle<T>(callback: (...args: T[]) => void, cooldown: number): (...args: T[]) => void;
export declare function isThrottleOnCooldown(throttleId: string): boolean;
