"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysOf = exports.array = void 0;
function array(from) {
    return Object.entries(from);
}
exports.array = array;
Object.array = array;
function keysOf(from) {
    return Object.keys(from);
}
exports.keysOf = keysOf;
Object.keysOf = keysOf;
