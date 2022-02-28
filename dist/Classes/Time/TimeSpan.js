"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSpan = void 0;
const Date_1 = __importDefault(require("./Date"));
const Time_1 = __importDefault(require("./Time"));
/**
 * Timespan between 2 dates.
 * @borrows TimeSpanValue
 * @borrows Time
 * @borrows TimeProperties
 */
class TimeSpan {
    constructor(from, to = Date.now()) {
        //General properties
        this.from = new Date_1.default(from);
        this.to = new Date_1.default(to);
        //Ensure from < to
        this._highest = this.from.time > this.to.time ? this.from : this.to;
        this._lowest = this.from == this._highest ? this.to : this.from;
        this.pastTense = this._highest !== this.to;
        this._highest = new Date_1.default(this._highest.time + Time_1.default.millisecond);
        let timeDifference = this._getTimeDifference();
        //Calculate time difference between from & to and set to object properties
        [this.years, timeDifference] = this._reduceTime(Time_1.default.year, timeDifference);
        [this.months, timeDifference] = this._reduceTime(Time_1.default.month, timeDifference);
        [this.weeks, timeDifference] = this._reduceTime(Time_1.default.week, timeDifference);
        [this.days, timeDifference] = this._reduceTime(Time_1.default.day, timeDifference);
        [this.hours, timeDifference] = this._reduceTime(Time_1.default.hour, timeDifference);
        [this.minutes, timeDifference] = this._reduceTime(Time_1.default.minute, timeDifference);
        [this.seconds, timeDifference] = this._reduceTime(Time_1.default.second, timeDifference);
        [this.milliseconds, timeDifference] = this._reduceTime(Time_1.default.millisecond, timeDifference);
    }
    /**
     * Which of the dates in constructor had the highest getTime()
     */
    _highest;
    /**
     * Which of the dates in constructor had the lowest getTime()
     */
    _lowest;
    /**
     * The time difference between highest and lowest
     * @returns Time difference in ms between this._highest and this._lowest
     */
    _getTimeDifference() {
        return Math.round(this._highest.time - this._lowest.time);
    }
    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    _reduceTime(ms, timeDifference) {
        let result = 0;
        while (timeDifference > ms) {
            timeDifference -= ms;
            result++;
        }
        return [result, timeDifference];
    }
    /**
     * Total years between dates
     */
    years;
    /**
     * Total months between dates
     */
    months;
    /**
     * Total weeks between dates
     */
    weeks;
    /**
     * Total days between dates
     */
    days;
    /**
     * Total hours between dates
     */
    hours;
    /**
     * Total minutes between dates
     */
    minutes;
    /**
     * Total seconds between dates
     */
    seconds;
    /**
     * Total milliseconds between dates
     */
    milliseconds;
    /**
     * Get the total unit time between the two dates
     * @param unit Time unit in milliseconds
     * @returns How many times that unit fits in total ms between the two dates
     */
    _getTotalUnit(unit) {
        return this._reduceTime(unit, this._getTimeDifference())[0];
    }
    /**
     * Get the maximum amount of months between the two dates
     * @returns Number of max amount of months that are between the two dates
     */
    getTotalMonths() {
        return this._getTotalUnit(Time_1.default.month);
    }
    /**
     * Get the maximum amount of weeks between the two dates
     * @returns Number of max amount of weeks that are between the two dates
     */
    getTotalWeeks() {
        return this._getTotalUnit(Time_1.default.week);
    }
    /**
     * Get the maximum amount of days between the two dates
     * @returns Number of max amount of days that are between the two dates
     */
    getTotalDays() {
        return this._getTotalUnit(Time_1.default.day);
    }
    /**
     * Get the maximum amount of hours between the two dates
     * @returns Number of max amount of hours that are between the two dates
     */
    getTotalHours() {
        return this._getTotalUnit(Time_1.default.hour);
    }
    /**
     * Get the maximum amount of minutes between the two dates
     * @returns Number of max amount of minutes that are between the two dates
     */
    getTotalMinutes() {
        return this._getTotalUnit(Time_1.default.minute);
    }
    /**
     * Get the maximum amount of seconds between the two dates
     * @returns Number of max amount of seconds that are between the two dates
     */
    getTotalSeconds() {
        return this._getTotalUnit(Time_1.default.second);
    }
    /**
     * Get the maximum amount of milliseconds between the two dates
     * @returns Number of max amount of milliseconds that are between the two dates
     */
    getTotalMilliseconds() {
        return this._getTotalUnit(Time_1.default.millisecond);
    }
    /**
     * Start date of timespan
     */
    from;
    /**
     * End date of timespan
     */
    to;
    /**
     * Timespan is in the past
     */
    pastTense;
    toString(format) {
        //console.log(`${this.years}Y ${this.months}M ${this.weeks}w ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s ${this.milliseconds}ms`);
        const times = [this.years, this.months, this.weeks, this.days, this.hours, this.minutes, this.seconds, this.milliseconds];
        const timeMsg = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        const result = times.reduce((result, time, i) => (
        // If time is above 0, format is provided, a property matches current property and said property is true, append addition else return result
        time > 0 && (format ? timeMsg[i] in format && format[timeMsg[i]] === true : true) ?
            `${result}${times[i]} ${timeMsg[i]}${times[i] != 1 ? 's' : ''}, ` :
            result), '');
        return result.length > 2 && result.substring(0, result.length - 2) || '';
    }
}
exports.TimeSpan = TimeSpan;
exports.default = TimeSpan;
