export * from './BetterTypes';
export * from './Date';
export * from './Events';
export * from './TransformTypes';
export * from './PropertiesWith';
/**
 * Item is single or multiple
 */
export declare type Arrayable<T> = T | Array<T>;
/**
 * Item is function or T
 */
export declare type Functionable<T> = T | (() => T);
/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 *
 * @see HTMLElement.append
 * @see Document.createElement
 */
export declare type IElement = HTMLElement | string;
/**
 * Return types of T
 */
export declare type ValueOf<T> = T[keyof T];
/**
 * Type's properties are ReturnType
 */
export declare type AllPropsAre<ReturnType> = {
    [key: string]: ReturnType;
};
/**
 * string or RegExp.. pretty self-explanatory
 */
export declare type StringRegex = string | RegExp;
export declare type If<Boolean extends boolean, True, False> = Boolean extends true ? True : False;
