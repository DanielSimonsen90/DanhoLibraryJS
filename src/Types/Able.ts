/**
 * Item is function or T
 */
export type Functionable<T, Args extends any[] = []> = T | ((...args: Args) => T);

/**
 * Item is Promise<T> or T
 */
export type Promiseable<T> = T | Promise<T>;

/**
 * Item is T or null
 */
export type Nullable<T> = T | null;

/**
 * Item cannot be null or undefined
 */
export type NonNullable<T> =
  T extends null ? never :
  T extends undefined ? never :
  T;