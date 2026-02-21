export function wait<T>(time: number): Promise<never>;
export function wait<T>(callback: (...args: any[]) => T, time: number): Promise<T>;
export function wait<T>(callbackOrTime: ((...args: any[]) => T) | number, time?: number) {
  const callback = typeof callbackOrTime === 'function' ? callbackOrTime : (() => undefined);
  time ??= callbackOrTime as number;

  return new Promise<T>((resolve, reject) => {
    try { setTimeout(() => resolve(callback() as T), time); }
    catch (err) { reject(err); }
  });
}

export function getUnixTime(date: Date | string): number;
export function getUnixTime(timestamp: number): number;
export function getUnixTime(arg: Date | string | number): number {
  const timestamp = typeof arg === 'number' ? arg : new Date(arg).getTime();
  return Math.floor(timestamp / 1000);
}