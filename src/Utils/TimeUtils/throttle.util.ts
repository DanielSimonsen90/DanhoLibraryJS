const ThrottleManager = {
  cooldowns: new Map<string, boolean>(),
  results: new Map<string, any>(),
};

/**
 * Allow callback to be run once every cooldown period, regardless of calls
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback
 */
export function throttle<T>(throttleId: string, callback: () => T, cooldown: number) {
  const { cooldowns, results } = ThrottleManager;

  const isCooldown = cooldowns.get(throttleId) ?? false;
  if (isCooldown) return results.get(throttleId) as T;

  const result = callback();

  setTimeout(() => {
    cooldowns.delete(throttleId);
    results.delete(throttleId);
  }, cooldown);

  cooldowns.set(throttleId, true);
  results.set(throttleId, result);

  return result;
}

/** 
 * Wrap a callback in a throttle, allowing it to be called multiple times, but only run once every cooldown period
 * @param callback The callback to run
 * @param cooldown The delay to wait before allowing the callback to be called again
 * @returns A throttled version of the callback that can be called multiple times, but will only run once every cooldown period
 */
export function wrapInThrottle<T>(callback: (...args: T[]) => void, cooldown: number) {
  const throttleId = Symbol().toString();
  return (...args: T[]) => throttle(throttleId, () => callback(...args), cooldown);
}

export function isThrottleOnCooldown(throttleId: string) {
  return ThrottleManager.cooldowns.get(throttleId) ?? false;
}