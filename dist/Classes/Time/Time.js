"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.ms = exports.ValidTime = void 0;
exports.ValidTime = /^(\d+(?:\.|,)?\d*)(ms|s|m|h|d|w|M|y)$/;
/**
 * Converts input into milliseconds
 * @param input Input to convert to ms. 1s | 2m | 3h | 1M | 60000
 * @returns Millisecond value of input
 */
function ms(input) {
    if (typeof input === 'number')
        return input;
    const match = input.match(exports.ValidTime);
    if (!match)
        throw Error(`Invalid input string "${input}"`);
    match.shift();
    const [value, unit] = match;
    // console.log({ value, unit, input, match });
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
/**
 * Time utility class
 * @borrows TimeDelay
 * @borrows ms
 */
class Time {
    /**
     * Array of amount of days in the months. 0 indexed
     */
    static get daysInMonth() {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    /**
     * Amount of weeks per year
     */
    static get weeksInYear() {
        return Time.daysInYear * Time.day / Time.week;
    }
    /**
     * Amount of days per year
     */
    static get daysInYear() {
        return Time.year / Time.day;
        ;
    }
    /**
     * Returns function that converts value into double digit string
     * @returns (value: number): string
     */
    static DoubleDigit(value) {
        return value.toString().length < 2 ? `0${value}` : value.toString();
    }
    static th(value, includeValue = false) {
        const th = (() => {
            switch (value) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        })();
        return includeValue ? value + th : th;
    }
    /**
     * Array of names of the months. 0 idnexed
     */
    static get MonthNames() {
        return new Array('Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    }
    /**
     * Array of names of the days of the week. 0 indexed
     */
    static get DayNames() {
        return new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    }
    /** Millisecond in milliseconds (I know that sounds weird but the others make sense) */
    static get millisecond() { return 1; }
    /** Second in milliseconds */
    static get second() { return Time.millisecond * 1000; }
    /** Minute in milliseconds */
    static get minute() { return Time.second * 60; }
    /** Hour in milliseconds */
    static get hour() { return Time.minute * 60; }
    /** Day in milliseconds */
    static get day() { return Time.hour * 24; }
    /** Week in milliseconds */
    static get week() { return Time.day * 7; }
    /** Month in milliseconds */
    static get month() {
        return Time.avgMonth * Time.day;
    }
    /** Year in milliseconds */
    static get year() {
        const now = new Date();
        return (365 + (now.getFullYear() % 4 == 0 ? 1 : 0)) * Time.day;
    }
    /** Average month in milliseconds */
    static get avgMonth() {
        return Math.round(this.daysInMonth.reduce((result, num) => result += num, 0) / 12);
    }
    static ms(input) {
        return ms(input);
    }
}
exports.Time = Time;
exports.default = Time;
