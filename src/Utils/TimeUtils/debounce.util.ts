const DebounceManager = {
  timers: new Map<string, number>(),
}

/**
 * Delay running the callback until delay milliseconds have passed without the function being called again. 
 * If the function is called again before the delay has passed, the timer resets.
 * 
 * @param debounceId A unique identifier for the debounce instance. Call with the same ID to reset the timer.
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @returns A promise that resolves to the result of the callback when it is eventually called
 */
export function debounce<T>(debounceId: string, callback: () => T, delay: number) {
  const { timers } = DebounceManager;

  if (timers.has(debounceId)) clearTimeout(timers.get(debounceId));

  return new Promise<T>((resolve) => {
    const timeoutId = setTimeout(() => {
      timers.delete(debounceId);

      resolve(callback());
    }, delay);

    timers.set(debounceId, timeoutId);
  });
}

/**
 * Wrap a callback in a debounce, allowing it to be called multiple times, but only run after the delay has passed without it being called again
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @returns A debounced version of the callback that can be called multiple times, but will only run after the delay has passed without it being called again
 */
export function wrapInDebounce<T>(callback: (...args: T[]) => void, delay: number) {
  const debounceId = Symbol().toString();
  return (...args: T[]) => debounce(debounceId, () => callback(...args), delay);
}