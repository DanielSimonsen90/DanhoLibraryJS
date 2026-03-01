"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = exports.pluralize = exports.randomId = exports.classNames = void 0;
function classNames(...args) {
    return args.reduce((acc, arg) => {
        if (!arg)
            return acc;
        switch (typeof arg) {
            case 'string': {
                acc += arg;
                break;
            }
            case 'object': {
                if (Array.isArray(arg)) {
                    acc += classNames(...arg);
                    break;
                }
                else {
                    acc += Object.entries(arg).reduce((objAcc, [key, value]) => objAcc + (value ? key : ''), '');
                    break;
                }
            }
            default: {
                acc += `${arg}`;
                break;
            }
        }
        return acc + ' ';
    }, '').trim();
}
exports.classNames = classNames;
function randomId(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}
exports.randomId = randomId;
function pluralize(countable, singular, plural) {
    const count = (typeof countable === 'number' ? countable
        : countable instanceof Map ? countable.size
            : countable.length);
    if (count === 1)
        return singular;
    if (plural)
        return plural;
    return `${singular}s`;
}
exports.pluralize = pluralize;
exports.StringUtils = {
    classNames,
    randomId,
    pluralize
};
