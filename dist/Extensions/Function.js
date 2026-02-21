"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionExtensions = exports.forceFunction = exports.resolveFunctionable = exports.is = void 0;
function is(obj) {
    return typeof obj === 'function';
}
exports.is = is;
Function.is = is;
function resolveFunctionable(functionable, ...args) {
    return is(functionable) ? functionable(...args) : functionable;
}
exports.resolveFunctionable = resolveFunctionable;
Function.resolveFunctionable = resolveFunctionable;
function forceFunction(functionable) {
    return is(functionable) ? functionable : () => functionable;
}
exports.forceFunction = forceFunction;
Function.forceFunction = forceFunction;
exports.FunctionExtensions = {
    is,
    resolveFunctionable,
    forceFunction
};
