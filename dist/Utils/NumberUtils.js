"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.between = between;
