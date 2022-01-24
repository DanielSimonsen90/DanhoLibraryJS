"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSpan = void 0;
const Time_1 = require("./Time");
class TimeSpan {
    constructor(from, to = Date.now()) {
        //General properties
        this.from = typeof from == 'number' ? new Date(from) : from;
        this.to = typeof to == 'number' ? new Date(to) : to;
        //Ensure from < to
        this._highest = this.from.getTime() > this.to.getTime() ? this.from : this.to;
        this._lowest = this.from == this._highest ? this.to : this.from;
        this.pastTense = this._highest !== this.to;
        this._highest = new Date(this._highest.getTime() + Time_1.Time.millisecond);
        let timeDifference = this._getTimeDifference();
        //Calculate time difference between from & to and set to object properties
        [this.years, timeDifference] = this._reduceTime(Time_1.Time.year, timeDifference);
        [this.months, timeDifference] = this._reduceTime(Time_1.Time.month, timeDifference);
        [this.weeks, timeDifference] = this._reduceTime(Time_1.Time.week, timeDifference);
        [this.days, timeDifference] = this._reduceTime(Time_1.Time.day, timeDifference);
        [this.hours, timeDifference] = this._reduceTime(Time_1.Time.hour, timeDifference);
        [this.minutes, timeDifference] = this._reduceTime(Time_1.Time.minute, timeDifference);
        [this.seconds, timeDifference] = this._reduceTime(Time_1.Time.second, timeDifference);
        [this.milliseconds, timeDifference] = this._reduceTime(Time_1.Time.millisecond, timeDifference);
    }
    _highest;
    _lowest;
    _getTimeDifference() {
        return Math.round(this._highest.getTime() - this._lowest.getTime());
    }
    _reduceTime(ms, timeDifference) {
        let result = 0;
        while (timeDifference > ms) {
            timeDifference -= ms;
            result++;
        }
        return [result, timeDifference];
    }
    years;
    months;
    weeks;
    days;
    hours;
    minutes;
    seconds;
    milliseconds;
    _getTotalUnit(unit) {
        return this._reduceTime(unit, this._getTimeDifference())[0];
    }
    getTotalMonths() {
        return this._getTotalUnit(Time_1.Time.month);
    }
    getTotalWeeks() {
        return this._getTotalUnit(Time_1.Time.week);
    }
    getTotalDays() {
        return this._getTotalUnit(Time_1.Time.day);
    }
    getTotalHours() {
        return this._getTotalUnit(Time_1.Time.hour);
    }
    getTotalMinutes() {
        return this._getTotalUnit(Time_1.Time.minute);
    }
    getTotalSeconds() {
        return this._getTotalUnit(Time_1.Time.second);
    }
    getTotalMilliseconds() {
        return this.milliseconds;
    }
    from;
    to;
    pastTense;
    toString(includeMs) {
        //console.log(`${this.years}Y ${this.months}M ${this.weeks}w ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s ${this.milliseconds}ms`);
        const times = [...[this.years, this.months, this.weeks, this.days, this.hours, this.minutes, this.seconds], includeMs ? this.milliseconds : -1];
        const timeMsg = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        const result = times.reduce((result, time, i) => (time > 0 ? `${result}${times[i]} ${timeMsg[i]}${times[i] != 1 ? 's' : ''}, ` : result), '');
        return result.length > 2 && result.substring(0, result.length - 2) || '';
    }
}
exports.TimeSpan = TimeSpan;
exports.default = TimeSpan;
