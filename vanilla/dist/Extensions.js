"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Document.prototype.createProperElement = function (tagName, options) {
    let baseElement = document.createElement(tagName);
    if (!options)
        return baseElement;
    if (options.classes) {
        baseElement.classList.add(...options.classes);
    }
    if (options.attributes) {
        options.attributes.forEach(([attribute, value]) => baseElement.setAttribute(attribute, value));
    }
    if (options.children) {
        baseElement.append(...options.children);
    }
    return baseElement;
};
HTMLCollection.prototype.array = function () {
    let result = new Array();
    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
};
Array.prototype.remove = function (item) {
    let itemInArray = this.includes(item) ? item : this.find(i => i == item);
    if (!itemInArray)
        throw new Error(`item is not in array!`);
    let itemIndex = this.indexOf(itemInArray);
    this.splice(itemIndex, 1);
    return this;
};
Map.prototype.array = function () {
    let result = new Array();
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
};
Map.prototype.map = function (callback) {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
};
Map.prototype.filter = function (callback) {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
};
Map.prototype.keyArr = function () {
    return this.array().map(([k]) => k);
};
Map.prototype.valueArr = function () {
    return this.array().map(([_, v]) => v);
};
Map.prototype.find = function (callback) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
};
Map.prototype.includes = function (item, fromIndex) {
    return this.valueArr().includes(item, fromIndex);
};
