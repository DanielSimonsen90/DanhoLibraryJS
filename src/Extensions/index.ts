import ElementOptions from "../Interfaces/ElementOptions";
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
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K]
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
}

Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(this: Document, tagName: K, options?: ElementOptions) {
    let baseElement = document.createElement(tagName);
    if (!options) return baseElement;

    if (options.classes) {
        baseElement.classList.add(...options.classes);
    }
    
    if (options.attributes) {
        options.attributes.forEach(([attribute, value]) => baseElement.setAttribute(attribute, value));
    }

    if (options.children) {
        baseElement.append(...new Array().concat(options.children));
    }

    if (options.events) {
        options.events.forEach(({ name, handler }) => (
            baseElement.addEventListener(name, handler)
        ))
    }

    return baseElement;
}

HTMLCollection.prototype.array = function(this: HTMLCollection) {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        const item = this.item(i);
        if (item !== null) result.push(item);
    }
    return result;
}
