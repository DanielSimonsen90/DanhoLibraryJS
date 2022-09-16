"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapExtensions = void 0;
function array() {
    let result = new Array();
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
}
Map.prototype.array = array;
function map(callback) {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
}
Map.prototype.map = map;
function filter(callback) {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
}
Map.prototype.filter = filter;
function keyArr() {
    return this.array().map(([k]) => k);
}
Map.prototype.keyArr = keyArr;
function valueArr() {
    return this.array().map(([_, v]) => v);
}
Map.prototype.valueArr = valueArr;
function find(callback) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
}
Map.prototype.find = find;
function includes(item, fromIndex) {
    return this.valueArr().includes(item, fromIndex);
}
Map.prototype.includes = includes;
exports.MapExtensions = {
    array, map, filter, keyArr, valueArr, find, includes
};
