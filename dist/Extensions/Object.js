"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.keysOf = function (from) {
    return Object.keys(from);
};
Object.array = function (from) {
    return Object.keysOf(from).map(prop => [prop, from[prop]]);
};
