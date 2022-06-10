import ElementOptions from "../Interfaces/ElementOptions";
import { IElement } from "../Types";
export * from './Array';
export * from './Map';
export * from './Object';
export * from './String';
declare global {
    interface BooleanConstructor {
        /**
         * Parses string to boolean. Will only return true if value === "true" otherwise false
         */
        parseBoolean(value: string): boolean;
    }
    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         */
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions, ...children: Array<IElement>): HTMLElementTagNameMap[K];
        createFromHtml<K extends keyof HTMLElementTagNameMap>(html: string, parentTag?: K): HTMLElementTagNameMap[K];
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[];
    }
}
