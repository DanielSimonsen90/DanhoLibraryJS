"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.add = function (...items) {
    this.push(...items);
    return this;
};
Array.prototype.update = function (old, updated) {
    const index = typeof old === 'number' ? old : this.indexOf(old);
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
