import ElementOptions from "../Interfaces/ElementOptions";
import { EventHandler, IElement } from "../Types";
export * from './Array';
export * from './Map';
export * from './Object';
export * from './String';

declare global {
    interface BooleanConstructor {
        /**
         * Parses string to boolean. Will only return true if value === "true" otherwise false
         */
        parseBoolean(value: string): boolean
    }

    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         */
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions, ...children: Array<IElement>): HTMLElementTagNameMap[K]
        createFromHtml<K extends keyof HTMLElementTagNameMap>(html: string, parentTag?: K): HTMLElementTagNameMap[K]
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[]
    }
}

Boolean.parseBoolean = function(value: string) {
    return value === "true";
};

try {
    Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(this: Document, tagName: K, options?: ElementOptions, ...children: Array<IElement>): HTMLElementTagNameMap[K] {
        let baseElement = document.createElement(tagName);
        if (!options) return baseElement;

        const { id, class: className, dataset, ...rest } = options;
        if (id) baseElement.id = id;
        if (className) {
            const classNames = Array.isArray(className) ? className : [className];
            classNames.forEach(className => baseElement.classList.add(className));
        }
        children ?? options.children;
        if (children) {
            const childrenElements = Array.isArray(children) ? children : [children];
            childrenElements.forEach(child => baseElement.append(child));
        }
        if (dataset) Object.entries(dataset).forEach(([key, value]) => baseElement.dataset[key] = value);
        
        for (const optionKey in rest) {
            const optionValue = rest[optionKey as keyof typeof rest] as EventHandler | object;
            if (optionValue === undefined) continue;

            if (typeof optionValue === 'function') {
                baseElement.addEventListener(optionKey.substring(2), rest[optionKey as keyof typeof rest] as EventListener);
            } else {
                baseElement.setAttribute(optionKey, optionValue.toString());
            }
        }

        return baseElement;
    }
    Document.prototype.createFromHtml = function<K extends keyof HTMLElementTagNameMap>(this: Document, html: string, parentTag?: K): HTMLElementTagNameMap[K] {
        return new DOMParser().parseFromString(html, 'text/html').body.firstChild as HTMLElementTagNameMap[K];
    }

    HTMLCollection.prototype.array = function(this: HTMLCollection) {
        let result = new Array<Element>();

        for (let i = 0; i < this.length; i++) {
            const item = this.item(i);
            if (item !== null) result.push(item);
        }
        return result;
    }
} catch {
    // Used in node.js
}