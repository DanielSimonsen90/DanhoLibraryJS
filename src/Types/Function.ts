export type NewReturnType<
  Function extends (...args: any[]) => any,
  NewReturnType extends any
> = (...args: Parameters<Function>) => NewReturnType;

export type PromisedReturn<
  Function extends (...args: any[]) => any,
> = NewReturnType<Function, Promise<ReturnType<Function>>>;

export type NoFunctions<T> = { [K in keyof T]: T[K] extends Function ? never : T[K]; };