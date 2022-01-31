export declare type TimeDelay = number | string;
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
    static get millisecond(): number;
    static get second(): number;
    static get minute(): number;
    static get hour(): number;
    static get day(): number;
    static get week(): number;
    static get month(): number;
    static get year(): number;
    static get avgMonth(): number;
    static ms(input: TimeDelay): number;
}
