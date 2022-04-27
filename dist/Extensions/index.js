"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Array"), exports);
__exportStar(require("./Map"), exports);
__exportStar(require("./Object"), exports);
__exportStar(require("./String"), exports);
Boolean.parseBoolean = function (value) {
    return value === "true";
};
try {
    Document.prototype.createProperElement = function (tagName, options) {
        let baseElement = document.createElement(tagName);
        if (!options)
            return baseElement;
        const { id, class: className, children, dataset, ...rest } = options;
        if (id)
            baseElement.id = id;
        if (className) {
            const classNames = Array.isArray(className) ? className : [className];
            classNames.forEach(className => baseElement.classList.add(className));
        }
        if (children) {
            const childrenElements = Array.isArray(children) ? children : [children];
            childrenElements.forEach(child => baseElement.append(child));
        }
        if (dataset)
            Object.entries(dataset).forEach(([key, value]) => baseElement.dataset[key] = value);
        for (const optionKey in rest) {
            const optionValue = rest[optionKey];
            if (optionValue === undefined)
                continue;
            if (typeof optionValue === 'function') {
                baseElement.addEventListener(optionKey.substring(2), rest[optionKey]);
            }
            else {
                baseElement.setAttribute(optionKey, optionValue.toString());
            }
        }
        return baseElement;
    };
    HTMLCollection.prototype.array = function () {
        let result = new Array();
        for (let i = 0; i < this.length; i++) {
            const item = this.item(i);
            if (item !== null)
                result.push(item);
        }
        return result;
    };
}
catch {
    // Used in node.js
}
