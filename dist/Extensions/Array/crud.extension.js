"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.add = void 0;
function add(...items) {
    this.push(...items);
    return this;
}
exports.add = add;
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
exports.update = update;
Array.prototype.update = update;
function remove(value) {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1)
        this.splice(index, 1);
    return this;
}
exports.remove = remove;
Array.prototype.remove = remove;
