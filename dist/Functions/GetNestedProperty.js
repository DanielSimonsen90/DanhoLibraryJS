"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNestedProperty = void 0;
/**
 * Gets a nested property from an object
 * @param parent Parent object to search
 * @param key Key to search for. Can be nested with dot notation
 * @returns Value of key or null if not found
 */
function GetNestedProperty(parent, key) {
    if (key in parent)
        return parent[key];
    for (const prop in parent) {
        if (typeof parent[prop] === 'object') {
            const result = GetNestedProperty(parent[prop], key);
            if (result)
                return result;
        }
    }
    return null;
}
exports.GetNestedProperty = GetNestedProperty;
exports.default = GetNestedProperty;
