"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThrottleOnCooldown = exports.wrapInThrottle = exports.throttle = void 0;
const ThrottleManager = {
    cooldowns: new Map(),
    results: new Map(),
};
/**
 * Allow callback to be run once every cooldown period, regardless of calls
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback
 */
function throttle(throttleId, callback, cooldown) {
    const { cooldowns, results } = ThrottleManager;
    const isCooldown = cooldowns.get(throttleId) ?? false;
    if (isCooldown)
        return results.get(throttleId);
    const result = callback();
    setTimeout(() => {
        cooldowns.delete(throttleId);
        results.delete(throttleId);
    }, cooldown);
    cooldowns.set(throttleId, true);
    results.set(throttleId, result);
    return result;
}
exports.throttle = throttle;
/**
 * Wrap a callback in a throttle, allowing it to be called multiple times, but only run once every cooldown period
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback that can be called multiple times, but will only run once every cooldown period
 */
function wrapInThrottle(callback, cooldown) {
    const throttleId = Symbol().toString();
    return (...args) => throttle(throttleId, () => callback(...args), cooldown);
}
exports.wrapInThrottle = wrapInThrottle;
function isThrottleOnCooldown(throttleId) {
    return ThrottleManager.cooldowns.get(throttleId) ?? false;
}
exports.isThrottleOnCooldown = isThrottleOnCooldown;
