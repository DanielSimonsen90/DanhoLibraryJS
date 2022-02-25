/**
 * '1h' or new Date(new Date().setHour(new Date().getHour() + 1)) (god i hate dates in javascript I swear I'm making my own someday)
 */
export declare type TimeSpanValue = number | Date;
/**
 * Timespan between 2 dates.
 * @borrows TimeSpanValue
 * @borrows Time
 */
export declare class TimeSpan {
    constructor(from: TimeSpanValue, to?: TimeSpanValue);
    /**
     * Which of the dates in constructor had the highest getTime()
     */
    private _highest;
    /**
     * Which of the dates in constructor had the lowest getTime()
     */
    private _lowest;
    /**
     * The time difference between highest and lowest
     * @returns Time difference in ms between this._highest and this._lowest
     */
    private _getTimeDifference;
    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    private _reduceTime;
    /**
     * Total years between dates
     */
    years: number;
    /**
     * Total months between dates
     */
    months: number;
    /**
     * Total weeks between dates
     */
    weeks: number;
    /**
     * Total days between dates
     */
    days: number;
    /**
     * Total hours between dates
     */
    hours: number;
    /**
     * Total minutes between dates
     */
    minutes: number;
    /**
     * Total seconds between dates
     */
    seconds: number;
    /**
     * Total milliseconds between dates
     */
    milliseconds: number;
    /**
     * Get the total unit time between the two dates
     * @param unit Time unit in milliseconds
     * @returns How many times that unit fits in total ms between the two dates
     */
    private _getTotalUnit;
    /**
     * Get the maximum amount of months between the two dates
     * @returns Number of max amount of months that are between the two dates
     */
    getTotalMonths(): number;
    /**
     * Get the maximum amount of weeks between the two dates
     * @returns Number of max amount of weeks that are between the two dates
     */
    getTotalWeeks(): number;
    /**
     * Get the maximum amount of days between the two dates
     * @returns Number of max amount of days that are between the two dates
     */
    getTotalDays(): number;
    /**
     * Get the maximum amount of hours between the two dates
     * @returns Number of max amount of hours that are between the two dates
     */
    getTotalHours(): number;
    /**
     * Get the maximum amount of minutes between the two dates
     * @returns Number of max amount of minutes that are between the two dates
     */
    getTotalMinutes(): number;
    /**
     * Get the maximum amount of seconds between the two dates
     * @returns Number of max amount of seconds that are between the two dates
     */
    getTotalSeconds(): number;
    /**
     * Get the maximum amount of milliseconds between the two dates
     * @returns Number of max amount of milliseconds that are between the two dates
     */
    getTotalMilliseconds(): number;
    /**
     * Start date of timespan
     */
    from: Date;
    /**
     * End date of timespan
     */
    to: Date;
    /**
     * Timespan is in the past
     */
    pastTense: boolean;
    toString(includeMs?: boolean): string;
}
export default TimeSpan;
