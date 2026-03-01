"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get24HourFormat = exports.get12HourFormat = exports.ensureStartZero = void 0;
function ensureStartZero(num) {
    return num < 10 ? `0${num}` : num.toString();
}
exports.ensureStartZero = ensureStartZero;
function get12HourFormat(hour) {
    if (hour === 0)
        return '12am';
    if (hour > 12)
        return `${hour - 12}pm`;
    return `${hour}am`;
}
exports.get12HourFormat = get12HourFormat;
function get24HourFormat(hour) {
    return ensureStartZero(hour);
}
exports.get24HourFormat = get24HourFormat;
