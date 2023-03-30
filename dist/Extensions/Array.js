"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayExtensions = void 0;
function add(...items) {
    this.push(...items);
    return this;
}
Array.prototype.add = add;
function update(old, updated) {
    const item = typeof old === 'number' ? this[old]
        : typeof old === 'function' ? this.find(old)
            : old;
    if (!item)
        throw new Error('Old was not found in array!');
    const index = this.indexOf(item);
    return this[index] = updated;
}
Array.prototype.update = update;
function remove(value) {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1)
        this.splice(index, 1);
    return this;
}
Array.prototype.remove = remove;
function random() {
    const randomIndex = Math.round(Math.random() * this.length);
    return this[randomIndex];
}
Array.prototype.random = random;
function index(i) {
    return this[i < 0 ? this.length + i : i];
}
Array.prototype.index = index;
function nth(every, callback) {
    const result = new Array();
    let collection = new Array();
    for (let i = 0; i < this.length; i++) {
        collection.push(this[i]);
        if (i % every === 0) {
            result.push(callback(this[i], i, collection, this));
            collection = new Array();
        }
    }
    return result;
}
Array.prototype.nth = nth;
exports.ArrayExtensions = {
    add, update, remove,
    random, index, nth
};
