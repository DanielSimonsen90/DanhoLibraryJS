"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const Time_1 = __importDefault(require("./Time"));
const TimeSpan_1 = __importDefault(require("./TimeSpan"));
const doubleDigit = (value) => value.toString().length < 2 ? `0${value}` : value.toString();
const monthNames = new Array('Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
const dayNames = new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
class DanhoDate {
    constructor(data) {
        // data is typeof Date
        if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        }
        // data is typeof Data
        else if (typeof data === 'object') {
            const { years, months, days, hours, minutes, seconds, milliseconds } = data;
            this._date = new Date(years, months, days, hours, minutes, seconds, milliseconds);
        }
        // data is string or number
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
    _format(format) {
        return format
            .replaceAll('$year', this.year.toString())
            .replaceAll('$daysInMonth', this.daysInMonth.toString())
            .replaceAll('$monthShort', this.monthNameShort)
            .replaceAll('$month', this.monthName)
            .replaceAll('$MM', doubleDigit(this.month))
            .replaceAll('$M', this.month.toString())
            .replaceAll('$weekMonth', this.weekOfMonth.toString())
            .replaceAll('$weekDay', this.weekDay)
            .replaceAll('$weekDayShort', this.weekDayShort)
            .replaceAll('$week', this.week.toString())
            .replaceAll('$dd', doubleDigit(this.day))
            .replaceAll('$d', this.day.toString())
            .replaceAll('$hh12', `${doubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`)
            .replaceAll('$h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`)
            .replaceAll('$hh24', doubleDigit(this.hours))
            .replaceAll('$h24', this.hours.toString())
            .replaceAll('$msms', doubleDigit(this.milliseconds))
            .replaceAll('$ms', this.milliseconds.toString())
            .replaceAll('$ss', doubleDigit(this.seconds))
            .replaceAll('$s', this.seconds.toString())
            .replaceAll('$mm', doubleDigit(this.minutes))
            .replaceAll('$m', this.minutes.toString());
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
    get daysInMonth() { return Time_1.default.daysInMonth[this.month - 1]; }
    /**
     * Week of the year the day is in
     */
    get week() {
        const days = Time_1.default.daysInMonth.filter((v, i) => i + 1 <= this.month).reduce((result, i) => result + i, 0);
        return this._reduceTime(Time_1.default.week, this._date.getTime() / (days * Time_1.default.day))[0];
    }
    set week(value) { this._date.setDate(value * Time_1.default.week / Time_1.default.day); }
    /**
     * Week of the month the day is in
     */
    get weekOfMonth() { return Math.round(this.daysInMonth * Time_1.default.week / Time_1.default.day); }
    /**
     * Day of the date
     */
    get day() { return this._date.getDate(); }
    set day(value) { this._date.setDate(value); }
    /**
     * Hours of the date
     */
    get hours() { return this._date.getHours(); }
    set hours(value) { this._date.setHours(value); }
    /**
     * Minutes of the date
     */
    get minutes() { return this._date.getMinutes(); }
    set minutes(value) { this._date.setMinutes(value); }
    /**
     * Seconds of the date
     */
    get seconds() { return this._date.getSeconds(); }
    set seconds(value) { this._date.setSeconds(value); }
    /**
     * Milliseconds of the date
     */
    get milliseconds() { return this._date.getMilliseconds(); }
    set milliseconds(value) { this._date.setMilliseconds(value); }
    /**
     * Millisecond value of internal time
     */
    get time() { return this._date.getTime(); }
    set time(value) { this._date.setTime(value); }
    /**
     * Week day i.e. Monday
     */
    get weekDay() { return dayNames[this.day - 1] || dayNames.at(-1); }
    /**
     * Short week day i.e. Mon
     */
    get weekDayShort() { return this.weekDay.substring(0, 3); }
    /**
     * Month name i.e. February
     */
    get monthName() { return monthNames[this.month - 1] || monthNames.at(-1); }
    /**
     * Short month name i.e. Feb
     */
    get monthNameShort() { return this.monthName.substring(0, 3); }
    /**
     * Sets internal date property
     * @param data Time properties to set - replacement of i.e. Date.setHours(value: number): number
     * @returns This, with updated properties
     */
    set(data) {
        const { years, months, days, hours, minutes, seconds, milliseconds } = data;
        const ymd = this._date.setFullYear(years || this.year, months, days);
        const hmsms = new Date(ymd).setHours(hours || this.hours, minutes, seconds, milliseconds);
        this._date = new Date(hmsms);
        return this;
    }
    /**
     * Calculates the time between this and provided date
     * @param date Date information
     * @returns TimeSpan between this and provided date
     */
    between(date) {
        if (date instanceof DanhoDate)
            return new TimeSpan_1.default(this._date, date._date);
        else if (date instanceof Date)
            return new TimeSpan_1.default(this._date, date);
        else if (typeof date === 'object')
            return new DanhoDate(date).between(this._date);
        return new TimeSpan_1.default(this._date, new Date(date));
    }
    /**
     * String representation of this
     * @param format String format of date
     * @returns String representation of this
     *
     * @$year Replaced with year of the date i.e. 2022
     *
     * @$month Replaced with month name i.e. March
     * @$daysInMonth Replaced with the amount of days in the month i.e. 31
     * @$MM replaced with double digit month i.e. 01
     * @$M replaced with single digit month i.e. 1
     *
     * @$week Replaced with week of the year i.e. 32
     * @$weekOfMonth Replaced with the week of the month i.e. 3
     *
     * @$weekday Replaced with day of the week i.e. Wednesday
     * @$dd Replaced with double digit day i.e. 02
     * @$d Replaced with single digit day i.e. 2
     *
     * @$hh12 Replaced with double digit hour in 12-hour format i.e. 09
     * @$hh24 Replaced with double digit hour in 24-hour format i.e. 21
     * @$h12 Replaced with single digit hour in 12-hour format i.e. 9
     * @$h24 Replaced with single digit hour in 24-hour format i.e. 9
     *
     * @$mm Replaced with double digit minute i.e. 05
     * @$m Replaced with single digit minute i.e. 5
     *
     * @$ss Replaced with double digit second i.e. 03
     * @$s Replaced with single digit second i.e. 3
     *
     * @msms Replaced with double digit millisecond i.e. 02
     * @ms Replaced with single digit millisecond i.e. 2
     *
     * @$relative Replaced with relative timeformat as TimeSpan
     */
    toString(format = "$dd/$MM/$year", relativeFormat) {
        return this._format(format.replaceAll('$relative', this.between(new Date()).toString(relativeFormat)));
    }
}
exports.Date = DanhoDate;
exports.default = DanhoDate;
