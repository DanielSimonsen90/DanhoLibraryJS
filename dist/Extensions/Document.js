"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentExtension = void 0;
function createElement(tagName, options, ...children) {
    const element = Object.assign(document.createElement(tagName), typeof options === 'string' ? {} : options);
    children ??= typeof options === 'string' ? [options] : [];
    typeof options === 'string' && children.unshift(options);
    if (!children.length)
        return element;
    else if (typeof children === 'string')
        element.innerHTML = children;
    else if (children instanceof Array)
        children.forEach(child => (typeof child === 'string' ?
            element.innerHTML += child :
            element.appendChild(child)));
    else
        element.appendChild(children);
    return element;
}
function createElementFromString(html, tag) {
    if (!html.startsWith(`<${tag}`))
        html = `<${tag}>${html}</${tag}>`;
    return new DOMParser().parseFromString(html, 'text/html').body.firstElementChild;
}
exports.DocumentExtension = {
    createElement,
    createElementFromString
};
if (Document) {
    Document.prototype.createProperElement = createElement;
    Document.prototype.createElementFromString = createElementFromString;
}
if (HTMLCollection) {
    HTMLCollection.prototype.array = function () {
        return Array.from(this);
    };
}
