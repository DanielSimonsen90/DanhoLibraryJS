# [DanhoLibraryJS](../README.md)

## Interfaces

```ts
/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement 
 * @borrows IElement
 * @borrows Arrayable
 */
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: Array<string>;
    /**attributes to give the element*/
    attributes?: Array<[string, string]>;
    /**Children of the element*/
    children?: Arrayable<IElement>;
    /**Events for the element to listen to
     * @use HTMLEvent<Event, RetrunType>(name: Event, handler: (e: Event) => ReturnType)
    */
    events?: Array<{ name: string, handler: (e: Event) => any }>
}
/**
 * Replacement tool for 
 * @see String.toSnakeCase 
 * @see String.toKebabCase
 * @borrows StringRegex
*/
interface IReplacement {
    replacer?: StringRegex,
    replacement?: string
}
```
