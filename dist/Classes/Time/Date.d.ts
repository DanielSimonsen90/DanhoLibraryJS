import { BetterOmit, PartialExcept, LongMonth, LongDay, ShortDay, ShortMonth } from "../../Types";
import TimeProperties from "./TimeProperties";
import TimeSpan, { TimeSpanFormat } from "./TimeSpan";
declare type Data = PartialExcept<BetterOmit<TimeProperties<true>, 'weeks'>, 'years' | 'months'>;
declare type Double = `${number}${number}`;
declare type Quadruple = `${Double}${Double}`;
declare type DateFormat = `${Double}/${Double}/${Quadruple}`;
/**
 * Type used to construct DanhoDate.
 * @Data Partial TimeProperties except years & months
 * @DateFormat string as dd/MM/yyyy
 */
export declare type DanhoDateConstructor = Data | DateFormat | number | Date;
declare class DanhoDate {
    constructor(data: DanhoDateConstructor);
    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    private _reduceTime;
    private _format;
    protected _date: Date;
    /**
     * Year of the date
     */
    get year(): number;
    set year(value: number);
    /**
     * Month of the date
     */
    get month(): number;
    set month(value: number);
    /**
     * Days in the month of the date
     */
    get daysInMonth(): number;
    /**
     * Week of the year the day is in
     */
    get week(): number;
    set week(value: number);
    /**
     * Week of the month the day is in
     */
    get weekOfMonth(): number;
    /**
     * Day of the date
     */
    get day(): number;
    set day(value: number);
    /**
     * Hours of the date
     */
    get hours(): number;
    set hours(value: number);
    /**
     * Minutes of the date
     */
    get minutes(): number;
    set minutes(value: number);
    /**
     * Seconds of the date
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * Milliseconds of the date
     */
    get milliseconds(): number;
    set milliseconds(value: number);
    /**
     * Millisecond value of internal time
     */
    get time(): number;
    set time(value: number);
    /**
     * Week day i.e. Monday
     */
    get weekDay(): LongDay;
    /**
     * Short week day i.e. Mon
     */
    get weekDayShort(): ShortDay;
    /**
     * Month name i.e. February
     */
    get monthName(): LongMonth;
    /**
     * Short month name i.e. Feb
     */
    get monthNameShort(): ShortMonth;
    /**
     * Sets internal date property
     * @param data Time properties to set - replacement of i.e. Date.setHours(value: number): number
     * @returns This, with updated properties
     */
    set(data: Partial<Data>): this;
    /**
     * Calculates the time between this and provided date
     * @param date Date information
     * @returns TimeSpan between this and provided date
     */
    between(date: DanhoDate | DanhoDateConstructor): TimeSpan;
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
    toString(format?: string, relativeFormat?: TimeSpanFormat): string;
}
export { DanhoDate as Date };
export default DanhoDate;
