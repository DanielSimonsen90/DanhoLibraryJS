"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const Time_1 = __importDefault(require("./Time"));
const TimeSpan_1 = __importDefault(require("./TimeSpan"));
class DanhoDate {
    constructor(data) {
        // data not provided
        if (!data)
            this._date = new Date();
        // data is typeof Date
        else if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        }
        // data is typeof Data
        else if (typeof data === 'object') {
            this._date = new Date(data.years, data.months - 1);
            if (data.days)
                this._date.setDate(data.days);
            if (data.hours)
                this._date.setHours(data.hours);
            if (data.minutes)
                this._date.setMinutes(data.minutes);
            if (data.seconds)
                this._date.setSeconds(data.seconds);
            if (data.milliseconds)
                this._date.setMilliseconds(data.milliseconds);
        }
        // data is string or number
        else
            this._date = new Date(data);
        this._formats = new Map([
            ['year', this.year],
            ['daysInMonth', this.daysInMonth],
            ['monthShort', this.monthNameShort],
            ['month', this.monthName],
            ['MM', Time_1.default.DoubleDigit(this.month)],
            ['M', this.month],
            ['weekMonth', this.weekOfMonth],
            ['weekDay', this.weekDay],
            ['weekDayShort', this.weekDayShort],
            ['week', this.week],
            ['dd', Time_1.default.DoubleDigit(this.day)],
            ['ddth', `${Time_1.default.DoubleDigit(this.day)}${Time_1.default.th(this.day)}`],
            ['d', this.day],
            ['dth', Time_1.default.th(this.day, true)],
            ['hh12', `${Time_1.default.DoubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`],
            ['h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`],
            ['hh24', Time_1.default.DoubleDigit(this.hours)],
            ['h24', this.hours],
            ['mm', Time_1.default.DoubleDigit(this.minutes)],
            ['m', this.minutes],
            ['ss', Time_1.default.DoubleDigit(this.seconds)],
            ['s', this.seconds],
            ['msms', Time_1.default.DoubleDigit(this.milliseconds)],
            ['ms', this.milliseconds]
        ]).map((v, k) => [k, v.toString()]);
    }
    _formats;
    _format(format) {
        return format
            .split(/\$/)
            .map(v => v.split(/\W/)[0])
            .filter(v => v)
            .reduce((result, key) => result.replaceAll(key, this._formats.get(key)), format.replaceAll('$', ''));
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
    get month() { return this._date.getMonth() + 1; }
    set month(value) { this._date.setMonth(value); }
    /**
     * Days in the month of the date
     */
    get daysInMonth() { return Time_1.default.daysInMonth[this.month - 1]; }
    /**
     * Week of the year the day is in
     */
    get week() {
        const firstMonday = new Date(this.year, 1, 1);
        if (firstMonday.getDay() !== 1) {
            const daysToMon = Time_1.default.DayNames.reverse().reduce((result, day, i) => result.set(day, i + 1), new Map()).get(Time_1.default.DayNames[firstMonday.getDay() - 1]);
            firstMonday.setDate(firstMonday.getDate() + daysToMon);
        }
        const timeDiff = Math.round(firstMonday.getTime() - this.time);
        const timeSince = Time_1.default.millisecond % timeDiff;
        const result = Math.ceil(timeSince / Time_1.default.week);
        return result;
    }
    set week(value) { this._date.setDate(value * Time_1.default.week / Time_1.default.day); }
    /**
     * Week of the month the day is in
     */
    get weekOfMonth() { return Math.round(this.daysInMonth / (Time_1.default.week / Time_1.default.day)); }
    /**
     * Day of the date
     */
    get day() { return this._date.getDate(); }
    set day(value) { this._date.setDate(value); }
    get dayOfWeek() { return this._date.getDay(); }
    set dayOfWeek(value) {
        const current = this.dayOfWeek;
        if (value > current)
            var diff = value - current;
        else
            diff = current - value;
        this.day -= diff;
    }
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
    get weekDay() { return Time_1.default.DayNames[this.dayOfWeek - 1] || Time_1.default.DayNames.at(-1); }
    /**
     * Short week day i.e. Mon
     */
    get weekDayShort() { return this.weekDay.substring(0, 3); }
    /**
     * Month name i.e. February
     */
    get monthName() { return Time_1.default.MonthNames[this.month - 1] || Time_1.default.MonthNames.at(-1); }
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
     * @$ddth Replaced with double digit day + "th" i.e. 05th
     * @$dth Replaced with double digit day + "th" i.e. 5th
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
