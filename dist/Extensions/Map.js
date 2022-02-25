"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
