"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCase = void 0;
const caseMap = {
    camel: {
        camel: (str) => str,
        lower: (str) => str.toLowerCase(),
        upper: (str) => str.toUpperCase(),
        pascal: (str) => str[0].toUpperCase() + str.replace(/([A-Z])/g, (match) => ` ${match}`).slice(1),
        snake: (str) => str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`),
        kebab: (str) => str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`),
    },
    pascal: {
        pascal: (str) => str,
        lower: (str) => str.toLowerCase(),
        upper: (str) => str.toUpperCase(),
        camel: (str) => str[0].toLowerCase() + str.slice(1),
        snake: (str) => str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`),
        kebab: (str) => str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`),
    },
    snake: {
        snake: (str) => str,
        lower: (str) => str.toLowerCase(),
        upper: (str) => str.toUpperCase(),
        camel: (str) => str.replace(/(_\w)/g, (match) => match[1].toUpperCase()),
        pascal: (str) => str[0].toUpperCase() + str.substring(1, str.length).replace(/(_\w)/g, (match) => match[1].toUpperCase()),
        kebab: (str) => str.replace(/_/g, '-'),
    },
    kebab: {
        kebab: (str) => str,
        lower: (str) => str.toLowerCase(),
        upper: (str) => str.toUpperCase(),
        camel: (str) => str.replace(/(-\w)/g, (match) => match[1].toUpperCase()),
        pascal: (str) => str[0].toUpperCase() + str.substring(1, str.length).replace(/(-\w)/g, (match) => match[1].toUpperCase()),
        snake: (str) => str.replace(/-/g, '_'),
    },
    lower: {
        lower: (str) => str.toLowerCase(),
        upper: (str) => str.toUpperCase(),
        camel: (str) => str,
        pascal: (str) => str[0].toUpperCase() + str.slice(1),
        snake: (str) => str,
        kebab: (str) => str,
    },
    upper: {
        upper: (str) => str.toUpperCase(),
        camel: (str) => str[0].toLowerCase() + str.slice(1),
        pascal: (str) => str[0].toUpperCase() + str.toLowerCase().slice(1),
        snake: (str) => str.replace(/ /g, '_'),
        kebab: (str) => str.replace(/ /g, '-'),
        lower: (str) => str.toLowerCase(),
    }
};
function convertCase(from, ...to) {
    return to.reduce((str, toCase) => caseMap[from][toCase](str), this);
}
exports.convertCase = convertCase;
String.prototype.convertCase = convertCase;
