import { Time } from "./Time";

export type TimeSpanValue = number | Date;

/**
 * Timespan between 2 dates.
 * @borrows TimeSpanValue
 * @borrows Time
 */
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

    /**
     * Which of the dates in constructor had the highest getTime()
     */
    private _highest: Date;
    /**
     * Which of the dates in constructor had the lowest getTime()
     */
    private _lowest: Date;

    /**
     * The time difference between highest and lowest
     * @returns Time difference in ms between this._highest and this._lowest
     */
    private _getTimeDifference(): number {
        return Math.round(this._highest.getTime() - this._lowest.getTime())
    }

    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    private _reduceTime(ms: number, timeDifference: number) {
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
    public years: number;
    /**
     * Total months between dates
     */
    public months: number;
    /**
     * Total weeks between dates
     */
    public weeks: number;
    /**
     * Total days between dates
     */
    public days: number;
    /**
     * Total hours between dates
     */
    public hours: number;
    /**
     * Total minutes between dates
     */
    public minutes: number;
    /**
     * Total seconds between dates
     */
    public seconds: number;
    /**
     * Total milliseconds between dates
     */
    public milliseconds: number;

    /**
     * Get the total unit time between the two dates
     * @param unit Time unit in milliseconds
     * @returns How many times that unit fits in total ms between the two dates
     */
    private _getTotalUnit(unit: number): number {
        return this._reduceTime(unit, this._getTimeDifference())[0]
    }

    /**
     * Get the maximum amount of months between the two dates
     * @returns Number of max amount of months that are between the two dates
     */
    public getTotalMonths(): number {
        return this._getTotalUnit(Time.month);
    }
    /**
     * Get the maximum amount of weeks between the two dates
     * @returns Number of max amount of weeks that are between the two dates
     */
    public getTotalWeeks(): number {
        return this._getTotalUnit(Time.week);
    }
    /**
     * Get the maximum amount of days between the two dates
     * @returns Number of max amount of days that are between the two dates
     */
    public getTotalDays(): number {
        return this._getTotalUnit(Time.day);
    }
    /**
     * Get the maximum amount of hours between the two dates
     * @returns Number of max amount of hours that are between the two dates
     */
    public getTotalHours(): number {
        return this._getTotalUnit(Time.hour);
    }
    /**
     * Get the maximum amount of minutes between the two dates
     * @returns Number of max amount of minutes that are between the two dates
     */
    public getTotalMinutes(): number {
        return this._getTotalUnit(Time.minute);
    }
    /**
     * Get the maximum amount of seconds between the two dates
     * @returns Number of max amount of seconds that are between the two dates
     */
    public getTotalSeconds(): number {
        return this._getTotalUnit(Time.second)
    }
    /**
     * Get the maximum amount of milliseconds between the two dates
     * @returns Number of max amount of milliseconds that are between the two dates
     */
    public getTotalMilliseconds(): number {
        return this._getTotalUnit(Time.millisecond);
    }
    
    /**
     * Start date of timespan
     */
    public from: Date;
    /**
     * End date of timespan
     */
    public to: Date;
    /**
     * Timespan is in the past
     */
    public pastTense: boolean;

    public toString(includeMs: boolean = false) {
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