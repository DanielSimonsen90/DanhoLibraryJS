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
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createProperElement
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