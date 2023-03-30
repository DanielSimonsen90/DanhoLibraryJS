"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionExtensions = void 0;
function is(obj) {
    return typeof obj === 'function';
}
Function.is = is;
exports.FunctionExtensions = {
    is
};
