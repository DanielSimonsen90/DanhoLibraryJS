"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combine = exports.difference = exports.pick = exports.omit = void 0;
function omit(from, ...props) {
    return props.reduce((result, prop) => {
        if (typeof prop === "object") {
            const keys = Object.keysOf(prop);
            keys.forEach(key => delete result[key]);
        }
        else {
            delete result[prop];
        }
        return result;
    }, { ...from });
}
exports.omit = omit;
Object.omit = omit;
function pick(from, ...props) {
    return props.reduce((result, prop) => {
        if (typeof prop === "object") {
            const keys = Object.keysOf(prop);
            keys.forEach(key => result[key] = from[key]);
        }
        else {
            result[prop] = from[prop];
        }
        return result;
    }, {});
}
exports.pick = pick;
Object.pick = pick;
function difference(source, target, ...exclude) {
    const diffKeys = new Set([...Object.keysOf(source), ...Object.keysOf(target)]);
    exclude?.forEach(key => diffKeys.delete(key));
    return [...diffKeys.values()].reduce((acc, key, i, arr) => {
        const sourceValue = JSON.stringify(source[key]);
        const targetValue = JSON.stringify(target[key]);
        if (sourceValue !== targetValue)
            acc[key] = target[key];
        return acc;
    }, {});
}
exports.difference = difference;
Object.difference = difference;
function combine(...objects) {
    return objects.reduce((acc, obj) => {
        if (!obj)
            return acc;
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                try {
                    acc[key] = combine(acc[key], obj[key]);
                }
                catch (err) {
                    const error = err;
                    if (error.message.includes('Maximum call stack size exceeded')) {
                        acc[key] = obj[key];
                    }
                    else
                        throw err;
                }
            }
            else if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
                // @ts-ignore
                acc[key] = obj[key];
            }
        }
        return acc;
    }, {});
}
exports.combine = combine;
Object.combine = combine;
