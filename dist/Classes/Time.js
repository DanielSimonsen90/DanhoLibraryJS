"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.ms = exports.ValidTime = void 0;
exports.ValidTime = /^(\d+(?:\.|,)?\d*)(ms|s|m|h|d|w|M|y)$/;
function ms(input) {
    if (typeof input === 'number')
        return input;
    const match = input.match(exports.ValidTime);
    if (!match)
        throw Error(`Invalid input string "${input}"`);
    match.shift();
    const [value, unit] = match;
    console.log({ value, unit, input, match });
    const units = new Map([
        ['ms', Time.millisecond],
        ['s', Time.second],
        ['m', Time.minute],
        ['h', Time.hour],
        ['d', Time.day],
        ['w', Time.week],
        ['M', Time.month],
        ['y', Time.year]
    ]);
    return parseInt(value) * units.get(unit);
}
exports.ms = ms;
class Time {
    static get millisecond() { return 1; }
    static get second() { return Time.millisecond * 1000; }
    static get minute() { return Time.second * 60; }
    static get hour() { return Time.minute * 60; }
    static get day() { return Time.hour * 24; }
    static get week() { return Time.day * 7; }
    static get month() {
        return Time.avgMonth * Time.day;
    }
    static get year() {
        const now = new Date();
        return (365 + (now.getFullYear() % 4 == 0 ? 1 : 0)) * Time.day;
    }
    static get avgMonth() {
        return Math.round([
            ...[1, 3, 5, 7, 8, 10, 12].map(() => 31),
            ...[4, 6, 9, 11].map(() => 30),
            28
        ].reduce((result, num) => result += num, 0) / 12);
    }
    static ms(input) {
        return ms(input);
    }
}
exports.Time = Time;
