const DebounceManager = {
  timers: new Map<string, number>(),
  abortListeners: new Map<string, () => void>(),
}

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
export function debounce<T>(debounceId: string, callback: () => T, delay: number, signal?: AbortSignal) {
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

  const promise = new Promise<T>((resolve, reject) => {
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
      } catch (error) {
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

/**
 * Wrap a callback in a debounce, allowing it to be called multiple times, but only run after the delay has passed without it being called again
 * @param callback The callback to run after the delay has passed without the function being called again
 * @param delay The delay in milliseconds to wait before running the callback after the last call
 * @returns An object containing the debounced function, an AbortController to cancel operations, and the abort method for convenience
 */
export function wrapInDebounce<T>(callback: (...args: T[]) => void, delay: number) {
  const controller = new AbortController();
  
  return {
    debounced: (...args: T[]) => debounce(Symbol().toString(), () => callback(...args), delay, controller.signal),
    controller,
    abort: () => controller.abort(),
  };
}