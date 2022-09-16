"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentExtensions = void 0;
function createElement(tagName, options, ...children) {
    let baseElement = {
        ...document.createElement(tagName),
        ...options,
        children
    };
    return baseElement;
}
Document.prototype.createElement = createElement;
function createElementFromString(html, tag) {
    if (!html.startsWith(`<${tag}`))
        html = `<${tag}>${html}</${tag}>`;
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
}
Document.prototype.createElementFromString = createElementFromString;
HTMLCollection.prototype.array = function () {
    return Array.from(this);
};
exports.DocumentExtensions = {
    createElement, createElementFromString
};
