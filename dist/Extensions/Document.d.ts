import { IElement } from "../Types";
declare global {
    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         * @param children Child elements
         */
        createProperElement<Tag extends keyof HTMLElementTagNameMap>(tagName: Tag, options?: Partial<HTMLElementTagNameMap[Tag]>, ...children: Array<IElement>): HTMLElementTagNameMap[Tag];
        createProperElement<Tag extends keyof HTMLElementTagNameMap>(tagName: Tag, ...children: Array<IElement>): HTMLElementTagNameMap[Tag];
        createElementFromString<K extends keyof HTMLElementTagNameMap>(html: string, parentTag?: K): HTMLElementTagNameMap[K];
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[];
    }
}
declare function createElement<Tag extends keyof HTMLElementTagNameMap>(this: Document, tagName: Tag, options?: Partial<HTMLElementTagNameMap[Tag]> | string, ...children: Array<IElement>): HTMLElementTagNameMap[Tag];
declare function createElementFromString<Tag extends keyof HTMLElementTagNameMap>(this: Document, html: string, tag?: Tag): HTMLElementTagNameMap[Tag];
export declare const DocumentExtensions: {
    createElement: typeof createElement;
    createElementFromString: typeof createElementFromString;
};
export {};
