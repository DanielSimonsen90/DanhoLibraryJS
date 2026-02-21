export * from './Able';
export * from './Array';
export * from './BetterTypes';
export * from './C#';
export * from './Date';
export * from './Events';
export * from './Function';
export * from './TransformTypes';
export * from './Object';
export * from './PropertiesWith';
export * from './String';

/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createElement
 */
export type IElement = HTMLElement | string;

/**
 * string or RegExp.. pretty self-explanatory
 */
export type StringRegex = string | RegExp;

export type If<Boolean extends boolean, True, False> = Boolean extends true ? True : False;