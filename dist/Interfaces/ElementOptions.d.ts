import { Arrayable, IElement } from "../Types";
declare type Events = Record<`on${Capitalize<keyof HTMLElementEventMap>}`, (event: Event) => void>;
/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement
 * @borwwos IElement
 * @borrows Arrayable
 */
export declare type ElementOptions = Partial<Events & Record<string, any> & {
    id: string;
    class: Arrayable<string>;
    children: Arrayable<IElement>;
    dataset: Record<string, string>;
}>;
export default ElementOptions;
