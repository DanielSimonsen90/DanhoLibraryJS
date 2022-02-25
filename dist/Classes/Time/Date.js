"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const Time_1 = require("./Time");
const TimeSpan_1 = __importDefault(require("./TimeSpan"));
const doubleDigit = (value) => value.toString().length < 2 ? `0${value}` : value.toString();
const monthNames = new Array('Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
const dayNames = new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
class DanhoDate {
    constructor(data) {
        // Initialize _date
        if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        }
        else if (typeof data === 'object') {
            const { years, months, days, hours, minutes, seconds, milliseconds } = data;
            this._date = new Date(years, months, days, hours, minutes, seconds, milliseconds);
        }
        else
            this._date = new Date(data);
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
    _date;
    /**
     * Year of the date
     */
    get year() { return this._date.getFullYear(); }
    set year(value) { this._date.setFullYear(value); }
    /**
     * Month of the date
     */
    get month() { return this._date.getMonth(); }
    set month(value) { this._date.setMonth(value); }
    /**
     * Days in the month of the date
     */
    get daysInMonth() { return Time_1.Time.daysInMonth[this.month - 1]; }
    /**
     * Week of the year the day is in
     */
    get week() {
        const days = Time_1.Time.daysInMonth.filter((v, i) => i + 1 <= this.month).reduce((result, i) => result + i, 0);
        return this._reduceTime(Time_1.Time.week, this._date.getTime() / (days * Time_1.Time.day))[0];
    }
    set week(value) { this._date.setDate(value * Time_1.Time.week / Time_1.Time.day); }
    /**
     * Week of the month the day is in
     */
    get weekOfMonth() { return Math.round(this.daysInMonth * Time_1.Time.week / Time_1.Time.day); }
    get day() { return this._date.getDate(); }
    set day(value) { this._date.setDate(value); }
    get hours() { return this._date.getHours(); }
    set hours(value) { this._date.setHours(value); }
    get minutes() { return this._date.getMinutes(); }
    set minutes(value) { this._date.setMinutes(value); }
    get seconds() { return this._date.getSeconds(); }
    set seconds(value) { this._date.setSeconds(value); }
    get milliseconds() { return this._date.getMilliseconds(); }
    set milliseconds(value) { this._date.setMilliseconds(value); }
    /**
     * Full name of the day
     */
    get weekDay() { return dayNames[this.day - 1] || dayNames.at(-1); }
    /**
     * Full name of the day shortened to 3 characters
     */
    get weekDayShort() { return this.weekDay.substring(0, 3); }
    /**
     * Full name of the month
     */
    get monthName() { return monthNames[this.month - 1] || monthNames.at(-1); }
    /**
     * Full name of the month shortened to 3 characters
     */
    get monthNameShort() { return this.monthName.substring(0, 3); }
    set(data) {
        const { years, months, days, hours, minutes, seconds, milliseconds } = data;
        const ymd = this._date.setFullYear(years || this.year, months, days);
        const hmsms = new Date(ymd).setHours(hours || this.hours, minutes, seconds, milliseconds);
        this._date = new Date(hmsms);
        return this;
    }
    between(date) {
        if (date instanceof DanhoDate)
            return new TimeSpan_1.default(this._date, date._date);
        else if (date instanceof Date)
            return new TimeSpan_1.default(this._date, date);
        else if (typeof date === 'object')
            return new DanhoDate(date).between(this._date);
        return new TimeSpan_1.default(this._date, new Date(date));
    }
    toString(format = "$dd/$MM/$year") {
        return format
            .replaceAll('$year', this.year.toString())
            .replaceAll('$month', this.monthName)
            .replaceAll('$monthShort', this.monthNameShort)
            .replaceAll('$MM', doubleDigit(this.month))
            .replaceAll('$M', this.month.toString())
            .replaceAll('$week', this.week.toString())
            .replaceAll('$weekMonth', this.weekOfMonth.toString())
            .replaceAll('$weekDay', this.weekDay)
            .replaceAll('$weekDayShort', this.weekDayShort)
            .replaceAll('$dd', doubleDigit(this.day))
            .replaceAll('$d', this.day.toString())
            .replaceAll('$hh12', `${doubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`)
            .replaceAll('$h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`)
            .replaceAll('$hh24', doubleDigit(this.hours))
            .replaceAll('$h24', this.hours.toString())
            .replaceAll('$mm', doubleDigit(this.minutes))
            .replaceAll('$m', this.minutes.toString())
            .replaceAll('$ss', doubleDigit(this.seconds))
            .replaceAll('$s', this.seconds.toString())
            .replaceAll('$msms', doubleDigit(this.milliseconds))
            .replaceAll('$ms', this.milliseconds.toString())
            .replaceAll('$relative', this.between(new Date()).toString());
    }
}
exports.Date = DanhoDate;
exports.default = DanhoDate;
