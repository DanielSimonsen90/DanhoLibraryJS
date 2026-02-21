"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUndefined = exports.areEqual = void 0;
function areEqual(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (isNullOrUndefined(a) && isNullOrUndefined(b))
        return true;
    const keysA = Object.keys(a ?? {});
    const keysB = Object.keys(b ?? {});
    if (keysA.length !== keysB.length)
        return false;
    try {
        const jsonA = JSON.stringify(a);
        const jsonB = JSON.stringify(b);
        if (jsonA === jsonB)
            return true;
    }
    catch {
        for (const key of keysA) {
            if (!keysB.includes(key))
                return false;
            if (!areEqual(a[key], b[key]))
                return false;
        }
    }
    return true;
}
exports.areEqual = areEqual;
Object.areEqual = areEqual;
function isNullOrUndefined(obj) {
    return obj === null || obj === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
Object.isNullOrUndefined = isNullOrUndefined;
