/** '2s' or 2000 */
export declare type TimeUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
export declare type TimeString = `${number}${TimeUnit}`;
export declare type TimeDelay = number | TimeString;
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
