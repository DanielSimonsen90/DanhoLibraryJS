import { IElement } from "../Types";

declare global {
    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         */
        createProperElement<Tag extends keyof HTMLElementTagNameMap>(tagName: Tag, options?: HTMLElementTagNameMap[Tag], ...children: Array<IElement>): HTMLElementTagNameMap[Tag]
        createElementFromString<K extends keyof HTMLElementTagNameMap>(html: string, parentTag?: K): HTMLElementTagNameMap[K]
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[]
    }
}

function createElement<Tag extends keyof HTMLElementTagNameMap>(
    this: Document, tagName: Tag, options?: HTMLElementTagNameMap[Tag] | string, 
    ...children: Array<IElement>
): HTMLElementTagNameMap[Tag] {
    
    const element = Object.assign(document.createElement(tagName), typeof options === 'string' ? {} : options);
    children ??= typeof options === 'string' ? [options] as Array<IElement> : [];
    typeof options === 'string' && children.unshift(options);

    if (!children.length) return element;
    else if (typeof children === 'string') element.innerHTML = children;
    else if (children instanceof Array) children.forEach(child => (
        typeof child === 'string' ? 
            element.innerHTML += child : 
            element.appendChild(child)
    ));
    else element.appendChild(children);
    return element;

}
Document.prototype.createProperElement = createElement;

function createElementFromString<Tag extends keyof HTMLElementTagNameMap>(this: Document, html: string, tag?: Tag): HTMLElementTagNameMap[Tag] {
    if (!html.startsWith(`<${tag}`)) html = `<${tag}>${html}</${tag}>`;
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild as HTMLElementTagNameMap[Tag];
}
Document.prototype.createElementFromString = createElementFromString;

HTMLCollection.prototype.array = function(this: HTMLCollection) {
    return Array.from(this);
};

export const DocumentExtensions = {
    createElement, createElementFromString
};