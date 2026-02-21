"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRomanNumeral = exports.toSeparationString = void 0;
function toSeparationString(separators) {
    const { thousand = '.', decimal = '.' } = separators;
    const [integerPart, decimalPart] = this.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
    return decimalPart ? `${formattedInteger}${decimal}${decimalPart}` : formattedInteger;
}
exports.toSeparationString = toSeparationString;
Number.prototype.toSeparationString = toSeparationString;
function toRomanNumeral() {
    if (this <= 0 || this >= 4000)
        throw new RangeError('Number must be between 1 and 3999 to convert to Roman numeral');
    const numeralMap = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];
    let value = this;
    return numeralMap.reduce((acc, [numeralValue, numeral]) => {
        while (value >= numeralValue) {
            acc += numeral;
            value -= numeralValue;
        }
        return acc;
    }, '');
}
exports.toRomanNumeral = toRomanNumeral;
Number.prototype.toRomanNumeral = toRomanNumeral;
