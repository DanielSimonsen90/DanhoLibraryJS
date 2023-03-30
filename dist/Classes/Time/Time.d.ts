import { LongMonth } from "../../Types/Date";
/** '2s' or 2000 */
export type TimeUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
export type TimeString = `${number}${TimeUnit}`;
export type TimeDelay = number | TimeString;
export declare const ValidTime: RegExp;
/**
 * Converts input into milliseconds
 * @param input Input to convert to ms. 1s | 2m | 3h | 1M | 60000
 * @returns Millisecond value of input
 */
export declare function ms(input: TimeDelay): number;
/**
 * Time utility class
 * @borrows TimeDelay
 * @borrows ms
 */
export declare class Time {
    /**
     * Array of amount of days in the months. 0 indexed
     */
    static get daysInMonth(): number[];
    /**
     * Amount of weeks per year
     */
    static get weeksInYear(): number;
    /**
     * Amount of days per year
     */
    static get daysInYear(): number;
    /**
     * Returns function that converts value into double digit string
     * @returns (value: number): string
     */
    static DoubleDigit(value: number): string;
    static th(value: number, includeValue?: boolean): string;
    /**
     * Array of names of the months. 0 idnexed
     */
    static get MonthNames(): LongMonth[];
    /**
     * Array of names of the days of the week. 0 indexed
     */
    static get DayNames(): ("Monday" | "Friday" | "Sunday" | "Tuesday" | "Wednesday" | "Thursday" | "Saturday")[];
    /** Millisecond in milliseconds (I know that sounds weird but the others make sense) */
    static get millisecond(): number;
    /** Second in milliseconds */
    static get second(): number;
    /** Minute in milliseconds */
    static get minute(): number;
    /** Hour in milliseconds */
    static get hour(): number;
    /** Day in milliseconds */
    static get day(): number;
    /** Week in milliseconds */
    static get week(): number;
    /** Month in milliseconds */
    static get month(): number;
    /** Year in milliseconds */
    static get year(): number;
    /** Average month in milliseconds */
    static get avgMonth(): number;
    static ms(input: TimeDelay): number;
}
export default Time;
