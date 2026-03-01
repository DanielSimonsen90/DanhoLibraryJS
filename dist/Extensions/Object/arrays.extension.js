"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysOf = exports.array = void 0;
function array(from, selector) {
    const entries = Object.entries(from);
    switch (selector) {
        case 'keys': return entries.map(([key]) => key);
        case 'values': return entries.map(([, value]) => value);
        default: return entries;
    }
}
exports.array = array;
Object.array = array;
function keysOf(from) {
    return Object.keys(from);
}
exports.keysOf = keysOf;
Object.keysOf = keysOf;
