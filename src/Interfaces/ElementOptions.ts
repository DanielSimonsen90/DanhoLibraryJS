import { Arrayable, IElement } from "../Types"

/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement 
 * @borwwos IElement
 * @borrows Arrayable
 */
export interface ElementOptions {
    /**css classes to give the element*/
    classes?: Array<string>,
    /**attributes to give the element*/
    attributes?: Array<[string, string]>,
    /**Children of the element*/
    children?: Arrayable<IElement>,
    /**Events for the element to listen to*/
    events?: Array<{ name: string, handler: (e: Event) => any }>
}
export default ElementOptions