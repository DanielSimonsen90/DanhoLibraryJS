"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = exports.random = void 0;
function random() {
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
}
exports.random = random;
Array.prototype.random = random;
function shuffle() {
    return this.sort(() => Math.random() - 0.5);
}
exports.shuffle = shuffle;
Array.prototype.shuffle = shuffle;
