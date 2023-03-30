"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectExtensions = void 0;
const properties_1 = require("./properties");
function array(from) {
    return Object.keysOf(from).map(prop => [prop, from[prop]]);
}
Object.array = array;
function extract(from, ...props) {
    // If props are Array<keyof From>, Array<Partial<From>>, or Array<keyof From | Partial<From>>, ensure _props as Array<keyof From> 
    const _props = props.map(prop => typeof prop === "object" ? Object.keysOf(prop) : prop).flat();
    _props.forEach(prop => delete from[prop]);
    return from;
}
Object.extract = extract;
function exclude(from, ...props) {
    // If props are Array<keyof From>, Array<Partial<From>>, or Array<keyof From | Partial<From>>, ensure _props as Array<keyof From>
    const _props = props.map(prop => typeof prop === "object" ? Object.keysOf(prop) : prop).flat();
    return Object.keysOf(from).reduce((result, prop) => {
        if (_props.includes(prop))
            delete result[prop];
        return result;
    }, from);
}
Object.exclude = exclude;
function isNullOrUndefined(obj) {
    return obj === null || obj === undefined;
}
Object.isNullOrUndefined = isNullOrUndefined;
function keysOf(from) {
    return Object.keys(from);
}
Object.keysOf = keysOf;
Object.properties = properties_1.properties;
exports.ObjectExtensions = {
    properties: properties_1.properties,
    array, extract, exclude, isNullOrUndefined, keysOf,
};
