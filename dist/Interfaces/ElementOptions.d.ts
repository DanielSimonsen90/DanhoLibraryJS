import IElement from "../Types/IElement";
/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement
 * @borwwos IElement
 */
export interface ElementOptions {
    /**css classes to give the element*/
    classes?: string[];
    /**attributes to give the element*/
    attributes?: [string, string][];
    /**Children of the element*/
    children?: IElement | IElement[];
    /**Events for the element to listen to*/
    events?: Array<{
        name: string;
        handler: (e: Event) => any;
    }>;
}
export default ElementOptions;
