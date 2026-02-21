"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = void 0;
function join(separator = ',', endSeparator = '&') {
    const validArgs = this.filter(arg => !Object.isNullOrUndefined(arg) && arg !== '');
    if (!validArgs.length)
        return '';
    if (validArgs.length === 1)
        return validArgs.shift().toString();
    const lastArg = validArgs.pop();
    const combinedArgs = validArgs.join(separator);
    return `${combinedArgs}${endSeparator ? ` ${endSeparator} ` : ''}${lastArg}`;
}
exports.join = join;
