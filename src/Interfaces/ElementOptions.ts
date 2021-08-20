/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement */
export interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: string[],
    /**attributes to give the element*/
    attributes?: [string, string][],
    /**Children of the element*/
    children?: HTMLElementTagNameMap[K][]
}
export default ElementOptions