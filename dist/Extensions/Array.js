"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.add = function (...items) {
    this.push(...items);
    return this;
};
Array.prototype.update = function (old, updated) {
    const item = typeof old === 'number' ? this[old] : typeof old === 'function' ? this.find(old) : old;
    if (!item)
        throw new Error('Old was not found in array!');
    const index = this.indexOf(item);
    return this[index] = updated;
};
Array.prototype.remove = function (value) {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1)
        this.splice(index, 1);
    return this;
};
Array.prototype.random = function () {
    const randomIndex = Math.round(Math.random() * this.length);
    return this[randomIndex];
};
Array.prototype.index = function (i) {
    return this[i < 0 ? this.length + i : i];
};
Array.prototype.nth = function (every, callback) {
    const result = new Array();
    let collection = new Array();
    for (let i = 0; i < this.length; i++) {
        collection.push(this[i]);
        if (i % every === 0) {
            result.push(callback(collection, i, this));
            collection = new Array();
        }
    }
    return result;
};
