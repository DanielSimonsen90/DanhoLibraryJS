"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.splitBy = exports.unique = exports.forceArray = exports.take = void 0;
function take(count) {
    return this.slice(0, count);
}
exports.take = take;
Array.prototype.take = take;
function forceArray(arrayable) {
    return Array.isArray(arrayable) ? arrayable : [arrayable];
}
exports.forceArray = forceArray;
Array.forceArray = forceArray;
function unique() {
    return [...new Set(this)];
}
exports.unique = unique;
Array.prototype.unique = unique;
function splitBy(chunkSizeOrSplitter) {
    const chunkSize = typeof chunkSizeOrSplitter === 'number' ? chunkSizeOrSplitter : undefined;
    const splitter = typeof chunkSizeOrSplitter === 'function' ? chunkSizeOrSplitter : undefined;
    const result = [];
    if (chunkSize !== undefined) {
        for (let i = 0; i < this.length; i += chunkSize) {
            result.push(this.slice(i, i + chunkSize));
        }
    }
    else if (splitter !== undefined) {
        const chunk = new Array();
        for (let i = 0; i < this.length; i++) {
            const value = this[i];
            if (splitter(value, i, this)) {
                if (chunk.length) {
                    result.push(chunk.splice(0, chunk.length));
                }
            }
            chunk.push(value);
        }
        if (chunk.length) {
            result.push(chunk);
        }
    }
    return result;
}
exports.splitBy = splitBy;
Array.prototype.splitBy = splitBy;
function groupBy(keySelector) {
    return this.reduce((map, item, index, array) => {
        const key = keySelector(item, index, array);
        const group = map.get(key) ?? new Array();
        group.push(item);
        map.set(key, group);
        return map;
    }, new Map());
}
exports.groupBy = groupBy;
Array.prototype.groupBy = groupBy;
