export declare type TimeSpanValue = number | Date;
export declare class TimeSpan {
    constructor(from: TimeSpanValue, to?: TimeSpanValue);
    private _highest;
    private _lowest;
    private _getTimeDifference;
    private _reduceTime;
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    private _getTotalUnit;
    getTotalMonths(): number;
    getTotalWeeks(): number;
    getTotalDays(): number;
    getTotalHours(): number;
    getTotalMinutes(): number;
    getTotalSeconds(): number;
    getTotalMilliseconds(): number;
    from: Date;
    to: Date;
    pastTense: boolean;
    toString(includeMs?: boolean): string;
}
export default TimeSpan;
