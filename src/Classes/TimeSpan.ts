import { Time } from "./Time";

export type TimeSpanValue = number | Date;
export class TimeSpan {
    constructor(from: TimeSpanValue, to: TimeSpanValue = Date.now()) {
        //General properties
        this.from = typeof from == 'number' ? new Date(from) : from;
        this.to = typeof to == 'number' ? new Date(to) : to;

        //Ensure from < to
        this._highest = this.from.getTime() > this.to.getTime() ? this.from : this.to; 
        this._lowest = this.from == this._highest ? this.to : this.from;
        this.pastTense = this._highest !== this.to;
        this._highest = new Date(this._highest.getTime() + Time.millisecond);
        let timeDifference = this._getTimeDifference();

        //Calculate time difference between from & to and set to object properties
        [this.years, timeDifference] = this._reduceTime(Time.year, timeDifference);
        [this.months, timeDifference] = this._reduceTime(Time.month, timeDifference);
        [this.weeks, timeDifference] = this._reduceTime(Time.week, timeDifference);
        [this.days, timeDifference] = this._reduceTime(Time.day, timeDifference);
        [this.hours, timeDifference] = this._reduceTime(Time.hour, timeDifference);
        [this.minutes, timeDifference] = this._reduceTime(Time.minute, timeDifference);
        [this.seconds, timeDifference] = this._reduceTime(Time.second, timeDifference);
        [this.milliseconds, timeDifference] = this._reduceTime(Time.millisecond, timeDifference);
    }

    private _highest: Date;
    private _lowest: Date;
    private _getTimeDifference(): number {
        return Math.round(this._highest.getTime() - this._lowest.getTime())
    }
    private _reduceTime(ms: number, timeDifference: number) {
        let result = 0;

        while (timeDifference > ms) {
            timeDifference -= ms;
            result++;
        }

        return [result, timeDifference];
    }

    public years: number;
    public months: number;
    public weeks: number;
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public milliseconds: number;

    private _getTotalUnit(unit: number): number {
        return this._reduceTime(unit, this._getTimeDifference())[0]
    }
    public getTotalMonths(): number {
        return this._getTotalUnit(Time.month);
    }
    public getTotalWeeks(): number {
        return this._getTotalUnit(Time.week);
    }
    public getTotalDays(): number {
        return this._getTotalUnit(Time.day);
    }
    public getTotalHours(): number {
        return this._getTotalUnit(Time.hour);
    }
    public getTotalMinutes(): number {
        return this._getTotalUnit(Time.minute);
    }
    public getTotalSeconds(): number {
        return this._getTotalUnit(Time.second)
    }
    public getTotalMilliseconds(): number {
        return this.milliseconds;
    }
    
    public from: Date;
    public to: Date;
    public pastTense: boolean;

    public toString(includeMs?: boolean) {
        //console.log(`${this.years}Y ${this.months}M ${this.weeks}w ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s ${this.milliseconds}ms`);
        const times = [...[this.years, this.months, this.weeks, this.days, this.hours, this.minutes, this.seconds], includeMs ? this.milliseconds : -1];
        const timeMsg = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        const result = times.reduce((result, time, i) => (
            time > 0 ? `${result}${times[i]} ${timeMsg[i]}${times[i] != 1 ? 's' : ''}, ` : result
        ), '');

        return result.length > 2 && result.substring(0, result.length - 2) || '';
    }
}

export default TimeSpan;