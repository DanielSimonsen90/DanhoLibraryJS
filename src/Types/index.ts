export * from './BetterTypes';
export * from './Date';
export * from './Events';
export * from './TransformTypes';
export * from './PropertiesWith';

/**
 * Item is single or multiple
 */
export type Arrayable<T> = T | Array<T>;

/**
 * Item is function or T
 */
export type Functionable<T> = T | (() => T);

/**
 * Item is Promise<T> or T
 */
export type Promisable<T> = T | Promise<T>;

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

/**
 * C# Guid representation
 */
export type Guid = string;

/**
 * C# TimeSpan representation from JSON
 */
export type TimeSpanType = string;

/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createElement
 */
export type IElement = HTMLElement | string;

/**
 * Return types of T
 */
export type ValueOf<T> = T[keyof T];

/**
 * Type's properties are ReturnType
 */
export type AllPropsAre<ReturnType> = {
    [key: string]: ReturnType
}

/**
 * string or RegExp.. pretty self-explanatory
 */
export type StringRegex = string | RegExp;

export type If<Boolean extends boolean, True, False> = Boolean extends true ? True : False;

/**
 * GetRepeatedKeys<[
 *  { username: string, password: string },
 *  { username: number, email: string },
 * ]> // { username: string | number }
 */
export type GetRepeatedKeys<Types extends Array<any>> = (
    Types extends [infer First, infer Second, ...infer Rest]
        ? First extends object
            ? Second extends object
                ? {
                    [Key in Extract<keyof First, keyof Second>]: First[Key] | Second[Key]
                } & GetRepeatedKeys<Rest>
            : {}
        : {}
    : {}
);
