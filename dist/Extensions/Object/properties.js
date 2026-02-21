"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = void 0;
exports.properties = [
    'string', 'number', 'boolean', 'undefined', 'null',
    'object', 'function', 'any',
    'Date', 'RegExp', 'Promise', 'Array', 'Map', 'Set'
].reduce((result, primitive) => {
    result[`get${primitive.convertCase('camel', 'pascal')}s`] = function (source, withFunctions = false) {
        return Object.keysOf(source).reduce((result, key) => {
            if (source[key].constructor.name === primitive ||
                (withFunctions && typeof source[key] === 'function' && source[key]).constructor.name === primitive) {
                result[key] = source[key];
            }
            return result;
        }, {});
    };
    return result;
}, {});
