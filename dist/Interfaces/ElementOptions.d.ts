import { Arrayable, IElement } from "../Types";
type Events = Record<`on${Capitalize<keyof HTMLElementEventMap>}`, (event: Event) => void>;
/**
 * Construction options when creating an HTML element using:
 * @see Document.createElement
 * @borwwos IElement
 * @borrows Arrayable
 */
export type ElementOptions = Partial<Events & Record<string, any> & {
    id: string;
    className: Arrayable<string>;
    children: Arrayable<IElement>;
    dataset: Record<string, string>;
}>;
export default ElementOptions;
